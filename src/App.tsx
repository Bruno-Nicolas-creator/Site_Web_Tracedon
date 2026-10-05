/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ImpactSection } from './components/ImpactSection';
import { UrgencyAlert } from './components/UrgencyAlert';
import { RoiCalculator } from './components/RoiCalculator';
import { ThreeStepsWorkflow } from './components/ThreeStepsWorkflow';
import { BenchmarkTable } from './components/BenchmarkTable';
import { RoleViews } from './components/RoleViews';
import { FaqSection } from './components/FaqSection';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { DemoModal } from './components/DemoModal';
import { AuditDossierModal } from './components/AuditDossierModal';
import { LegalModal, type PageLegale } from './components/LegalModal';

export default function App() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [pageLegale, setPageLegale] = useState<PageLegale | null>(null);
  const [prefilledDemoNotes, setPrefilledDemoNotes] = useState<string | undefined>(undefined);

  const handleOpenDemo = (notes?: string) => {
    setPrefilledDemoNotes(notes);
    setDemoModalOpen(true);
  };

  const handleScrollToSimulator = () => {
    const el = document.getElementById('simulateur-fiscal');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-700 selection:text-white">
      {/* Top Bar matching contract */}
      <Navbar
        onOpenDemo={() => handleOpenDemo()}
        onScrollToSimulator={handleScrollToSimulator}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenDemo={() => handleOpenDemo()}
          onScrollToSimulator={handleScrollToSimulator}
          onOpenAuditModal={() => setAuditModalOpen(true)}
        />

        {/* Impact écologique mesuré par l'application */}
        <ImpactSection />

        {/* Le problème : lois Garot & AGEC */}
        <UrgencyAlert />

        {/* Interactive Fiscal & ROI Simulator */}
        <RoiCalculator onOpenDemo={handleOpenDemo} />

        {/* The 3-Step Automated Workflow */}
        <ThreeStepsWorkflow
          onOpenAuditModal={() => setAuditModalOpen(true)}
          onOpenDemo={() => handleOpenDemo()}
        />

        {/* Financial & Operational Benchmark */}
        <BenchmarkTable />

        {/* Tailored Portals: Enterprise, Association, Coordinator */}
        <RoleViews onOpenDemo={() => handleOpenDemo()} />

        {/* Regulatory & Functional FAQ */}
        <FaqSection />

        {/* High-Impact Closing CTA */}
        <CtaBanner
          onOpenDemo={() => handleOpenDemo()}
          onScrollToSimulator={handleScrollToSimulator}
        />
      </main>

      {/* Clean Corporate Footer */}
      <Footer
        onOpenDemo={() => handleOpenDemo()}
        onOpenAuditModal={() => setAuditModalOpen(true)}
        onOpenLegal={setPageLegale}
      />

      {/* Modals */}
      <DemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        prefilledNotes={prefilledDemoNotes}
        onOpenLegal={setPageLegale}
      />

      <LegalModal page={pageLegale} onClose={() => setPageLegale(null)} />

      <AuditDossierModal
        isOpen={auditModalOpen}
        onClose={() => setAuditModalOpen(false)}
      />
    </div>
  );
}
