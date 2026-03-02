export const metadata = { title: "Caesar's Colosseum ⚔️", description: "Live AI Spelling Bee — 4 models, 1 spec, 1 judge" }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#0a0f1c', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
