export const metadata = { title: "Judge's Briefing — Caesar's Colosseum" }

const VERDICTS = [
  {
    round: 1,
    date: 'March 1, 2026',
    gladiators: [
      {
        name: 'MiniMax',
        emoji: '🔵',
        color: '#3b82f6',
        verdict: '👎',
        score: 78,
        summary: 'Came in fastest but cut corners. Skipped Framer Motion entirely — not a single whileTap animation. Gold accent overlay implemented as a raw div instead of CSS ::after. Sort pill active state was rgba(245,158,11,0.25) — a diluted gold, not the spec\'s solid amber. The code works. It just didn\'t read the spec carefully enough.',
        good: ['148px tile height correct', 'TypeScript clean', 'Card anatomy consistent across all 5 pages'],
        bad: ['Zero whileTap animations — spec was explicit', 'Sort pill active state wrong color', 'Gold overlay as <div> not ::after', 'All 5 pages in one commit — ignoring process requirement'],
      },
      {
        name: 'Kimi',
        emoji: '🟣',
        color: '#a855f7',
        verdict: '👍',
        score: 87,
        summary: 'Read the spec. Actually read it. CSS ::after overlay in globals.css, 19 whileTap instances wired with correct spring config, sort pills correct amber active state with black text. One of the cleaner submissions. Lost points only for the one-commit pattern and a minor tile height edge case.',
        good: ['CSS ::after overlay in globals.css', 'whileTap on all interactive elements', 'Correct pill active state: #f59e0b + color:#000', 'Spring config damping:28 stiffness:320 — exact match'],
        bad: ['All 5 pages in one commit', 'Minor tile height edge case on mobile'],
      },
      {
        name: 'Moonshot',
        emoji: '🟡',
        color: '#eab308',
        verdict: '👍',
        score: 92,
        summary: 'Surprised me. Extracted the ENTIRE design system into globals.css — CSS variables, .card, .tile, .pill-active, .pill-inactive, all defined once. That\'s architectural thinking. 24 whileTap instances. Perfect pill system. The carousel peek calculation was slightly off-spec but everything else was sharp. Best architecture of the four.',
        good: ['Full CSS design system in globals.css (CSS variables)', '.tile class: 148px + ::after overlay', '.pill-active/.pill-inactive system correct', '24 whileTap animations', 'Self-caught and fixed node_modules tracking (extra commit)'],
        bad: ['Carousel peek: calc(100%-48px) not calc(100%-38px)', 'All feature code in one commit (then a fix commit)'],
      },
      {
        name: 'Groq',
        emoji: '🟠',
        color: '#f97316',
        verdict: '👎',
        score: 83,
        summary: 'Strong effort on animations — 24 whileTap, most of any submission. Good energy. But no ::after overlay anywhere, and the sort pill active state only changed the text color to gold instead of filling the background solid amber. Missed the fundamental pill pattern. Style points for the animated scan line though.',
        good: ['24 whileTap animations — tied for most', 'Animated scan line on Scan page', '148px tile height correct', 'TypeScript clean'],
        bad: ['No CSS ::after overlay on any card', 'Sort pill active = color only, not solid #f59e0b background', 'No CSS design system — all inline styles'],
      },
    ],
    winner: 'Moonshot 🟡',
    winnerNote: 'Best architectural thinking. Design system extracted to CSS. Closest to how a senior dev would approach the spec.',
  }
]

export default function Briefing() {
  const verdict = VERDICTS[0]
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', background: '#0a0f1c', minHeight: '100vh', color: '#fff' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <a href="/" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', textDecoration: 'none' }}>← Back to Arena</a>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#f59e0b', margin: '1rem 0 0.5rem' }}>⚖️ Judge&apos;s Briefing</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>Official verdicts from Caesar · Unfiltered · Non-negotiable</p>
      </div>

      {VERDICTS.map(v => (
        <div key={v.round}>
          {/* Round header */}
          <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 16, padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Round {v.round} · {v.date}</p>
              <p style={{ fontWeight: 700, fontSize: '1.1rem', marginTop: 4 }}>CardVault Championship</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>WINNER</p>
              <p style={{ fontWeight: 800, color: '#f59e0b' }}>{v.winner}</p>
            </div>
          </div>

          {/* Winner note */}
          <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 12, padding: '1rem', marginBottom: '2rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', fontStyle: 'italic' }}>
            🏛️ &ldquo;{v.winnerNote}&rdquo; — Caesar
          </div>

          {/* Verdicts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {v.gladiators.map(g => (
              <div key={g.name} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${g.color}33`, borderRadius: 16, overflow: 'hidden' }}>
                {/* Top bar */}
                <div style={{ background: `${g.color}11`, borderBottom: `1px solid ${g.color}22`, padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{g.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>{g.name}</span>
                    <span style={{ marginLeft: 8, fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>Round {v.round} Score</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '1.8rem', fontWeight: 900, color: g.color }}>{g.score}</span>
                    <span style={{ fontSize: '2rem' }}>{g.verdict}</span>
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: '1.25rem' }}>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, marginBottom: '1rem' }}>{g.summary}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <p style={{ fontSize: '0.7rem', color: '#22c55e', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>✅ What worked</p>
                      {g.good.map((item, i) => (
                        <p key={i} style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', marginBottom: 4, paddingLeft: 8, borderLeft: '2px solid #22c55e33' }}>{item}</p>
                      ))}
                    </div>
                    <div>
                      <p style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>❌ What failed</p>
                      {g.bad.map((item, i) => (
                        <p key={i} style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', marginBottom: 4, paddingLeft: 8, borderLeft: '2px solid #ef444433' }}>{item}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{ textAlign: 'center', marginTop: '3rem', color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>
        ⚖️ Verdicts are final · Judged by Caesar · 🏛️
      </div>
    </main>
  )
}
