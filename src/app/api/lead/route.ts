import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const N8N_WEBHOOK = 'https://atingi-n8n.iufuwr.easypanel.host/webhook/9ac9b0d4-78c9-47ff-849d-aff1685384a3';

// Server-side Supabase client (uses service_role — never exposed to browser)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ── 1. Fire-and-forget to n8n (non-blocking) ─────────────────────────────
    fetch(N8N_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...body,
        _server_timestamp: new Date().toISOString(),
      }),
    }).catch(err => console.warn('[API/Lead] n8n webhook error (non-blocking):', err));

    // ── 2. Supabase Fail-Safe: mark session as converted ─────────────────────
    // The session was already created client-side by analytics.ts.
    // Here we do a server-side UPSERT to guarantee the final conversion is recorded
    // even if the n8n webhook is down.
    if (body.email || body.telefone || body.nome) {
      const phoneRaw = (body.telefone || '').replace(/\D/g, '');
      const formattedPhone = phoneRaw.startsWith('55') ? phoneRaw : '55' + phoneRaw;

      // Try to update by email (most reliable identifier at final step)
      const { error: updateError } = await supabase
        .from('lp_sessions')
        .update({
          lead_name: body.nome || null,
          lead_email: body.email || null,
          lead_phone: formattedPhone || null,
          is_converted: true,
          utm_source: body.utm_source || null,
          utm_campaign: body.utm_campaign || null,
          utm_content: body.utm_content || null,
        })
        .eq('lead_email', body.email)
        .is('is_converted', false); // only update non-converted sessions

      if (updateError) {
        console.warn('[API/Lead] Supabase update by email failed:', updateError.message);

        // Fallback: insert a safety record if we can't match the session
        const { error: insertError } = await supabase.from('lp_sessions').insert({
          session_id: `api_fallback_${Date.now()}`,
          lead_name: body.nome || null,
          lead_email: body.email || null,
          lead_phone: formattedPhone || null,
          utm_source: body.utm_source || null,
          utm_medium: body.utm_medium || null,
          utm_campaign: body.utm_campaign || null,
          utm_content: body.utm_content || null,
          utm_term: body.utm_term || null,
          sck: body.sck || null,
          fbclid: body.fbclid || null,
          funnel_version: body.funnel_version || (body.source?.includes('v4') ? 'v4' : body.nivel ? 'v3' : body.source?.includes('v2') ? 'v2' : 'v1'),
          is_converted: true,
        });
        if (insertError) console.warn('[API/Lead] Supabase fallback insert failed:', insertError.message);
      }
    }

    return NextResponse.json({ success: true, forwarded: true });
  } catch (error: any) {
    console.error('[API/Lead] Unhandled error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error while tracking lead' },
      { status: 500 }
    );
  }
}
