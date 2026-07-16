import type { SVGProps } from 'react'

type Icon = (props: SVGProps<SVGSVGElement>) => JSX.Element

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
}

export const IconErp: Icon = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
    <path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4" />
  </svg>
)

export const IconCrm: Icon = (p) => (
  <svg {...base} {...p}>
    <path d="M16 3.5a4 4 0 0 1 0 7" />
    <circle cx="9" cy="7" r="3.5" />
    <path d="M2.5 20a6.5 6.5 0 0 1 13 0M17 13.5a6.5 6.5 0 0 1 4.5 6.5" />
  </svg>
)

export const IconPos: Icon = (p) => (
  <svg {...base} {...p}>
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M8 7h8M8 11h8M15 15h1" />
    <rect x="8" y="14.5" width="3" height="3" rx="0.5" />
  </svg>
)

export const IconQuote: Icon = (p) => (
  <svg {...base} {...p}>
    <path d="M6 3h9l4 4v14a0 0 0 0 1 0 0H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
    <path d="M14 3v5h5M8.5 13l2 2 4-4" />
  </svg>
)

export const IconCatalog: Icon = (p) => (
  <svg {...base} {...p}>
    <path d="M12 5.5C9.5 3.8 6.5 3.5 4 4v14c2.5-.5 5.5-.2 8 1.5 2.5-1.7 5.5-2 8-1.5V4c-2.5-.5-5.5-.2-8 1.5Z" />
    <path d="M12 5.5v14" />
  </svg>
)

export const IconServer: Icon = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="4" width="18" height="7" rx="1.5" />
    <rect x="3" y="13" width="18" height="7" rx="1.5" />
    <path d="M7 7.5h.01M7 16.5h.01M11 7.5h6M11 16.5h6" />
  </svg>
)

export const IconDomain: Icon = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.7 2.4 4 5.6 4 9s-1.3 6.6-4 9c-2.7-2.4-4-5.6-4-9s1.3-6.6 4-9Z" />
  </svg>
)

export const IconConsult: Icon = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3v2M12 19v2M4.2 6.2l1.4 1.4M18.4 16.4l1.4 1.4M3 12h2M19 12h2M4.2 17.8l1.4-1.4M18.4 7.6l1.4-1.4" />
    <circle cx="12" cy="12" r="3.5" />
  </svg>
)

export const IconArrow: Icon = (p) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const IconCheck: Icon = (p) => (
  <svg {...base} {...p}>
    <path d="M4 12.5l5 5 11-11" />
  </svg>
)

export const IconBolt: Icon = (p) => (
  <svg {...base} {...p}>
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
  </svg>
)

export const IconShield: Icon = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3Z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
)

export const IconGear: Icon = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
  </svg>
)

export const IconMail: Icon = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </svg>
)

export const IconPhone: Icon = (p) => (
  <svg {...base} {...p}>
    <path d="M5 3h3.5l1.5 5-2 1.5a12 12 0 0 0 5 5l1.5-2 5 1.5V21a1 1 0 0 1-1 1A17 17 0 0 1 4 5a1 1 0 0 1 1-2Z" />
  </svg>
)
