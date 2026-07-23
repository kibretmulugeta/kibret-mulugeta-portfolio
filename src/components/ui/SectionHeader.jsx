import React from 'react';

export default function SectionHeader({
  badge,
  title,
  subtitle,
  centered = false,
  className = ''
}) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}>
      {badge && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20 mb-3">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-brand-text tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base sm:text-lg text-brand-muted max-w-3xl font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
