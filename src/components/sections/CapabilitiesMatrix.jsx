'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Server, Database, Cpu, CheckCircle2 } from 'lucide-react';
import Container from '../ui/Container';
import SectionHeader from '../ui/SectionHeader';
import Card from '../ui/Card';
import { skillsData } from '@/data/skills';

const categoryIcons = {
  "Artificial Intelligence & Machine Learning": Brain,
  "Python & Backend Engineering": Server,
  "Data Engineering & Databases": Database,
  "Core Computer Engineering & Software Design": Cpu,
};

export default function CapabilitiesMatrix() {
  return (
    <section className="py-20 relative bg-dark-bg border-t border-white/10">
      <Container>
        <SectionHeader
          badge="Capabilities Matrix"
          title="Engineering & Research Proficiency"
          subtitle="Grouped capabilities spanning computer engineering fundamentals, deep learning, Python microservices, and medical imaging pipelines."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillsData.map((category, idx) => {
            const Icon = categoryIcons[category.category] || Brain;

            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="h-full flex flex-col justify-between">
                  <div>
                    {/* Category Title */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-brand-text">
                          {category.category}
                        </h3>
                        <p className="text-xs text-brand-muted">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    {/* Skill Items List */}
                    <div className="space-y-2 mt-6">
                      {category.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-dark-bg/80 border border-white/5 text-xs font-mono"
                        >
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan" />
                            <span className="text-brand-text font-medium">{skill.name}</span>
                          </div>
                          <span className="text-brand-subtle text-[11px] px-2 py-0.5 rounded bg-white/5 border border-white/5">
                            {skill.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
