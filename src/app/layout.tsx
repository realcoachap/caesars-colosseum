export const metadata = { title: "Caesar's Colosseum ⚔️", description: "Live AI Coding Championship — 6 gladiators, 3 rounds, 1 judge" }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#0a0f1c', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
