const GLADIATORS = [
  { id: 'minimax',   emoji: '🔵', name: 'MiniMax',   model: 'MiniMax-Text-01',      url: 'https://cardvault-minimax-production.up.railway.app',   repo: 'realcoachap/cardvault-minimax',   color: '#3b82f6' },
  { id: 'kimi',      emoji: '🟣', name: 'Kimi',      model: 'Kimi K2',              url: 'https://cardvault-kimi-production.up.railway.app',      repo: 'realcoachap/cardvault-kimi',      color: '#a855f7' },
  { id: 'moonshot',  emoji: '🟡', name: 'Moonshot',  model: 'moonshot-v1-128k',     url: 'https://cardvault-moonshot-production.up.railway.app',  repo: 'realcoachap/cardvault-moonshot',  color: '#eab308' },
  { id: 'groq',      emoji: '🟠', name: 'Groq',      model: 'llama-3.3-70b',        url: 'https://cardvault-groq-production.up.railway.app',      repo: 'realcoachap/cardvault-groq',      color: '#f97316' },
]

const SCORES: Record<string, Record<string, number | null>> = {
  minimax:  { design: null, uniformity: null, typescript: null, compliance: null, bugs: null, recovery: null },
  kimi:     { design: null, uniformity: null, typescript: null, compliance: null, bugs: null, recovery: null },
  moonshot: { design: null, uniformity: null, typescript: null, compliance: null, bugs: null, recovery: null },
  groq:     { design: null, uniformity: null, typescript: null, compliance: null, bugs: null, recovery: null },
}

const WEIGHTS: Record<string, number> = {
  design: 25, uniformity: 20, typescript: 20, compliance: 15, bugs: 10, recovery: 10
}

const CATEGORY_LABELS: Record<string, string> = {
  design: '🎨 Design Fidelity',
  uniformity: '📐 Uniformity',
  typescript: '🔷 TypeScript',
  compliance: '📋 Spec Compliance',
  bugs: '🐛 Bug Rate',
  recovery: '⚡ Self-Recovery',
}

const PAGES = ['🏠 Home', '📦 Binder', '💰 StackValue', '📸 Scan', '⚙️ Settings']

export default function Colosseum() {
  return (
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#f59e0b', margin: 0 }}>⚔️ Caesar's Colosseum</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
          4 AI gladiators · 1 spec · 1 judge · Only one ascends
        </p>
        <div style={{ display: 'inline-block', marginTop: '1rem', padding: '0.4rem 1.2rem', background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 999, fontSize: '0.8rem', color: '#f59e0b' }}>
          🏟️ Round 1 — CardVault Championship · In Progress
        </div>
      </div>

      {/* Gladiator Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {GLADIATORS.map(g => {
          const scores = SCORES[g.id]
          const total = Object.entries(scores).reduce((sum, [cat, val]) => {
            return sum + (val !== null ? (val / 100) * WEIGHTS[cat] : 0)
          }, 0)
          const pagesCompleted = 0

          return (
            <div key={g.id} style={{
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${g.color}33`,
              borderRadius: 16,
              padding: '1.5rem',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Color accent */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: g.color, borderRadius: '16px 16px 0 0' }} />
              
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{g.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{g.name}</div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>{g.model}</div>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: g.color }}>{total > 0 ? Math.round(total) : '—'}</div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>/ 100 pts</div>
                </div>
              </div>

              {/* Page progress */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.4rem' }}>PAGES COMPLETE</div>
                <div style={{ display: 'flex', gap: 4 }}>
                  {PAGES.map((page, i) => (
                    <div key={i} title={page} style={{
                      flex: 1, height: 6, borderRadius: 3,
                      background: i < pagesCompleted ? g.color : 'rgba(255,255,255,0.1)'
                    }} />
                  ))}
                </div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.3rem' }}>{pagesCompleted}/5 pages</div>
              </div>

              {/* Score breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: '1.25rem' }}>
                {Object.entries(CATEGORY_LABELS).map(([cat, label]) => (
                  <div key={cat} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                    <span style={{ color: 'rgba(255,255,255,0.5)' }}>{label}</span>
                    <span style={{ color: scores[cat] !== null ? '#f59e0b' : 'rgba(255,255,255,0.2)', fontWeight: 600 }}>
                      {scores[cat] !== null ? `${scores[cat]}` : '—'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Links */}
              <div style={{ display: 'flex', gap: 8 }}>
                <a href={g.url} target="_blank" rel="noopener" style={{
                  flex: 1, textAlign: 'center', padding: '0.4rem', borderRadius: 8,
                  background: `${g.color}22`, border: `1px solid ${g.color}44`,
                  color: g.color, fontSize: '0.75rem', textDecoration: 'none', fontWeight: 600
                }}>🌐 Live Site</a>
                <a href={`https://github.com/${g.repo}`} target="_blank" rel="noopener" style={{
                  flex: 1, textAlign: 'center', padding: '0.4rem', borderRadius: 8,
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', textDecoration: 'none', fontWeight: 600
                }}>📦 Repo</a>
              </div>
            </div>
          )
        })}
      </div>

      {/* Leaderboard */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 16, padding: '1.5rem', marginBottom: '2rem' }}>
        <h2 style={{ margin: '0 0 1rem', color: '#f59e0b', fontSize: '1rem' }}>🏆 Live Leaderboard</h2>
        {GLADIATORS.map((g, i) => (
          <div key={g.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.6rem 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
            <span style={{ fontSize: '1.2rem', width: 24 }}>{['🥇','🥈','🥉','4️⃣'][i]}</span>
            <span>{g.emoji} {g.name}</span>
            <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '0%', background: g.color, borderRadius: 3, transition: 'width 0.5s ease' }} />
            </div>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', minWidth: 40, textAlign: 'right' }}>— pts</span>
          </div>
        ))}
      </div>

      {/* Scoring rubric */}
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '1.5rem', marginBottom: '2rem' }}>
        <h2 style={{ margin: '0 0 1rem', fontSize: '1rem', color: 'rgba(255,255,255,0.7)' }}>📋 Scoring Rubric</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
          {Object.entries(CATEGORY_LABELS).map(([cat, label]) => (
            <div key={cat} style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '0.85rem', marginBottom: 2 }}>{label}</div>
              <div style={{ fontSize: '0.7rem', color: '#f59e0b', fontWeight: 700 }}>{WEIGHTS[cat]}% weight</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>
        Judged by Caesar · Powered by Claude Opus 4.6 · 🏛️
        </div>
        <div style={{ marginTop: "0.75rem", display: "flex", gap: "1.5rem", justifyContent: "center" }}>
          <a href="/briefing" style={{ color: "#f59e0b", fontSize: "0.8rem", textDecoration: "none", fontWeight: 600 }}>⚖️ Judge&apos;s Briefing</a>
          <a href="/journal" style={{ color: "#f59e0b", fontSize: "0.8rem", textDecoration: "none", fontWeight: 600 }}>📓 Caesar&apos;s Journal</a></div><div style={{ marginTop: "0.5rem" }}><a href="/briefing" style={{ color: "#f59e0b", fontSize: "0.8rem", textDecoration: "none", fontWeight: 600 }}>⚖️ Read Judge&apos;s Briefing →</a>
      </div>
    </main>
  )
}
