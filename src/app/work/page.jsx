'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Github, ExternalLink, Filter } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import ContactCTA from '@/components/sections/ContactCTA';
import { projectsData } from '@/data/projects';

const categories = ["All", "Medical AI / Deep Learning", "Computer Vision & Medical Imaging", "Backend & Systems Engineering", "Applied Intelligent Systems", "Applied Computer Vision"];

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = selectedCategory === "All"
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <div className="pt-28 pb-16 bg-tactical-grid min-h-screen">
      <Container>
        <SectionHeader
          badge="Complete Portfolio Directory"
          title="Engineering Projects & Case Studies"
          subtitle="Explore detailed engineering reports across medical deep learning, Python microservices, database systems, and computer vision pipelines."
        />

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 mb-10 p-2 rounded-xl bg-dark-surface border border-white/10 max-w-4xl">
          <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-brand-subtle border-r border-white/10 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Domain:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                selectedCategory === cat
                  ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40 font-semibold'
                  : 'text-brand-muted hover:text-brand-text hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <Card className="h-full flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="cyan">{project.category}</Badge>
                    <span className="text-[11px] font-mono text-brand-subtle">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-brand-text group-hover:text-brand-cyan transition-colors leading-snug">
                    <Link href={`/work/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h3>

                  <p className="text-sm text-brand-muted leading-relaxed line-clamp-3">
                    {project.tagline}
                  </p>

                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-emerald-400">
                    {project.status}
                  </div>

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

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                  <Button href={`/work/${project.slug}`} variant="ghost" size="sm">
                    <span>Deep-Dive Report</span>
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
      </Container>

      <div className="mt-20">
        <ContactCTA />
      </div>
    </div>
  );
}
