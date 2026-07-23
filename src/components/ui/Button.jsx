import React from 'react';
import Link from 'next/link';

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  target,
  rel,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-mono font-medium tracking-wide transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-brand-cyan text-dark-bg font-semibold hover:bg-sky-300 shadow-lg shadow-brand-cyan/20 hover:shadow-brand-cyan/30 active:scale-98",
    secondary: "bg-dark-surface text-brand-text border border-white/10 hover:border-brand-cyan/40 hover:bg-dark-hover active:scale-98",
    outline: "border border-brand-cyan/40 text-brand-cyan hover:bg-brand-cyan/10 active:scale-98",
    ghost: "text-brand-muted hover:text-brand-text hover:bg-white/5 active:scale-98",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-2.5",
  };

  const combinedClasses = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

  if (href) {
    if (href.startsWith('http') || href.startsWith('mailto:') || href.endsWith('.pdf')) {
      return (
        <a
          href={href}
          target={target || (href.startsWith('http') ? '_blank' : undefined)}
          rel={rel || (href.startsWith('http') ? 'noopener noreferrer' : undefined)}
          className={combinedClasses}
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
