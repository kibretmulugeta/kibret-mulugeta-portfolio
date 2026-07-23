import React from 'react';
import { Download, GraduationCap, Briefcase, Code, Brain, CheckCircle2, FileText, ExternalLink } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import ContactCTA from '@/components/sections/ContactCTA';
import { profileData } from '@/data/profile';
import { skillsData } from '@/data/skills';
import { projectsData } from '@/data/projects';

export const metadata = {
  title: 'Resume & Curriculum Vitae | Kibret Mulugeta',
  description: 'Interactive resume of Kibret Mulugeta - MSc Computer Engineering, AI/ML Researcher, and Python Software Engineer.',
};

export default function ResumePage() {
  return (
    <div className="pt-28 pb-16 bg-tactical-grid min-h-screen">
      <Container className="max-w-4xl mx-auto">
        
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 pb-8 border-b border-white/10">
          <div>
            <span className="text-xs font-mono text-brand-cyan uppercase tracking-wider">
              Curriculum Vitae
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-text mt-1">
              {profileData.name}
            </h1>
            <p className="text-sm font-mono text-brand-muted mt-1">
              {profileData.primaryTitle}
            </p>
          </div>

          <Button href={profileData.resumePdf} variant="primary" size="md" target="_blank">
            <Download className="w-4 h-4" />
            <span>Download Official PDF CV</span>
          </Button>
        </div>

        {/* Executive Summary */}
        <Card className="mb-12 bg-dark-surface/90 border-brand-cyan/20">
          <h2 className="text-xs font-mono font-bold text-brand-cyan uppercase tracking-wider mb-2">
            Professional Summary
          </h2>
          <p className="text-sm text-brand-muted leading-relaxed font-sans">
            {profileData.bio.summary}
          </p>
        </Card>

        {/* Education Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-xl font-bold font-mono text-brand-text flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-brand-cyan" />
            <span>EDUCATION</span>
          </h2>
          <div className="space-y-6">
            {profileData.education.map((edu, i) => (
              <Card key={i} className="bg-dark-surface">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold text-brand-text">{edu.degree}</h3>
                  <Badge variant="cyan">{edu.status}</Badge>
                </div>
                <p className="text-xs font-mono text-brand-cyan mb-1">
                  Specialization: {edu.specialization}
                </p>
                <p className="text-xs font-mono text-brand-subtle mb-3">
                  {edu.institution} • {edu.location}
                </p>
                <ul className="space-y-1 text-xs text-brand-muted">
                  {edu.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-brand-cyan font-bold">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        {/* Research & Project Portfolio Experience */}
        <section className="space-y-6 mb-12">
          <h2 className="text-xl font-bold font-mono text-brand-text flex items-center gap-2">
            <Brain className="w-5 h-5 text-brand-cyan" />
            <span>RESEARCH & ENGINEERING PROJECTS</span>
          </h2>
          <div className="space-y-6">
            {projectsData.map((project) => (
              <Card key={project.slug}>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-base font-bold text-brand-text">{project.title}</h3>
                  <Badge variant="cyan">{project.category}</Badge>
                </div>
                <p className="text-xs font-mono text-emerald-400 mb-2">
                  Status: {project.status}
                </p>
                <p className="text-xs text-brand-muted leading-relaxed mb-3">
                  {project.tagline}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 text-brand-muted border border-white/5">
                      {tech}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Skills Summary Grid */}
        <section className="space-y-6 mb-12">
          <h2 className="text-xl font-bold font-mono text-brand-text flex items-center gap-2">
            <Code className="w-5 h-5 text-brand-cyan" />
            <span>CATEGORIZED TECHNICAL SKILLS</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillsData.map((cat) => (
              <Card key={cat.category}>
                <h3 className="font-bold text-brand-text text-sm mb-3 text-brand-cyan">
                  {cat.category}
                </h3>
                <div className="space-y-2">
                  {cat.skills.map((s) => (
                    <div key={s.name} className="flex items-center justify-between text-xs font-mono p-2 rounded bg-dark-bg/60 border border-white/5">
                      <span className="text-brand-muted">{s.name}</span>
                      <span className="text-brand-text font-semibold">{s.level}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

      </Container>

      <ContactCTA />
    </div>
  );
}
