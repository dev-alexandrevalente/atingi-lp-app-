-- ============================================
-- Atingi Landing Page Analytics — Database Setup
-- Execute este script no SQL Editor do seu Supabase recém-criado
-- ============================================

-- 1. Tabela Principal: Sessões do Funil & Captured Leads
CREATE TABLE IF NOT EXISTS lp_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Origem e Tráfego (Tracking)
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  sck text,
  fbclid text,
  gclid text,
  ttclid text,
  referrer text,
  
  -- Ambiente e Dispositivo
  funnel_version text, -- Ex: 'v1', 'v2', 'v3'
  landing_url text,
  device_type text,
  screen_width int,
  user_agent text,
  
  -- Dados do Quiz (Live Analytics)
  quiz_role text,          -- Cargo (ex: dono, gestor)
  quiz_team_size text,     -- Tamanho da equipe (ex: 1-5, 6-15)
  quiz_segment text,       -- Segmento de atuação
  quiz_time_company text,  -- Tempo de empresa
  
  -- Dados de Contato do Lead (Live Analytics)
  lead_name text,
  lead_email text,
  lead_phone text,
  
  -- Engajamento e Jornada
  last_step_reached int DEFAULT 0,
  max_step_reached int DEFAULT 0,
  total_time_secs int DEFAULT 0,
  engagement_score float DEFAULT 0,
  is_converted boolean DEFAULT false -- Define se ele mandou ver no botão final do WhatsApp/Painel
);

-- 2. Tabela Secundária: Passos Granulares (Step Events)
CREATE TABLE IF NOT EXISTS lp_step_events (
  id bigserial PRIMARY KEY,
  session_id text NOT NULL,
  step_index int NOT NULL,
  step_name text NOT NULL,
  event_type text NOT NULL, -- Ex: 'enter', 'exit', 'interaction'
  time_in_step int,         -- Segundos gastos naquele passo
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

-- Funcionalidade Adicional: Trigger para atualizar 'updated_at' automaticamente na lp_sessions
CREATE OR REPLACE FUNCTION update_modified_column() 
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$ language 'plpgsql';

CREATE TRIGGER update_lp_sessions_modtime
BEFORE UPDATE ON lp_sessions
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();


-- Índices para turbinar leitura e relatórios depois
CREATE INDEX IF NOT EXISTS idx_lp_sessions_sid ON lp_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_lp_sessions_created ON lp_sessions(created_at);
CREATE INDEX IF NOT EXISTS idx_lp_sessions_source ON lp_sessions(utm_source);
CREATE INDEX IF NOT EXISTS idx_lp_sessions_email ON lp_sessions(lead_email);
CREATE INDEX IF NOT EXISTS idx_step_events_sid ON lp_step_events(session_id);

-- Regras de Segurança (RLS - Permite a API Frontend Pública capturar mas bloqueia intrusos de deletar/ler bancos inteiros)
ALTER TABLE lp_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE lp_step_events ENABLE ROW LEVEL SECURITY;

-- Autorizando escrita (Insert/Update) anonimamente via API do front-end
CREATE POLICY "anon_insert_lp_sessions" ON lp_sessions FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_update_lp_sessions" ON lp_sessions FOR UPDATE TO anon USING (true) WITH CHECK (true);

CREATE POLICY "anon_insert_lp_step_events" ON lp_step_events FOR INSERT TO anon WITH CHECK (true);

-- OPCIONAL: Descomente abaixo somente no futuro quando for ler via Frontend. Para Painéis Admin nativos não é preciso.
-- CREATE POLICY "anon_select_lp_sessions" ON lp_sessions FOR SELECT TO anon USING (true);
-- CREATE POLICY "anon_select_lp_step_events" ON lp_step_events FOR SELECT TO anon USING (true);
