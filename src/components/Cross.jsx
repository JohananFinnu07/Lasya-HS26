export default function Cross({ size = 26, className = '' }) {
  return (
    <svg
      viewBox="0 0 24 36"
      width={size}
      height={size * 1.5}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M12 2v32M5 12h14" />
      <path d="M10.4 2h3.2M10.4 34h3.2M5 10.4v3.2M19 10.4v3.2" strokeWidth="0.9" />
      <circle cx="12" cy="12" r="1.5" strokeWidth="0.8" />
    </svg>
  )
}
