'use client';

import React, { useState } from 'react';
import { Mail, Github, Linkedin, Send, CheckCircle2, Copy, ArrowUpRight, MessageSquare } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { profileData } from '@/data/profile';

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      // Trigger native mailto link with form values for genuine functional email sending
      const mailtoUrl = `mailto:${profileData.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      window.location.href = mailtoUrl;
      setFormSubmitted(true);
    }
  };

  return (
    <div className="pt-28 pb-16 bg-tactical-grid min-h-screen">
      <Container className="max-w-5xl mx-auto">
        <SectionHeader
          badge="Direct Contact Portal"
          title="Initiate Collaboration or Discussion"
          subtitle="Reach out directly for AI engineering opportunities, deep learning research, Python backend engineering, or technical consultation."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Direct Channels Column */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-dark-surface/90 border-brand-cyan/30">
              <h3 className="font-mono text-xs font-bold text-brand-cyan uppercase tracking-wider mb-4">
                Primary Direct Channel
              </h3>
              
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-mono text-brand-subtle">Email Address</span>
                  <div className="flex items-center justify-between mt-1 p-3 rounded-lg bg-dark-bg border border-white/10">
                    <span className="text-xs font-mono text-brand-text truncate mr-2">
                      {profileData.email}
                    </span>
                    <button
                      onClick={handleCopyEmail}
                      className="p-1.5 rounded hover:bg-white/10 text-brand-cyan transition-colors"
                      title="Copy Email"
                    >
                      {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  {copied && (
                    <span className="text-[11px] font-mono text-emerald-400 mt-1 inline-block">
                      Email address copied to clipboard!
                    </span>
                  )}
                </div>

                <Button href={`mailto:${profileData.email}`} variant="primary" size="md" className="w-full">
                  <Mail className="w-4 h-4" />
                  <span>Launch Mail Client</span>
                </Button>
              </div>
            </Card>

            <Card>
              <h3 className="font-mono text-xs font-bold text-brand-text uppercase tracking-wider mb-4">
                Social & Professional Verification
              </h3>
              <div className="space-y-3">
                <a
                  href={profileData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-dark-bg border border-white/5 hover:border-brand-cyan/40 transition-colors text-xs font-mono text-brand-muted hover:text-brand-text"
                >
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-brand-cyan" />
                    <span>GitHub Profile</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-dark-bg border border-white/5 hover:border-brand-cyan/40 transition-colors text-xs font-mono text-brand-muted hover:text-brand-text"
                >
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-sky-400" />
                    <span>LinkedIn Network</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </Card>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-2">
            <Card className="bg-dark-surface/80 border-white/10">
              <h3 className="font-mono text-xs font-bold text-brand-text uppercase tracking-wider mb-6 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-brand-cyan" />
                <span>Send Direct Inquiry</span>
              </h3>

              {formSubmitted ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="font-bold text-brand-text text-base">Inquiry Prepared & Opened</h4>
                  <p className="text-xs text-brand-muted max-w-md mx-auto">
                    Your default mail client has been opened with your pre-filled inquiry. If it didn't open automatically, send directly to <strong className="text-brand-cyan">{profileData.email}</strong>.
                  </p>
                  <Button onClick={() => setFormSubmitted(false)} variant="secondary" size="sm">
                    <span>Send Another Message</span>
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-brand-muted mb-1.5">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Dr. Sarah Jenkins"
                        className="w-full px-3 py-2.5 rounded-lg bg-dark-bg border border-white/10 text-brand-text focus:outline-none focus:border-brand-cyan"
                      />
                    </div>
                    <div>
                      <label className="block text-brand-muted mb-1.5">Your Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. sarah@institution.org"
                        className="w-full px-3 py-2.5 rounded-lg bg-dark-bg border border-white/10 text-brand-text focus:outline-none focus:border-brand-cyan"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-brand-muted mb-1.5">Subject / Topic</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. AI Engineering Role / Research Collaboration"
                      className="w-full px-3 py-2.5 rounded-lg bg-dark-bg border border-white/10 text-brand-text focus:outline-none focus:border-brand-cyan"
                    />
                  </div>

                  <div>
                    <label className="block text-brand-muted mb-1.5">Message / Context *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe the opportunity, project context, or research topic..."
                      className="w-full px-3 py-2.5 rounded-lg bg-dark-bg border border-white/10 text-brand-text focus:outline-none focus:border-brand-cyan"
                    />
                  </div>

                  <Button type="submit" variant="primary" size="md" className="w-full">
                    <Send className="w-4 h-4" />
                    <span>Send Message via Mail Wrapper</span>
                  </Button>
                </form>
              )}
            </Card>
          </div>

        </div>
      </Container>
    </div>
  );
}
