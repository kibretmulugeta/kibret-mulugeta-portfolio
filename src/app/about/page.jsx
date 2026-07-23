import React from 'react';
import { Cpu, Database, Brain, Code2, GraduationCap, Award, ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import ContactCTA from '@/components/sections/ContactCTA';
import { profileData } from '@/data/profile';

export const metadata = {
  title: 'About Kibret Mulugeta | AI Engineer & Computer Engineer',
  description: 'Academic background, research evolution, and engineering philosophy of Kibret Mulugeta.',
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-16 bg-tactical-grid min-h-screen">
      <Container className="max-w-5xl mx-auto">
        <SectionHeader
          badge="About & Narrative"
          title="Engineering Foundation & Technical Trajectory"
          subtitle="How computer engineering fundamentals, artificial intelligence research, and backend software engineering converge into intelligent production systems."
        />

        {/* Narrative Progression Timeline */}
        <div className="space-y-8 mb-16">
          <h3 className="text-xl font-bold font-mono text-brand-cyan">
            01. PROFESSIONAL PROGRESSION TRAJECTORY
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {profileData.bio.trajectory.map((item, idx) => (
              <Card key={idx} className="bg-dark-surface/80 border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan font-mono text-xs font-bold shrink-0 mt-0.5">
                    0{idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-text text-base">
                      {item.step}
                    </h4>
                    <p className="text-xs text-brand-muted leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Academic Foundation */}
        <div className="space-y-8 mb-16">
          <h3 className="text-xl font-bold font-mono text-brand-cyan">
            02. ACADEMIC CREDENTIALS & EDUCATION
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {profileData.education.map((edu, idx) => (
              <Card key={idx} className="h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-brand-cyan" />
                    <Badge variant="cyan">{edu.status}</Badge>
                  </div>
                  <h4 className="text-lg font-bold text-brand-text">
                    {edu.degree}
                  </h4>
                  <p className="text-xs font-mono text-brand-cyan">
                    Specialization: {edu.specialization}
                  </p>
                  <p className="text-xs font-mono text-brand-subtle">
                    {edu.institution} • {edu.location}
                  </p>
                  <ul className="space-y-1.5 pt-3 border-t border-white/10">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-brand-muted leading-relaxed flex items-start gap-2">
                        <span className="text-brand-cyan font-bold">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Engineering Philosophy */}
        <div className="space-y-6 mb-16">
          <h3 className="text-xl font-bold font-mono text-brand-cyan">
            03. ENGINEERING & RESEARCH PHILOSOPHY
          </h3>
          <Card className="bg-white/5 space-y-4">
            <p className="text-sm text-brand-muted leading-relaxed">
              "Building intelligent systems requires more than fitting model weights. It requires a foundational understanding of computer architecture, robust data preprocessing pipelines, clean software APIs, and mathematical rigor."
            </p>
            <p className="text-sm text-brand-muted leading-relaxed">
              My goal is to translate cutting-edge deep learning research—particularly in high-stakes fields like medical vision and neuro-inspired optimization—into scalable, reliable software infrastructure.
            </p>
          </Card>
        </div>

        <div className="text-center pt-4">
          <Button href="/resume" variant="primary" size="lg">
            <span>View Interactive Resume & Technical Experience</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Container>

      <div className="mt-20">
        <ContactCTA />
      </div>
    </div>
  );
}
