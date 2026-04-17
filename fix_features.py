import sys

content = """function DashboardVisual() {
  const rows = [
    { label: "Crescer Clientes", pct: 78, color: "bg-[#02CE37]" },
    { label: "Campanha Q3", pct: 45, color: "bg-amber-500" },
    { label: "Lançamento App", pct: 92, color: "bg-[#02CE37]" }
  ];

  return (
    <div className="w-full h-full p-4 flex flex-col justify-center">
      <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm w-full mx-auto max-w-[280px]">
        {rows.map((r, i) => (
          <motion.div key={i} className="mb-3 last:mb-0" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[12px] font-bold text-slate-700">{r.label}</span>
              <span className="text-[11px] font-black text-slate-900">{r.pct}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full ${r.color}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${r.pct}%` }}
                transition={{ duration: 1, delay: 0.3 + (i * 0.1) }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function IntegrationsVisual() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
       <motion.div 
         className="bg-white border border-slate-100 rounded-full w-[160px] h-[160px] flex items-center justify-center relative shadow-lg"
         initial={{ scale: 0.8, opacity: 0 }}
         whileInView={{ scale: 1, opacity: 1 }}
         transition={{ type: "spring", stiffness: 100 }}
       >
         {/* Simple SVG Ring */}
         <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
           <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="8" />
           <motion.circle 
             cx="50" cy="50" r="45" fill="none" stroke="#02CE37" strokeWidth="8" strokeLinecap="round"
             strokeDasharray="283" strokeDashoffset="283"
             initial={{ strokeDashoffset: 283 }}
             whileInView={{ strokeDashoffset: 283 * 0.15 }} // 85%
             transition={{ duration: 1.5, delay: 0.3 }}
             transform="rotate(-90 50 50)"
           />
         </svg>
         <div className="text-center z-10">
           <span className="block text-[32px] font-black tracking-tight text-[#0c111d] leading-none mb-1">85%</span>
           <span className="block text-[10px] uppercase font-bold text-[#02CE37] tracking-wider">Alinhamento</span>
         </div>
       </motion.div>
    </div>
  );
}

function PerformanceVisual() {
  const users = [
    { name: "Marina Silva", score: "9.8", medal: "🥇" },
    { name: "Rafael Costa", score: "9.5", medal: "🥈" },
    { name: "Ana Souza", score: "9.1", medal: "🥉" }
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[260px] flex flex-col gap-2">
        {users.map((u, i) => (
          <motion.div 
            key={i} 
            className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100 shadow-sm"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15, type: "spring" }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3">
              <span className="text-[16px]">{u.medal}</span>
              <span className="text-[13px] font-bold text-slate-800">{u.name}</span>
            </div>
            <span className="text-[13px] font-black text-[#02CE37]">{u.score}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}"""

with open('src/components/sections/Features.tsx', 'r', encoding='utf-8') as f:
    lines = f.read().splitlines()

start = lines.index('function DashboardVisual() {')
end = lines.index('const CARDS = [')

new_lines = lines[:start] + content.splitlines() + [''] + lines[end-3:]

with open('src/components/sections/Features.tsx', 'w', encoding='utf-8') as f:
    f.write('\\n'.join(new_lines))
