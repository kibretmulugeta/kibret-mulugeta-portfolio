'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Sparkles, Terminal, Database, Brain, Cpu, Code2 } from 'lucide-react';
import Button from '../ui/Button';
import Container from '../ui/Container';
import { profileData } from '@/data/profile';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-tactical-grid">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-brand-indigo/10 rounded-full blur-[100px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono bg-dark-surface border border-white/10 text-brand-muted backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
            <span className="text-brand-text font-semibold">{profileData.name}</span>
            <span className="text-brand-subtle">•</span>
            <span className="text-brand-cyan">{profileData.primaryTitle}</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-brand-text tracking-tight leading-[1.1]"
          >
            Engineering Intelligent Systems from{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-cyan via-sky-300 to-indigo-400">
              Research to Production
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-xl text-brand-muted max-w-3xl mx-auto leading-relaxed font-sans font-normal"
          >
            Combining computer engineering fundamentals, deep learning research in medical image analysis, and modern asynchronous Python software engineering.
          </motion.p>

          {/* Narrative Trajectory Formula Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-panel p-4 rounded-xl max-w-3xl mx-auto border border-white/10 font-mono text-xs sm:text-sm text-brand-muted"
          >
            <div className="text-[11px] text-brand-subtle uppercase tracking-wider mb-2 font-bold">
              Engineering Progression Trajectory
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 text-brand-text font-medium">
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-sky-400 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" /> Comp Engineering
              </span>
              <span className="text-brand-cyan">→</span>
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-indigo-400 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" /> AI & Data Eng
              </span>
              <span className="text-brand-cyan">→</span>
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-purple-400 flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5" /> Deep Learning
              </span>
              <span className="text-brand-cyan">→</span>
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-emerald-400 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" /> Production Systems
              </span>
            </div>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <Button href="/work" variant="primary" size="lg">
              <span>Explore Selected Work</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <Button href="/research" variant="secondary" size="lg">
              <Brain className="w-4 h-4 text-brand-cyan" />
              <span>Read AI Research</span>
            </Button>

            <Button href={profileData.resumePdf} variant="outline" size="lg" target="_blank">
              <FileText className="w-4 h-4" />
              <span>Download CV</span>
            </Button>
          </motion.div>

          {/* Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t border-white/10 max-w-3xl mx-auto text-left"
          >
            <div className="p-3 rounded-lg bg-white/5 border border-white/5">
              <div className="text-xs font-mono text-brand-subtle">Degree</div>
              <div className="text-sm font-mono font-bold text-brand-text mt-0.5">MSc Comp Eng</div>
              <div className="text-[11px] text-brand-muted font-sans">Bahir Dar Univ.</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/5">
              <div className="text-xs font-mono text-brand-subtle">Primary Focus</div>
              <div className="text-sm font-mono font-bold text-brand-cyan mt-0.5">Brain MRI / U-Net</div>
              <div className="text-[11px] text-brand-muted font-sans">Medical AI Vision</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/5">
              <div className="text-xs font-mono text-brand-subtle">Software Stack</div>
              <div className="text-sm font-mono font-bold text-brand-text mt-0.5">Python & FastAPI</div>
              <div className="text-[11px] text-brand-muted font-sans">REST Microservices</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/5">
              <div className="text-xs font-mono text-brand-subtle">Manuscript Status</div>
              <div className="text-sm font-mono font-bold text-emerald-400 mt-0.5">In Prep</div>
              <div className="text-[11px] text-brand-muted font-sans">Scientific Reports</div>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
