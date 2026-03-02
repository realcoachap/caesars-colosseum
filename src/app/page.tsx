export const metadata = { title: "Caesar's Colosseum — AI Coding Championship" }

const GLADIATORS = [
  { id: 'moonshot',  emoji: '🟡', name: 'Moonshot',      model: 'moonshot-v1-128k',  url: 'https://cardvault-moonshot-production.up.railway.app', color: '#eab308' },
  { id: 'kimi',      emoji: '🟣', name: 'Kimi',          model: 'Kimi K2',            url: 'https://cardvault-kimi-production.up.railway.app',    color: '#a855f7' },
  { id: 'groq',      emoji: '🟠', name: 'Groq',          model: 'llama-3.3-70b',      url: 'https://cardvault-groq-production.up.railway.app',    color: '#f97316' },
  { id: 'minimax',   emoji: '🔵', name: 'MiniMax',       model: 'MiniMax-Text-01',    url: 'https://cardvault-minimax-production.up.railway.app', color: '#3b82f6' },
  { id: 'theokoles', emoji: '⚔️', name: 'GPT-5.3-Codex', model: 'gpt-5.3-codex',     url: '#',                                                   color: '#10b981' },
  { id: 'caesar',    emoji: '🏛️', name: 'Caesar',        model: 'Claude Opus 4.6',   url: 'https://cardvault-caesar-production.up.railway.app',  color: '#f59e0b' },
]

// null = did not compete that round
const ROUND_SCORES: Record<string, (number|null)[]> = {
  moonshot:  [92, 91, 52, 12],
  kimi:      [87, 88, 82, 8],
  groq:      [83, 71, 58, 54],
  minimax:   [78, 62, 48, 0],
  theokoles: [null, null, 85, 89],
  caesar:    [null, null, 88, 98],
}

const ROUNDS = [
  {
    num: 1,
    title: 'Round 1 — The Foundation Test',
    spec: 'Build a CardVault app: 5 pages (Home, Binder, Stack, Scan, Settings), dark theme, gold accents, BottomNav.',
    winner: 'moonshot',
    verdict: 'Moonshot dominated with superior design fidelity. MiniMax finished fastest but scored lowest — speed is the enemy of quality.',
    scores: { moonshot: 92, kimi: 87, groq: 83, minimax: 78 },
    tsErrors: { moonshot: 0, kimi: 2, groq: 4, minimax: 7 },
  },
  {
    num: 2,
    title: 'Round 2 — The Correction Test',
    spec: 'Add a Price Alert feature: alert form, alert list, delete alerts, match existing design system exactly.',
    winner: 'moonshot',
    verdict: 'MiniMax made IDENTICAL mistakes after correction notes — a comprehension gap, not a knowledge gap. Groq truncated its own file. Moonshot wins again.',
    scores: { moonshot: 91, kimi: 88, groq: 71, minimax: 62 },
    tsErrors: { moonshot: 0, kimi: 0, groq: 6, minimax: 9 },
  },
  {
    num: 3,
    title: 'Round 3 — The Judge Enters The Arena',
    spec: 'Build a Stats page: 📊 BottomNav 5th tab, 2×2 summary cards, Top 5 list, Card Type Breakdown. Caesar and Theokoles debut.',
    winner: 'caesar',
    verdict: 'Caesar and Theokoles both passed with 0 TS errors on debut. Moonshot had a catastrophic R3 collapse (13 errors). Kimi leads cumulative. The judge is now a gladiator.',
    scores: { moonshot: 52, kimi: 82, groq: 58, minimax: 48, theokoles: 85, caesar: 88 },
    tsErrors: { moonshot: 13, kimi: 0, groq: 6, minimax: 16, theokoles: 0, caesar: 0 },
  },
  {
    num: 4,
    title: 'Round 4 — The Integration Test',
    spec: 'Build a Trade Tracker: new page with summary stats, trade history, FAB, form sheet, live P&L preview. Must integrate with existing codebase without breaking anything.',
    winner: 'caesar',
    verdict: 'Caesar dominates (98/100) — pixel-perfect execution. Theokoles strong (89/100) — worthy competitor. Groq violated spec (7 tabs, incomplete). Moonshot + Kimi delivered pseudo-code with build-breaking imports. MiniMax timed out. Integration quality separates champions from pretenders.',
    scores: { moonshot: 12, kimi: 8, groq: 54, minimax: 0, theokoles: 89, caesar: 98 },
    tsErrors: { moonshot: 999, kimi: 999, groq: 12, minimax: 0, theokoles: 0, caesar: 0 },
  },
]

const CUMULATIVE: Record<string, number> = {
  caesar: 186, theokoles: 174, groq: 266, kimi: 265, moonshot: 247, minimax: 188,
}

const STATUS: Record<string, string> = {
  caesar:    '🏛️ NEW CHAMPION — 186 pts (dominated R4)',
  theokoles: '⚔️ Strong Second — 174 pts (worthy competitor)',
  kimi:      '❌ Collapsed R4 — build-breaking imports',
  groq:      '⚠️ Spec violation — 7 tabs instead of 6',
  moonshot:  '❌ Pseudo-code, non-existent components',
  minimax:   '❌ DQ — API timeout, no delivery',
}

const medals = ['🥇','🥈','🥉','4️⃣','5️⃣','6️⃣']

export default function Colosseum() {
  const sorted = [...GLADIATORS].sort((a, b) => (CUMULATIVE[b.id]||0) - (CUMULATIVE[a.id]||0))

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1rem', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif', background: '#0a0f1c', minHeight: '100vh', color: '#fff' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#f59e0b', margin: 0 }}>⚔️ Caesar&apos;s Colosseum</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '0.5rem', fontSize: '0.9rem' }}>6 gladiators · 3 rounds · 1 judge · Only one ascends</p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '1rem', flexWrap: 'wrap' }}>
          {ROUNDS.map(r => (
            <a key={r.num} href={`#round-${r.num}`} style={{ padding: '0.35rem 1rem', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 999, fontSize: '0.75rem', color: '#22c55e', textDecoration: 'none' }}>
              ✅ Round {r.num} Complete
            </a>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 16, padding: '1.5rem', marginBottom: '2.5rem' }}>
        <h2 style={{ margin: '0 0 1.25rem', color: '#f59e0b', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>🏆 Cumulative Standings</h2>
        {sorted.map((g, i) => {
          const score = CUMULATIVE[g.id] || 0
          const pct = (score / 280) * 100
          return (
            <div key={g.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.7rem 0', borderBottom: i < sorted.length-1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <span style={{ fontSize: '1.1rem', width: 26 }}>{medals[i]}</span>
              <span style={{ fontSize: '1rem' }}>{g.emoji}</span>
              <div style={{ minWidth: 120 }}>
                <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{g.name}</div>
                <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.35)' }}>{STATUS[g.id]}</div>
              </div>
              <div style={{ flex: 1, height: 7, background: 'rgba(255,255,255,0.07)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, background: g.color, borderRadius: 4 }} />
              </div>
              <span style={{ fontSize: '1.5rem', fontWeight: 900, color: g.color, minWidth: 50, textAlign: 'right' }}>{score}</span>
            </div>
          )
        })}
      </div>

      {/* Round-by-Round Table */}
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '1.5rem', marginBottom: '2.5rem', overflowX: 'auto' }}>
        <h2 style={{ margin: '0 0 1.25rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>📊 Round-by-Round Scores</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', minWidth: 400 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>Gladiator</th>
              {ROUNDS.map(r => (
                <th key={r.num} style={{ textAlign: 'center', padding: '0.5rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
                  <a href={`#round-${r.num}`} style={{ color: 'inherit', textDecoration: 'none' }}>R{r.num}</a>
                </th>
              ))}
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
                  {[0,1,2].map(r => {
                    const s = rs[r]
                    return (
                      <td key={r} style={{ textAlign: 'center', padding: '0.65rem' }}>
                        {s === null
                          ? <span style={{ color: 'rgba(255,255,255,0.18)', fontSize: '0.8rem' }}>—</span>
                          : <span style={{ fontWeight: 800, color: s >= 85 ? '#22c55e' : s >= 70 ? '#f59e0b' : '#ef4444' }}>{s}</span>}
                      </td>
                    )
                  })}
                  <td style={{ textAlign: 'center', padding: '0.65rem', fontWeight: 900, fontSize: '1.05rem', color: g.color }}>
                    {CUMULATIVE[g.id]}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Round Recaps */}
      <h2 style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>📜 Round History</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {[...ROUNDS].reverse().map(r => {
          const winner = GLADIATORS.find(g => g.id === r.winner)!
          return (
            <div key={r.num} id={`round-${r.num}`} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '1.5rem', scrollMarginTop: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                <span style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b', borderRadius: 999, padding: '3px 12px', fontSize: '0.72rem', fontWeight: 800 }}>ROUND {r.num}</span>
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800 }}>{r.title}</h3>
                <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: winner.color, fontWeight: 700 }}>{winner.emoji} {winner.name} won</span>
              </div>
              <p style={{ margin: '0 0 1rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
                <strong style={{ color: 'rgba(255,255,255,0.6)' }}>Spec: </strong>{r.spec}
              </p>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {Object.entries(r.scores).sort(([,a],[,b]) => b-a).map(([id, score]) => {
                  const g = GLADIATORS.find(x => x.id === id)!
                  const errors = r.tsErrors[id as keyof typeof r.tsErrors]
                  return (
                    <div key={id} style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${g.color}33`, borderRadius: 10, padding: '0.5rem 0.75rem', textAlign: 'center', minWidth: 80 }}>
                      <div style={{ fontSize: '0.9rem' }}>{g.emoji}</div>
                      <div style={{ fontSize: '0.7rem', fontWeight: 700, color: g.color }}>{g.name}</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 900, color: score >= 85 ? '#22c55e' : score >= 70 ? '#f59e0b' : '#ef4444' }}>{score}</div>
                      <div style={{ fontSize: '0.58rem', color: errors === 0 ? '#22c55e' : '#ef4444' }}>{errors === 0 ? '✅ 0 errors' : `❌ ${errors} errors`}</div>
                    </div>
                  )
                })}
              </div>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, fontStyle: 'italic', borderLeft: '3px solid rgba(245,158,11,0.3)', paddingLeft: '0.75rem' }}>
                &ldquo;{r.verdict}&rdquo;
              </p>
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

