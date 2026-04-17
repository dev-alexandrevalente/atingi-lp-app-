const fs = require('fs');

try {
  const data = JSON.parse(fs.readFileSync('./lh-v2.json', 'utf8'));
  console.log('--- LIGHTHOUSE PERFORMANCE RESULTS ---');
  console.log('Score:', Math.round(data.categories.performance.score * 100));
  
  const audits = data.audits;
  console.log('LCP:', audits['largest-contentful-paint'].displayValue);
  console.log('FCP:', audits['first-contentful-paint'].displayValue);
  console.log('TBT:', audits['total-blocking-time'].displayValue);
  console.log('Speed Index:', audits['speed-index'].displayValue);
  
  console.log('\n--- TOP ROADBLOCKS / OPPORTUNITIES ---');
  Object.values(audits).forEach(audit => {
    if (audit.score !== null && audit.score < 0.9 && audit.details && audit.details.type === 'opportunity') {
      console.log(`[${audit.title}] - Savings: ${audit.displayValue}`);
      if (audit.details.items) {
        audit.details.items.slice(0, 3).forEach(item => {
          console.log(`   -> ${item.url ? item.url.substring(0, 80) : '...'} (${Math.round(item.totalBytes/1024)} KB)`);
        });
      }
    }
  });

  console.log('\n--- TOP DIAGNOSTICS ---');
  ['mainthread-work-breakdown', 'bootup-time', 'network-requests', 'server-response-time', 'font-display'].forEach(id => {
    if (audits[id]) console.log(`${audits[id].title}: ${audits[id].displayValue}`);
  });

  if (audits['mainthread-work-breakdown'] && audits['mainthread-work-breakdown'].details && audits['mainthread-work-breakdown'].details.items) {
      console.log('\n--- MAIN THREAD BREAKDOWN ---');
      audits['mainthread-work-breakdown'].details.items.forEach(item => {
          console.log(`${item.groupLabel}: ${Math.round(item.duration)} ms`);
      });
  }

} catch(e) {
  console.error("Error parsing", e);
}
