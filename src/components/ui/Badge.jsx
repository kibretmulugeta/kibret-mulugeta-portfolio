import React from 'react';

export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: "bg-white/5 text-brand-muted border-white/10",
    cyan: "bg-brand-cyan/10 text-brand-cyan border-brand-cyan/30",
    indigo: "bg-brand-indigo/10 text-indigo-400 border-brand-indigo/30",
    emerald: "bg-brand-emerald/10 text-emerald-400 border-brand-emerald/30",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono border tracking-tight ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
}
