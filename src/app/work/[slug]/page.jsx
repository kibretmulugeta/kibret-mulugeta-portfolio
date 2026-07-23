import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Github, ExternalLink, Cpu, CheckCircle2, Layers, ShieldCheck, AlertCircle } from 'lucide-react';
import Container from '@/components/ui/Container';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ContactCTA from '@/components/sections/ContactCTA';
import PipelineVisualizer from '@/components/visuals/PipelineVisualizer';
import JwtAuthVisualizer from '@/components/visuals/JwtAuthVisualizer';
import { projectsData } from '@/data/projects';

export function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export default function CaseStudyPage({ params }) {
  const project = projectsData.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const { caseStudy } = project;

  return (
    <div className="pt-28 pb-16 bg-tactical-grid min-h-screen">
      <Container className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs font-mono text-brand-muted hover:text-brand-cyan transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio Directory</span>
        </Link>

        {/* Header Metadata */}
        <div className="space-y-4 mb-10">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="cyan">{project.category}</Badge>
            <span className="text-xs font-mono text-brand-subtle font-semibold">
              {project.domain}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-text tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-lg text-brand-muted font-sans leading-relaxed">
            {project.tagline}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-dark-surface border border-white/10 text-xs font-mono">
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold">{project.status}</span>
            </div>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-brand-cyan hover:underline"
              >
                <Github className="w-4 h-4" />
                <span>View Source Repository</span>
              </a>
            )}
          </div>
        </div>

        {/* Key Technical Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {project.metrics.map((m, i) => (
            <div key={i} className="p-4 rounded-xl glass-panel text-left space-y-1">
              <div className="text-xs font-mono text-brand-subtle">{m.label}</div>
              <div className="text-sm font-mono font-bold text-brand-text">{m.value}</div>
            </div>
          ))}
        </div>

        {/* Technical Report Body */}
        <div className="space-y-12 text-brand-text">
          
          {/* Executive Summary */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-mono text-brand-cyan flex items-center gap-2">
              <span>01. EXECUTIVE SUMMARY</span>
            </h2>
            <Card className="bg-dark-surface/90">
              <p className="text-sm leading-relaxed text-brand-muted">
                {caseStudy.executiveSummary}
              </p>
            </Card>
          </section>

          {/* Problem & Objectives */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold font-mono text-brand-cyan flex items-center gap-2">
              <span>02. PROBLEM CONTEXT & OBJECTIVES</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <h3 className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Problem Context
                </h3>
                <p className="text-xs text-brand-muted leading-relaxed">
                  {project.problem}
                </p>
              </Card>
              <Card>
                <h3 className="font-mono text-xs font-bold text-brand-cyan uppercase tracking-wider mb-2">
                  Engineering Approach
                </h3>
                <p className="text-xs text-brand-muted leading-relaxed">
                  {project.approach}
                </p>
              </Card>
            </div>
            {caseStudy.objectives && (
              <Card className="bg-white/5">
                <h3 className="font-mono text-xs font-bold text-brand-text uppercase tracking-wider mb-3">
                  Core Technical Objectives
                </h3>
                <ul className="space-y-2">
                  {caseStudy.objectives.map((obj, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-brand-muted">
                      <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </section>

          {/* Optional Visualizer for Primary Research Project */}
          {project.slug === 'neuro-inspired-optimization-medical-segmentation' && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold font-mono text-brand-cyan">
                03. SYSTEM ARCHITECTURE VISUALIZATION
              </h2>
              <PipelineVisualizer />
            </section>
          )}

          {/* Optional Visualizer for Full-Stack Task Management JWT Authentication */}
          {project.slug === 'fullstack-task-workflow-management-platform' && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold font-mono text-brand-cyan">
                03. JWT SECURITY & API AUTHENTICATION CODE ARCHITECTURE
              </h2>
              <JwtAuthVisualizer />
            </section>
          )}

          {/* System Architecture */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-mono text-brand-cyan flex items-center gap-2">
              <span>04. SYSTEM ARCHITECTURE & DATA FLOW</span>
            </h2>
            <Card>
              <ul className="space-y-3 font-mono text-xs">
                {caseStudy.architecture.map((layer, i) => (
                  <li key={i} className="p-3 rounded-lg bg-dark-bg/80 border border-white/5 flex items-start gap-3">
                    <span className="text-brand-cyan font-bold">[{i + 1}]</span>
                    <span className="text-brand-text">{layer}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </section>

          {/* Preprocessing & Engineering Tradeoffs */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold font-mono text-brand-cyan flex items-center gap-2">
              <span>05. PREPROCESSING & TRADE-OFF ANALYSIS</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudy.preprocessing && caseStudy.preprocessing.length > 0 && (
                <Card>
                  <h3 className="font-mono text-xs font-bold text-brand-text uppercase tracking-wider mb-3">
                    Data Preprocessing Steps
                  </h3>
                  <ul className="space-y-2 text-xs text-brand-muted font-mono">
                    {caseStudy.preprocessing.map((step, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
              <Card>
                <h3 className="font-mono text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  Engineering Trade-Offs
                </h3>
                <p className="text-xs text-brand-muted leading-relaxed">
                  {caseStudy.tradeoffs}
                </p>
              </Card>
            </div>
          </section>

          {/* Qualitative Results & Honest Limitations */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-mono text-brand-cyan">
              06. RESULTS & SCIENTIFIC LIMITATIONS
            </h2>
            <Card className="border-emerald-500/30">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>QUALITATIVE EVALUATION & STATUS</span>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                {caseStudy.resultsAndLimitations}
              </p>
            </Card>
          </section>

          {/* Tech Stack Chips */}
          <section className="pt-6 border-t border-white/10">
            <h3 className="text-xs font-mono text-brand-subtle uppercase tracking-wider mb-3">
              Technologies & Libraries Utilized
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white/5 text-brand-cyan border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

        </div>
      </Container>

      <div className="mt-20">
        <ContactCTA />
      </div>
    </div>
  );
}
