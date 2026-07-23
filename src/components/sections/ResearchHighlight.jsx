'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, FileText, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';
import Container from '../ui/Container';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import PipelineVisualizer from '../visuals/PipelineVisualizer';
import { researchData } from '@/data/research';

export default function ResearchHighlight() {
  const manuscript = researchData.manuscripts[0];

  return (
    <section className="py-20 relative bg-dark-bg border-t border-white/10">
      <Container>
        <SectionHeader
          badge="AI/ML Research Portal"
          title="Deep Learning & Medical Image Segmentation"
          subtitle="Investigating biologically inspired reward mechanisms to enhance boundary fidelity in U-Net architectures for brain MRI analysis."
        />

        {/* Primary Manuscript Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-brand-cyan/30 relative overflow-hidden mb-12">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <Badge variant="cyan">Primary Research Manuscript</Badge>
                <span className="text-xs font-mono text-brand-subtle">{manuscript.year}</span>
              </div>
              <div className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{manuscript.status}</span>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-brand-text mb-3 leading-snug">
              {manuscript.title}
            </h3>

            <p className="text-sm font-mono text-brand-cyan mb-4">
              Authors: {manuscript.authors}
            </p>

            <p className="text-sm text-brand-muted leading-relaxed mb-6">
              {manuscript.abstract}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
              {manuscript.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded text-xs font-mono bg-white/5 text-brand-muted border border-white/5">
                  #{tag}
                </span>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Interactive Architecture Flow Diagram */}
        <PipelineVisualizer />

        {/* Thesis Summary Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-brand-text text-base">MSc Thesis Focus</h4>
                <p className="text-xs font-mono text-brand-subtle">Bahir Dar University</p>
              </div>
            </div>
            <p className="text-xs text-brand-muted leading-relaxed">
              {researchData.thesis.summary}
            </p>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-brand-indigo/10 border border-brand-indigo/30 flex items-center justify-center text-indigo-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-brand-text text-base">Research Integrity Statement</h4>
                <p className="text-xs font-mono text-brand-subtle">No Fabricated Metrics</p>
              </div>
            </div>
            <p className="text-xs text-brand-muted leading-relaxed">
              All medical vision evaluations strictly adhere to quantitative scientific rigor using standard Dice Similarity Coefficient (DSC) and IoU benchmarks without unsupported empirical claims.
            </p>
          </Card>
        </div>

        {/* Read Dedicated Portal Action */}
        <div className="mt-12 text-center">
          <Button href="/research" variant="primary" size="md">
            <span>Explore Dedicated Research Portal</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
