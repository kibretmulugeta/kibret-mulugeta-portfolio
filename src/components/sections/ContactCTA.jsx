'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, ArrowUpRight, MessageSquare } from 'lucide-react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { profileData } from '@/data/profile';

export default function ContactCTA() {
  return (
    <section className="py-20 relative bg-dark-bg border-t border-white/10 overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-cyan/10 rounded-full blur-[100px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="glass-panel rounded-2xl p-8 sm:p-12 text-center border-brand-cyan/30 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Open for Opportunities & Research Collaboration</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-brand-text tracking-tight">
            Interested in Building Intelligent Systems Together?
          </h2>

          <p className="text-base text-brand-muted max-w-2xl mx-auto leading-relaxed">
            Whether you are hiring for AI/ML engineering roles, seeking software engineering expertise, or exploring research collaboration in medical computer vision—let's connect.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button href={`mailto:${profileData.email}`} variant="primary" size="lg">
              <Mail className="w-4 h-4" />
              <span>{profileData.email}</span>
            </Button>

            <Button href={profileData.github} variant="outline" size="lg" target="_blank">
              <Github className="w-4 h-4" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>

            <Button href={profileData.linkedin} variant="outline" size="lg" target="_blank">
              <Linkedin className="w-4 h-4 text-sky-400" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
