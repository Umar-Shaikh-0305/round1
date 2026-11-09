// Angled terminal-style button. variant: 'primary' (crimson), 'ghost' (grey), 'locked'.
export default function TerminalButton({
  children,
  variant = 'primary',
  icon = null,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
}) {
  const locked = variant === 'locked';
  return (
    <button
      type={type}
      className={`tbtn tbtn--${variant} ${className}`}
      disabled={disabled || locked}
      onClick={onClick}
    >
      <span className="tbtn__chev" aria-hidden="true">«</span>
      <span className="tbtn__label">
        {locked && <LockIcon />}
        {icon}
        {children}
      </span>
      <span className="tbtn__chev" aria-hidden="true">»</span>
    </button>
  );
}

export function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm-3 8V7a3 3 0 1 1 6 0v3H9Z" />
    </svg>
  );
}
