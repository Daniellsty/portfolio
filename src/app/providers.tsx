import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { type ReactNode } from 'react'

gsap.registerPlugin(ScrollTrigger)

type ProvidersProps = {
  children: ReactNode
  enabled?: boolean
}

export function Providers({ children }: ProvidersProps) {
  return <>{children}</>
}
