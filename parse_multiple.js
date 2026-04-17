const fs = require('fs');

const files = ['lh-v1.json', 'lh-v2.json', 'lh-v3.json'];

files.forEach(file => {
  try {
    if (!fs.existsSync(file)) {
      console.log(`\n=== NO ${file} ===`);
      return;
    }
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    const audits = data.audits;
    
    console.log(`\n=== ${file.toUpperCase()} ===`);
    console.log('Score:', Math.round(data.categories.performance.score * 100));
    console.log('LCP:', audits['largest-contentful-paint'].displayValue);
    console.log('TBT:', audits['total-blocking-time'].displayValue);
    console.log('Speed Index:', audits['speed-index'].displayValue);
    
    console.log('\n--- TOP ROADBLOCKS / OPPORTUNITIES ---');
    Object.values(audits).forEach(audit => {
      if (audit.score !== null && audit.score < 0.9 && audit.details && audit.details.type === 'opportunity') {
        console.log(`[${audit.title}] - Savings: ${audit.displayValue}`);
        if (audit.details.items) {
          audit.details.items.slice(0, 3).forEach(item => {
            console.log(`   -> ${item.url ? item.url.split('/').pop() || item.url : '...'}`);
          });
        }
      }
    });

    console.log('\n--- MAIN THREAD ---');
    if (audits['mainthread-work-breakdown']?.details?.items) {
      audits['mainthread-work-breakdown'].details.items.forEach((x,i)=> {
         if(i<3) console.log(x.groupLabel, Math.round(x.duration),'ms');
      });
    }

    console.log('\n--- JS BOOTUP / HEAVY SCRIPTS ---');
    if (audits['bootup-time']?.details?.items) {
      audits['bootup-time'].details.items.slice(0, 3).forEach(x => {
         let url = x.url.split('/').pop() || x.url;
         if(url.length > 50) url = url.substring(0,50)+'...';
         console.log(url, ':', Math.round(x.total),'ms');
      });
    }

  } catch(e) {
    console.error(`Error parsing ${file}:`, e.message);
  }
});
