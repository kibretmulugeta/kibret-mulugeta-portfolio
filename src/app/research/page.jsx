import React from 'react';
import { Brain, Sparkles, FileText, ShieldCheck, Activity, Eye, ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import PipelineVisualizer from '@/components/visuals/PipelineVisualizer';
import ContactCTA from '@/components/sections/ContactCTA';
import { researchData } from '@/data/research';

export const metadata = {
  title: 'AI/ML Research Portal | Kibret Mulugeta',
  description: 'Deep Learning Research, Medical Image Analysis, Brain MRI Segmentation, U-Net, and Neuro-Inspired Optimization.',
};

export default function ResearchPage() {
  const manuscript = researchData.manuscripts[0];

  return (
    <div className="pt-28 pb-16 bg-tactical-grid min-h-screen">
      <Container>
        <SectionHeader
          badge="Dedicated Research Portal"
          title="AI/ML & Medical Computer Vision Research"
          subtitle="Investigating biologically inspired neural plasticity principles, U-Net segmentation fidelity, brain MRI tissue delineation, and trustworthy AI architectures."
        />

        {/* Overview Banner */}
        <Card className="mb-12 border-brand-cyan/30 bg-dark-surface/90">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-brand-text">Research Statement & Direction</h2>
              <p className="text-xs font-mono text-brand-subtle">Bahir Dar University Graduate Research Program</p>
            </div>
          </div>
          <p className="text-sm text-brand-muted leading-relaxed font-sans">
            {researchData.overview}
          </p>
        </Card>

        {/* MSc Thesis Card */}
        <div className="mb-12">
          <h3 className="text-lg font-bold font-mono text-brand-text mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-cyan" />
            <span>GRADUATE THESIS RESEARCH</span>
          </h3>
          <Card className="bg-white/5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <Badge variant="cyan">MSc Thesis</Badge>
              <span className="text-xs font-mono text-brand-subtle">{researchData.thesis.institution}</span>
            </div>
            <h4 className="text-lg font-bold text-brand-text mb-2">
              {researchData.thesis.title}
            </h4>
            <p className="text-xs text-brand-muted leading-relaxed">
              {researchData.thesis.summary}
            </p>
          </Card>
        </div>

        {/* Interactive Architecture Diagram */}
        <div className="mb-16">
          <h3 className="text-lg font-bold font-mono text-brand-text mb-4">
            FEATURED RESEARCH METHODOLOGY DIAGRAM
          </h3>
          <PipelineVisualizer />
        </div>

        {/* Research Manuscripts & Preprints */}
        <div className="mb-16">
          <h3 className="text-lg font-bold font-mono text-brand-text mb-6">
            MANUSCRIPTS & PAPERS IN PREPARATION
          </h3>
          <Card className="border-emerald-500/30">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <Badge variant="cyan">Research Manuscript</Badge>
                <span className="text-xs font-mono text-brand-subtle">{manuscript.venue}</span>
              </div>
              <div className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {manuscript.status}
              </div>
            </div>

            <h4 className="text-xl font-bold text-brand-text mb-2">
              {manuscript.title}
            </h4>
            <p className="text-xs font-mono text-brand-cyan mb-4">
              Authors: {manuscript.authors}
            </p>
            <p className="text-xs text-brand-muted leading-relaxed mb-6">
              {manuscript.abstract}
            </p>

            {/* Pipeline Stage Summary */}
            <div className="space-y-2 pt-4 border-t border-white/10">
              <span className="text-xs font-mono text-brand-subtle uppercase font-bold">
                Data Pipeline Progression:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {manuscript.pipeline.map((step, idx) => (
                  <div key={idx} className="p-2.5 rounded bg-dark-bg/60 border border-white/5 text-xs font-mono">
                    <span className="text-brand-cyan font-bold">Stage {idx + 1}: </span>
                    <span className="text-brand-text">{step.stage}</span>
                    <p className="text-[11px] text-brand-muted font-sans mt-0.5">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Research Pillars */}
        <div className="mb-16">
          <h3 className="text-lg font-bold font-mono text-brand-text mb-6">
            CORE RESEARCH PILLARS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {researchData.researchPillars.map((pillar, i) => (
              <Card key={i}>
                <h4 className="font-bold text-brand-text text-base mb-2 text-brand-cyan">
                  {pillar.title}
                </h4>
                <p className="text-xs text-brand-muted leading-relaxed">
                  {pillar.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

      </Container>

      <ContactCTA />
    </div>
  );
}
