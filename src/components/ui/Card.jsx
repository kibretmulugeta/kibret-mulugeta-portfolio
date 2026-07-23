import React from 'react';

export default function Card({ children, className = '', hover = true, ...props }) {
  return (
    <div
      className={`glass-panel rounded-xl p-6 transition-all duration-300 ${
        hover ? 'hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-cyan/5' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
