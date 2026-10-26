import type { ReactNode } from 'react'
import { profile } from '../../data/portfolio'

const links: Array<{
  id: string
  label: string
  href: string | null
  bg: string
  icon: ReactNode
}> = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: profile.linkedin,
    bg: '#0A66C2',
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="h-[1.15rem] w-[1.15rem]" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: 'twitter',
    label: 'Twitter',
    href: profile.twitter,
    bg: '#1DA1F2',
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="h-[1.15rem] w-[1.15rem]" aria-hidden>
        <path d="M22.46 6.01c-.77.34-1.6.57-2.46.68a4.27 4.27 0 0 0 1.88-2.37 8.5 8.5 0 0 1-2.72 1.04A4.26 4.26 0 0 0 11.8 8.23c0 .33.04.66.11.97A12.1 12.1 0 0 1 3.2 4.78a4.25 4.25 0 0 0-.58 2.14c0 1.48.75 2.79 1.9 3.55a4.24 4.24 0 0 1-1.93-.53v.05c0 2.07 1.47 3.8 3.42 4.19a4.3 4.3 0 0 1-1.12.15c-.28 0-.54-.03-.8-.08a4.27 4.27 0 0 0 3.98 2.96A8.54 8.54 0 0 1 1.76 18.97 12.05 12.05 0 0 0 8.29 20.88c7.55 0 11.68-6.25 11.68-11.67v-.47c.8-.58 1.5-1.3 2.05-2.13z" />
      </svg>
    ),
  },
  {
    id: 'gmail',
    label: 'Gmail',
    href: `mailto:${profile.email}`,
    bg: '#2C2C2E',
    icon: (
      <svg viewBox="52 42 88 66" className="h-[1.15rem] w-[1.15rem]" aria-hidden>
        <path fill="#4285F4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6" />
        <path fill="#34A853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15" />
        <path fill="#FBBC05" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2" />
        <path fill="#EA4335" d="M72 74V48l24 18 24-18v26L96 92" />
        <path fill="#C5221F" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2" />
      </svg>
    ),
  },
]

const boxClass =
  'flex h-11 w-11 items-center justify-center rounded-xl p-2.5 text-white shadow-sm transition-transform hover:scale-105'

export function SocialSidebar() {
  return (
    <aside className="fixed top-1/2 right-4 z-50 flex -translate-y-1/2 flex-col gap-3.5 p-1 md:right-6">
      {links.map((link) =>
        link.href ? (
          <a
            key={link.id}
            href={link.href}
            target={link.id === 'gmail' ? undefined : '_blank'}
            rel="noopener noreferrer"
            aria-label={link.label}
            className={boxClass}
            style={{ backgroundColor: link.bg }}
          >
            {link.icon}
          </a>
        ) : (
          <span
            key={link.id}
            aria-label={link.label}
            title={link.label}
            className={`${boxClass} cursor-default opacity-90`}
            style={{ backgroundColor: link.bg }}
          >
            {link.icon}
          </span>
        ),
      )}
    </aside>
  )
}
