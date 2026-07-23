'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Github, ExternalLink, Activity, Layers, Server } from 'lucide-react';
import Container from '../ui/Container';
import SectionHeader from '../ui/SectionHeader';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { projectsData } from '@/data/projects';

export default function SelectedWork() {
  const featuredProjects = projectsData.filter((p) => p.featured);

  return (
    <section className="py-20 relative bg-dark-bg">
      <Container>
        <SectionHeader
          badge="Selected Portfolio"
          title="Engineering & Research Case Studies"
          subtitle="Honest, data-driven software projects spanning deep learning medical vision, Python FastAPI microservices, and automated computer vision."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, idx) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="h-full flex flex-col justify-between group">
                <div className="space-y-4">
                  {/* Category & Status Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="cyan">{project.category}</Badge>
                    <span className="text-[11px] font-mono text-brand-subtle">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl font-bold text-brand-text group-hover:text-brand-cyan transition-colors leading-snug">
                    <Link href={`/work/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h3>

                  {/* Tagline */}
                  <p className="text-sm text-brand-muted leading-relaxed line-clamp-3">
                    {project.tagline}
                  </p>

                  {/* Status Banner */}
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-emerald-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="truncate">{project.status}</span>
                  </div>

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-1 gap-2 pt-2">
                    {project.metrics.map((m, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between text-xs font-mono p-2 rounded bg-dark-bg/60 border border-white/5"
                      >
                        <span className="text-brand-subtle">{m.label}</span>
                        <span className="text-brand-text font-semibold text-right max-w-[50%] truncate">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 text-brand-muted border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                  <Button href={`/work/${project.slug}`} variant="ghost" size="sm">
                    <span>Read Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-brand-muted hover:text-brand-cyan transition-colors"
                      title="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Works Callout */}
        <div className="mt-12 text-center">
          <Button href="/work" variant="secondary" size="md">
            <span>View Complete Project Directory (5 Projects)</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
