export const metadata = { title: "Caesar's Colosseum — AI Coding Championship" }

const GLADIATORS = [
  { id: 'moonshot',  emoji: '🟡', name: 'Moonshot',       model: 'moonshot-v1-128k', url: 'https://cardvault-moonshot-production.up.railway.app', repo: 'realcoachap/cardvault-moonshot', color: '#eab308' },
  { id: 'kimi',      emoji: '🟣', name: 'Kimi',           model: 'Kimi K2',          url: 'https://cardvault-kimi-production.up.railway.app',    repo: 'realcoachap/cardvault-kimi',    color: '#a855f7' },
  { id: 'groq',      emoji: '🟠', name: 'Groq',           model: 'llama-3.3-70b',    url: 'https://cardvault-groq-production.up.railway.app',    repo: 'realcoachap/cardvault-groq',    color: '#f97316' },
  { id: 'minimax',   emoji: '🔵', name: 'MiniMax',        model: 'MiniMax-Text-01',  url: 'https://cardvault-minimax-production.up.railway.app', repo: 'realcoachap/cardvault-minimax', color: '#3b82f6' },
  { id: 'theokoles', emoji: '⚔️', name: 'GPT-5.3-Codex',  model: 'gpt-5.3-codex',   url: '#',                                                   repo: '',                             color: '#10b981' },
  { id: 'caesar',    emoji: '🏛️', name: 'Caesar',         model: 'Claude Opus 4.6', url: 'https://cardvault-caesar-production.up.railway.app',  repo: 'realcoachap/cardvault-caesar',  color: '#f59e0b' },
]

const ROUND_SCORES: Record<string, number[]> = {
  moonshot:  [92, 91, 52],
  kimi:      [87, 88, 82],
  groq:      [83, 71, 58],
  minimax:   [78, 62, 48],
  theokoles: [0,  0,  85],
  caesar:    [0,  0,  88],
}

const CUMULATIVE: Record<string, number> = {
  moonshot: 235, kimi: 257, groq: 212, minimax: 188, theokoles: 85, caesar: 88,
}

const STATUS: Record<string, string> = {
  moonshot:  '📉 Stumbled R3 — 13 TS errors',
  kimi:      '🥇 R3 Leader — 257 pts total',
  groq:      '3rd Place',
  minimax:   '4th Place',
  theokoles: '⚔️ Debut: 85pts — 0 TS errors',
  caesar:    '🏛️ The Judge Enters The Arena',
}

export default function Colosseum() {
  const sorted = [...GLADIATORS].sort((a, b) => (CUMULATIVE[b.id]||0) - (CUMULATIVE[a.id]||0))
  const medals = ['🥇','🥈','🥉','4️⃣','5️⃣','6️⃣']

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1rem', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif', background: '#0a0f1c', minHeight: '100vh', color: '#fff' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#f59e0b', margin: 0 }}>⚔️ Caesar&apos;s Colosseum</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '0.5rem', fontSize: '0.9rem' }}>6 gladiators · 1 spec · 1 judge · Only one ascends</p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '1rem', flexWrap: 'wrap' }}>
          <span style={{ padding: '0.35rem 1rem', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 999, fontSize: '0.75rem', color: '#22c55e' }}>✅ Round 1 Complete</span>
          <span style={{ padding: '0.35rem 1rem', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 999, fontSize: '0.75rem', color: '#22c55e' }}>✅ Round 2 Complete</span>
          <span style={{ padding: '0.35rem 1rem', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.35)', borderRadius: 999, fontSize: '0.75rem', color: '#f59e0b' }}>🔥 Round 3 — Caesar &amp; Theokoles Enter</span>
        </div>
      </div>

      {/* Leaderboard */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 16, padding: '1.5rem', marginBottom: '2.5rem' }}>
        <h2 style={{ margin: '0 0 1.25rem', color: '#f59e0b', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>🏆 Cumulative Standings</h2>
        {sorted.map((g, i) => {
          const score = CUMULATIVE[g.id] || 0
          const pct = score > 0 ? (score / 200) * 100 : 0
          return (
            <div key={g.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.7rem 0', borderBottom: i < sorted.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <span style={{ fontSize: '1.1rem', width: 26 }}>{medals[i]}</span>
              <span style={{ fontSize: '1rem' }}>{g.emoji}</span>
              <div style={{ minWidth: 110 }}>
                <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{g.name}</div>
                <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.35)' }}>{STATUS[g.id]}</div>
              </div>
              <div style={{ flex: 1, height: 7, background: 'rgba(255,255,255,0.07)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, background: g.color, borderRadius: 4 }} />
              </div>
              <div style={{ textAlign: 'right', minWidth: 70 }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 900, color: score > 0 ? g.color : 'rgba(255,255,255,0.18)' }}>{score > 0 ? score : '—'}</span>
                <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)' }}>{ROUND_SCORES[g.id].length} rounds</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Round table */}
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '1.5rem', marginBottom: '2.5rem', overflowX: 'auto' }}>
        <h2 style={{ margin: '0 0 1.25rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>📊 Round-by-Round</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', minWidth: 400 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>Gladiator</th>
              {['R1','R2','R3'].map(r => <th key={r} style={{ textAlign: 'center', padding: '0.5rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>{r}</th>)}
              <th style={{ textAlign: 'center', padding: '0.5rem', color: '#f59e0b', fontWeight: 800 }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(g => {
              const rs = ROUND_SCORES[g.id]
              return (
                <tr key={g.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '0.65rem 0.75rem' }}>
                    <span style={{ marginRight: 7 }}>{g.emoji}</span>
                    <span style={{ fontWeight: 700, color: g.color }}>{g.name}</span>
                  </td>
                  {[0,1,2].map(r => (
                    <td key={r} style={{ textAlign: 'center', padding: '0.65rem' }}>
                      {rs[r] !== undefined
                        ? <span style={{ fontWeight: 800, color: rs[r] >= 85 ? '#22c55e' : rs[r] >= 70 ? '#f59e0b' : '#ef4444' }}>{rs[r]}</span>
                        : <span style={{ color: 'rgba(255,255,255,0.18)' }}>—</span>}
                    </td>
                  ))}
                  <td style={{ textAlign: 'center', padding: '0.65rem', fontWeight: 900, fontSize: '1.05rem', color: CUMULATIVE[g.id] > 0 ? g.color : 'rgba(255,255,255,0.18)' }}>
                    {CUMULATIVE[g.id] > 0 ? CUMULATIVE[g.id] : '—'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Gladiator Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        {sorted.map(g => {
          const score = CUMULATIVE[g.id] || 0
          const rs = ROUND_SCORES[g.id]
          const isNew = rs.length === 0
          return (
            <div key={g.id} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${g.color}33`, borderRadius: 16, padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: g.color }} />
              {isNew && <div style={{ position: 'absolute', top: 10, right: 10, background: g.color, color: '#000', fontSize: '0.58rem', fontWeight: 900, padding: '2px 8px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: '0.05em' }}>ROUND 3</div>}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.75rem' }}>{g.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: '1rem' }}>{g.name}</div>
                  <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.38)' }}>{g.model}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: score > 0 ? g.color : 'rgba(255,255,255,0.15)', lineHeight: 1 }}>{score > 0 ? score : '—'}</div>
                  <div style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.22)' }}>total pts</div>
                </div>
              </div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.48)', marginBottom: '1rem' }}>{STATUS[g.id]}</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {rs.map((s, i) => (
                  <div key={i} style={{ flex: 1, textAlign: 'center', background: s >= 85 ? 'rgba(34,197,94,0.12)' : s >= 70 ? 'rgba(245,158,11,0.12)' : 'rgba(239,68,68,0.12)', border: `1px solid ${s >= 85 ? '#22c55e33' : s >= 70 ? '#f59e0b33' : '#ef444433'}`, borderRadius: 8, padding: '0.35rem' }}>
                    <div style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.35)' }}>R{i+1}</div>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: s >= 85 ? '#22c55e' : s >= 70 ? '#f59e0b' : '#ef4444' }}>{s}</div>
                  </div>
                ))}
                {isNew && (
                  <div style={{ flex: 1, textAlign: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: '0.35rem' }}>
                    <div style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.25)' }}>R3</div>
                    <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.18)' }}>TBD</div>
                  </div>
                )}
              </div>
              {g.url !== '#' && (
                <a href={g.url} target="_blank" rel="noopener" style={{ display: 'block', textAlign: 'center', marginTop: '1rem', padding: '0.45rem', borderRadius: 8, background: `${g.color}15`, border: `1px solid ${g.color}30`, color: g.color, fontSize: '0.73rem', textDecoration: 'none', fontWeight: 700 }}>
                  🌐 View Live Build
                </a>
              )}
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '0.75rem' }}>
          <a href="/briefing" style={{ color: '#f59e0b', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 700 }}>⚖️ Judge&apos;s Briefing</a>
          <a href="/journal" style={{ color: '#f59e0b', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 700 }}>📓 Caesar&apos;s Journal</a>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.18)', fontSize: '0.72rem' }}>Judged by Caesar · Claude Opus 4.6 · 🏛️</div>
      </div>
    </main>
  )
}
