export function TripAdvisorLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 36" className={className} aria-label="TripAdvisor" fill="currentColor">
      <circle cx="18" cy="18" r="6.5" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <circle cx="40" cy="18" r="6.5" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="40" cy="18" r="2.5" />
      <text
        x="55"
        y="24"
        fontFamily="Outfit, system-ui, sans-serif"
        fontWeight="600"
        fontSize="18"
        letterSpacing="-0.3"
      >
        Tripadvisor
      </text>
    </svg>
  );
}
