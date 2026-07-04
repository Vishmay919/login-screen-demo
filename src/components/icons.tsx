import type { SVGProps } from 'react'

// Inline SVGs standing in for the Figma icons; Font Awesome Pro isn't free to bundle.
type IconProps = SVGProps<SVGSVGElement>

export function PersonIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M12 12.5a4.25 4.25 0 1 0 0-8.5 4.25 4.25 0 0 0 0 8.5ZM4.5 20a7.5 7.5 0 0 1 15 0"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function BriefcaseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect x="3" y="7.5" width="18" height="12.5" rx="2.2" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5M3 12.5h18"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function CheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="m5 12.5 4.5 4.5L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function EyeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.75" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

export function EyeOffIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M4 5.5 20 19M9.9 6.1A9.6 9.6 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-2.8 3.4M6.2 8.1A16.6 16.6 0 0 0 2.5 12S6 18.5 12 18.5c1 0 1.9-.15 2.7-.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.9 10a3 3 0 0 0 4.2 4.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

export function ShieldCheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M12 3 5 5.5v5c0 4.4 3 7.7 7 9 4-1.3 7-4.6 7-9v-5L12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function UsFlagIcon(props: IconProps) {
  const RED_STRIPES = 7
  const stripe = 13 / RED_STRIPES // stripe height across a 13-unit tall flag
  return (
    <svg viewBox="0 0 20 13" fill="none" aria-hidden {...props}>
      <rect width="20" height="13" fill="#fff" />
      {Array.from({ length: RED_STRIPES }, (_, i) => (
        <rect key={i} y={i * 2 * stripe} width="20" height={stripe} fill="#d7263d" />
      ))}
      <rect width="8.4" height={stripe * 7} fill="#283991" />
    </svg>
  )
}

export function GbFlagIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 13" fill="none" aria-hidden {...props}>
      <rect width="20" height="13" fill="#012169" />
      <path d="M0 0 20 13M20 0 0 13" stroke="#fff" strokeWidth="2.6" />
      <path d="M0 0 20 13M20 0 0 13" stroke="#c8102e" strokeWidth="1" />
      <path d="M10 0v13M0 6.5h20" stroke="#fff" strokeWidth="4.2" />
      <path d="M10 0v13M0 6.5h20" stroke="#c8102e" strokeWidth="2.4" />
    </svg>
  )
}

export function InFlagIcon(props: IconProps) {
  const band = 13 / 3
  return (
    <svg viewBox="0 0 20 13" fill="none" aria-hidden {...props}>
      <rect width="20" height="13" fill="#fff" />
      <rect width="20" height={band} fill="#ff9933" />
      <rect y={band * 2} width="20" height={band} fill="#138808" />
      <circle cx="10" cy="6.5" r="1.6" stroke="#000080" strokeWidth="0.6" />
    </svg>
  )
}

export function AuFlagIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 13" fill="none" aria-hidden {...props}>
      <rect width="20" height="13" fill="#012169" />
      <path d="M0 0 10 6.5M10 0 0 6.5" stroke="#fff" strokeWidth="1.3" />
      <path d="M5 0v6.5M0 3.25h10" stroke="#fff" strokeWidth="2" />
      <path d="M5 0v6.5M0 3.25h10" stroke="#c8102e" strokeWidth="1.1" />
      <circle cx="5" cy="10.2" r="1" fill="#fff" />
      <circle cx="15" cy="2.8" r="0.7" fill="#fff" />
      <circle cx="17.6" cy="5.8" r="0.7" fill="#fff" />
      <circle cx="15" cy="10.6" r="0.7" fill="#fff" />
      <circle cx="12.6" cy="6.4" r="0.5" fill="#fff" />
    </svg>
  )
}
