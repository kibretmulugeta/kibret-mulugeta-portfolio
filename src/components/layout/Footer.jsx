import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, ArrowUpRight, Terminal, ShieldCheck } from 'lucide-react';
import Container from '../ui/Container';
import { profileData } from '@/data/profile';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-bg border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Identity */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 font-mono text-base font-semibold text-brand-text">
              <div className="w-7 h-7 rounded-md bg-dark-surface border border-white/10 flex items-center justify-center text-brand-cyan">
                <Terminal className="w-3.5 h-3.5" />
              </div>
              <span>KIBRET MULUGETA</span>
            </Link>
            <p className="text-sm text-brand-muted max-w-md leading-relaxed">
              AI Engineer & Computer Engineer specializing in medical image segmentation, U-Net architectures, neuro-inspired optimization, and asynchronous backend microservices.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for AI/ML Engineering & Software Roles</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-mono text-xs font-semibold text-brand-text uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-brand-muted">
              <li>
                <Link href="/" className="hover:text-brand-cyan transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-brand-cyan transition-colors">Selected Work</Link>
              </li>
              <li>
                <Link href="/research" className="hover:text-brand-cyan transition-colors">Research Portal</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-cyan transition-colors">About & Trajectory</Link>
              </li>
              <li>
                <Link href="/resume" className="hover:text-brand-cyan transition-colors">Interactive Resume</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-cyan transition-colors">Contact Portal</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Direct Connect */}
          <div>
            <h4 className="font-mono text-xs font-semibold text-brand-text uppercase tracking-wider mb-4">
              Connect & Verify
            </h4>
            <div className="space-y-3">
              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-brand-muted hover:text-brand-cyan transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
                <ArrowUpRight className="w-3 h-3 ml-auto opacity-60" />
              </a>
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-brand-muted hover:text-brand-cyan transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn Profile</span>
                <ArrowUpRight className="w-3 h-3 ml-auto opacity-60" />
              </a>
              <a
                href={`mailto:${profileData.email}`}
                className="flex items-center gap-2 text-xs font-mono text-brand-muted hover:text-brand-cyan transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{profileData.email}</span>
                <ArrowUpRight className="w-3 h-3 ml-auto opacity-60" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-brand-subtle">
          <p>© {currentYear} Kibret Mulugeta. All rights reserved.</p>
          <div className="flex items-center gap-2 text-brand-subtle">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-cyan" />
            <span>Honest Research & Pure JavaScript Architecture</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
