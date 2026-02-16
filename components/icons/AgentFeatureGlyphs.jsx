const baseProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '1.8',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function PersistentAgentGlyph(props) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2" />
      <path d="M6.2 6.2l1.5 1.5M16.3 16.3l1.5 1.5M17.8 6.2l-1.5 1.5M7.7 16.3l-1.5 1.5" />
      <path d="M12 7.5a4.5 4.5 0 0 1 4.5 4.5" />
    </svg>
  )
}

export function ProactiveDecisionGlyph(props) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="12" r="7.2" />
      <path d="M12 12l4.5-2.8" />
      <path d="M11.7 12.2l-3.9 4.2" />
      <path d="M14.9 6.8l2.8.2-.2 2.8" />
      <circle cx="12" cy="12" r="1.7" />
    </svg>
  )
}

export function IntegrationMeshGlyph(props) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="3.8" y="3.8" width="6" height="6" rx="1.6" />
      <rect x="14.2" y="3.8" width="6" height="6" rx="1.6" />
      <rect x="3.8" y="14.2" width="6" height="6" rx="1.6" />
      <rect x="14.2" y="14.2" width="6" height="6" rx="1.6" />
      <path d="M9.8 6.8h4.4M6.8 9.8v4.4M17.2 9.8v4.4M9.8 17.2h4.4" />
    </svg>
  )
}

export function ChatThreadGlyph(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M4.2 6.8a2.6 2.6 0 0 1 2.6-2.6h10.4a2.6 2.6 0 0 1 2.6 2.6v6.4a2.6 2.6 0 0 1-2.6 2.6H11l-3.8 3v-3H6.8a2.6 2.6 0 0 1-2.6-2.6z" />
      <path d="M8 9.6h8M8 12.3h5.3" />
    </svg>
  )
}

export function SecureGuardGlyph(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 3.5l6.5 2.6v5.3c0 4.1-2.7 6.8-6.5 9.1-3.8-2.3-6.5-5-6.5-9.1V6.1z" />
      <path d="M8.8 11.7l2.2 2.2 4.2-4.2" />
    </svg>
  )
}

export function AgentWorkspaceGlyph(props) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="3.6" y="4.6" width="16.8" height="11.2" rx="2" />
      <path d="M9 19.4h6M12 15.8v3.6" />
      <path d="M8 9.2l2.1 1.9L8 13M12.4 13h3.6" />
    </svg>
  )
}
