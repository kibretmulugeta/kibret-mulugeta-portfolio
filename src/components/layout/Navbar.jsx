'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal, ArrowUpRight, Lock } from 'lucide-react';
import Container from '../ui/Container';
import Button from '../ui/Button';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'Research', href: '/research' },
  { label: 'About', href: '/about' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark-bg/85 backdrop-blur-md border-b border-white/10 shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 group font-mono text-sm font-semibold tracking-wider text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 rounded-md px-2 py-1"
          >
            <div className="w-8 h-8 rounded-lg bg-dark-surface border border-white/10 flex items-center justify-center text-brand-cyan group-hover:border-brand-cyan/40 transition-colors">
              <Terminal className="w-4 h-4" />
            </div>
            <span className="group-hover:text-brand-cyan transition-colors">
              KIBRET<span className="text-brand-cyan">.AI</span>
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-dark-surface/60 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-1.5 text-xs font-mono tracking-wide rounded-full transition-colors ${
                    isActive ? 'text-brand-text font-semibold' : 'text-brand-muted hover:text-brand-text'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-brand-cyan/15 rounded-full border border-brand-cyan/30"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/admin/login"
              className="p-2 rounded-lg bg-dark-surface border border-white/10 text-brand-subtle hover:text-brand-cyan hover:border-brand-cyan/40 transition-colors"
              title="Owner Admin Login"
            >
              <Lock className="w-4 h-4" />
            </Link>
            <Button href="/contact" variant="outline" size="sm">
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-lg bg-dark-surface border border-white/10 text-brand-muted hover:text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-cyan/50"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-surface/95 border-b border-white/10 backdrop-blur-xl"
          >
            <Container className="py-6 flex flex-col gap-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-mono transition-colors ${
                      isActive ? 'bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30' : 'text-brand-muted hover:text-brand-text hover:bg-white/5'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <div className="w-2 h-2 rounded-full bg-brand-cyan" />}
                  </Link>
                );
              })}
              <div className="pt-3 border-t border-white/10 mt-2">
                <Button href="/contact" variant="primary" size="md" className="w-full">
                  <span>Get in Touch</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
