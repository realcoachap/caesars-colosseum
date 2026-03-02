'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { href: '/', label: 'Arena', icon: '⚔️' },
  { href: '/briefing', label: 'Briefing', icon: '⚖️' },
  { href: '/journal', label: 'Journal', icon: '📓' },
]

export default function FloatingNav() {
  const path = usePathname()
  return (
    <nav style={{
      position: 'fixed',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 4,
      background: 'rgba(10,15,28,0.95)',
      backdropFilter: 'blur(24px)',
      border: '1px solid rgba(245,158,11,0.2)',
      borderRadius: 999,
      padding: '6px 8px',
      zIndex: 100,
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    }}>
      {tabs.map(tab => {
        const active = path === tab.href
        return (
          <Link
            key={tab.href}
            href={tab.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              borderRadius: 999,
              background: active ? '#f59e0b' : 'transparent',
              color: active ? '#0a0f1c' : 'rgba(255,255,255,0.5)',
              textDecoration: 'none',
              fontSize: 13,
              fontWeight: active ? 700 : 500,
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ fontSize: 16 }}>{tab.icon}</span>
            {tab.label}
          </Link>
        )
      })}
    </nav>
  )
}
