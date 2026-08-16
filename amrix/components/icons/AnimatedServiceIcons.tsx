import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function AutomationIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} {...props}>
      <circle cx="5" cy="6" r="1.6" className="icon-node" />
      <circle cx="19" cy="6" r="1.6" className="icon-node" style={{ animationDelay: "0.3s" }} />
      <circle cx="12" cy="18" r="1.6" className="icon-node" style={{ animationDelay: "0.6s" }} />
      <path d="M6.4 7 11 16.5M17.6 7 13 16.5M6.6 6h10.8" className="icon-flow" strokeLinecap="round" />
    </svg>
  );
}

export function StudioIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} {...props}>
      <g className="icon-orbit">
        <circle cx="12" cy="12" r="7" strokeDasharray="2 3" />
      </g>
      <circle cx="12" cy="12" r="2.2" className="icon-node" />
      <circle cx="12" cy="5" r="1.1" fill="currentColor" stroke="none" className="icon-node" style={{ animationDelay: "0.2s" }} />
      <circle cx="18" cy="15" r="1.1" fill="currentColor" stroke="none" className="icon-node" style={{ animationDelay: "0.5s" }} />
      <circle cx="6" cy="15" r="1.1" fill="currentColor" stroke="none" className="icon-node" style={{ animationDelay: "0.8s" }} />
    </svg>
  );
}

export function DigitalExperienceIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} {...props}>
      <rect x="3.5" y="5" width="17" height="13" rx="1.5" />
      <path d="M3.5 8.5h17" strokeLinecap="round" />
      <rect x="13.5" y="12" width="4.5" height="3.2" rx="0.4" className="icon-cursor" fill="currentColor" stroke="none" opacity={0.9} />
    </svg>
  );
}

export function MarketingIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} {...props}>
      <path d="M3.5 19.5h17" strokeLinecap="round" />
      <rect x="5.5" y="12" width="2.6" height="6" rx="0.4" fill="currentColor" stroke="none" className="icon-bar" />
      <rect x="10.7" y="8.5" width="2.6" height="9.5" rx="0.4" fill="currentColor" stroke="none" className="icon-bar" style={{ animationDelay: "0.3s" }} />
      <rect x="15.9" y="5.5" width="2.6" height="12.5" rx="0.4" fill="currentColor" stroke="none" className="icon-bar" style={{ animationDelay: "0.6s" }} />
    </svg>
  );
}

export function AuditIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} {...props}>
      <path d="M12 3.5 19 6v5.2c0 4.3-3 7-7 9.3-4-2.3-7-5-7-9.3V6l7-2.5Z" />
      <g clipPath="url(#audit-clip)">
        <rect x="5.5" y="4" width="13" height="2" className="icon-scan" fill="url(#audit-gradient)" stroke="none" opacity={0.8} />
      </g>
      <path d="m9 12.2 2 2 4-4.4" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <clipPath id="audit-clip">
          <path d="M12 3.5 19 6v5.2c0 4.3-3 7-7 9.3-4-2.3-7-5-7-9.3V6l7-2.5Z" />
        </clipPath>
        <linearGradient id="audit-gradient" x1="0" x2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
