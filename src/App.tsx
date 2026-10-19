import React, { useState, useMemo } from 'react';
import {
  generateFullDataset,
  SERVICE_LINES,
  VISIT_TYPES,
  PATIENT_PERSONAS,
} from './data/mockFeedbackData';
import {
  PatientFeedbackRecord,
  ServiceLine,
  VisitType,
  PatientPersona,
  SentimentType,
  AIRiskCategory,
} from './types/healthcare';
import {
  calculateExecutiveMetrics,
  calculateSatisfactionByServiceLine,
} from './utils/analytics';
import { Navbar } from './components/Navbar';
import { SectionNav, SectionId } from './components/SectionNav';
import { FilterBar } from './components/FilterBar';
import { ExecutiveOverview } from './components/ExecutiveOverview';
import { SatisfactionInsights } from './components/SatisfactionInsights';
import { NLPAnalysis } from './components/NLPAnalysis';
import { HiddenProblems } from './components/HiddenProblems';
import { EquityAccessibility } from './components/EquityAccessibility';
import { AIRiskMonitoring } from './components/AIRiskMonitoring';
import { AIAgentOpportunities } from './components/AIAgentOpportunities';
import { ExecutiveRecommendations } from './components/ExecutiveRecommendations';
import { PatientFeedbackModal } from './components/PatientFeedbackModal';
import { PresentationMode } from './components/PresentationMode';
import { AIConsultantDrawer } from './components/AIConsultantDrawer';
import { DataUploaderModal } from './components/DataUploaderModal';
import { FileText, ArrowUp } from 'lucide-react';

export default function App() {
  // Master Dataset State (Defaults to full 1,248 generated records)
  const [dataset, setDataset] = useState<PatientFeedbackRecord[]>(() => generateFullDataset());
  const [activeScenario, setActiveScenario] = useState('Full Enterprise (1,248 Records)');

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedServiceLine, setSelectedServiceLine] = useState<ServiceLine | 'ALL'>('ALL');
  const [selectedVisitType, setSelectedVisitType] = useState<VisitType | 'ALL'>('ALL');
  const [selectedPersona, setSelectedPersona] = useState<PatientPersona | 'ALL'>('ALL');
  const [selectedSentiment, setSelectedSentiment] = useState<SentimentType | 'ALL'>('ALL');
  const [selectedRisk, setSelectedRisk] = useState<AIRiskCategory | 'ALL'>('ALL');

  // Navigation & Modals
  const [activeSection, setActiveSection] = useState<SectionId>('overview');
  const [isRawDataOpen, setIsRawDataOpen] = useState(false);
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);
  const [isAIConsultantOpen, setIsAIConsultantOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Scenario Switcher Logic
  const handleSelectScenario = (scenario: string) => {
    setActiveScenario(scenario);
    const full = generateFullDataset();

    if (scenario.includes('Emergency')) {
      // Focus on Emergency and acute care
      const edFocus = full.filter((r) => r.serviceLine === 'Emergency' || r.waitTimeMinutes > 60);
      setDataset(edFocus);
    } else if (scenario.includes('Equity')) {
      // Focus on vulnerable, non-English, and Medicaid personas
      const equityFocus = full.filter(
        (r) =>
          r.patientPersona === 'Non-English Primary Speaker' ||
          r.patientPersona === 'Medicaid / Vulnerable' ||
          (r.equityAccessibilityFlags?.length || 0) > 0
      );
      setDataset(equityFocus);
    } else {
      setDataset(full);
    }

    // Reset filters
    handleResetFilters();
  };

  // Custom Dataset Upload Handler
  const handleDataUploaded = (newRecords: PatientFeedbackRecord[], name: string) => {
    setDataset(newRecords);
    setActiveScenario(`Uploaded: ${name} (${newRecords.length} records)`);
    handleResetFilters();
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedServiceLine('ALL');
    setSelectedVisitType('ALL');
    setSelectedPersona('ALL');
    setSelectedSentiment('ALL');
    setSelectedRisk('ALL');
  };

  const hasActiveFilters = Boolean(
    searchTerm ||
      selectedServiceLine !== 'ALL' ||
      selectedVisitType !== 'ALL' ||
      selectedPersona !== 'ALL' ||
      selectedSentiment !== 'ALL' ||
      selectedRisk !== 'ALL'
  );

  // Filtered Dataset Computation
  const filteredRecords = useMemo(() => {
    return dataset.filter((r) => {
      if (selectedServiceLine !== 'ALL' && r.serviceLine !== selectedServiceLine) return false;
      if (selectedVisitType !== 'ALL' && r.visitType !== selectedVisitType) return false;
      if (selectedPersona !== 'ALL' && r.patientPersona !== selectedPersona) return false;
      if (selectedSentiment !== 'ALL' && r.sentiment !== selectedSentiment) return false;
      if (selectedRisk !== 'ALL' && r.aiRiskCategory !== selectedRisk) return false;

      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchesComment = r.comment.toLowerCase().includes(term);
        const matchesKeyword = r.keywords.some((k) => k.toLowerCase().includes(term));
        const matchesTheme = r.nlpThemes.some((t) => t.toLowerCase().includes(term));
        const matchesId = r.id.toLowerCase().includes(term);
        if (!matchesComment && !matchesKeyword && !matchesTheme && !matchesId) return false;
      }

      return true;
    });
  }, [dataset, selectedServiceLine, selectedVisitType, selectedPersona, selectedSentiment, selectedRisk, searchTerm]);

  // Dynamic Metrics Recalculation
  const metrics = useMemo(() => calculateExecutiveMetrics(filteredRecords), [filteredRecords]);
  const serviceStats = useMemo(() => calculateSatisfactionByServiceLine(filteredRecords), [filteredRecords]);

  // Click-to-filter from charts
  const handleFilterServiceLine = (line: ServiceLine) => {
    setSelectedServiceLine(line);
  };

  const handleFilterPersona = (persona: PatientPersona) => {
    setSelectedPersona(persona);
  };

  const handleSelectKeyword = (kw: string) => {
    setSearchTerm(kw);
  };

  const handleSelectTheme = (theme: string) => {
    setSearchTerm(theme);
  };

  const handleReviewRecord = (id: string) => {
    setDataset((prev) =>
      prev.map((r) => (r.id === id ? { ...r, humanReviewed: true } : r))
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Executive Header */}
      <Navbar
        totalRecords={dataset.length}
        filteredCount={filteredRecords.length}
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenPresentation={() => setIsPresentationOpen(true)}
        onOpenAIConsultant={() => setIsAIConsultantOpen(true)}
        onOpenRawData={() => setIsRawDataOpen(true)}
        activeScenario={activeScenario}
        onSelectScenario={handleSelectScenario}
        onResetFilters={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
        aiRiskCount={metrics.aiRiskCount}
      />

      {/* Sticky Section Navigation */}
      <SectionNav
        activeSection={activeSection}
        onSelectSection={(id) => {
          if (id === 'records') {
            setIsRawDataOpen(true);
          } else {
            setActiveSection(id);
          }
        }}
        aiRiskCount={metrics.aiRiskCount}
      />

      {/* Dynamic Filter Bar */}
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedServiceLine={selectedServiceLine}
        onServiceLineChange={setSelectedServiceLine}
        selectedVisitType={selectedVisitType}
        onVisitTypeChange={setSelectedVisitType}
        selectedPersona={selectedPersona}
        onPersonaChange={setSelectedPersona}
        selectedSentiment={selectedSentiment}
        onSentimentChange={setSelectedSentiment}
        selectedRisk={selectedRisk}
        onRiskChange={setSelectedRisk}
        onReset={handleResetFilters}
        hasFilters={hasActiveFilters}
        totalFiltered={filteredRecords.length}
      />

      {/* Main Executive Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* SECTION 1: Executive Overview */}
        <ExecutiveOverview
          metrics={metrics}
          onExploreSection={(sec) => {
            const elem = document.getElementById(`section-${sec}`);
            if (elem) elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        />

        {/* SECTION 2: Patient Satisfaction Insights */}
        <SatisfactionInsights
          records={filteredRecords}
          overallAvgSat={metrics.avgSatisfaction}
          onFilterServiceLine={handleFilterServiceLine}
          onFilterPersona={handleFilterPersona}
        />

        {/* SECTION 3: NLP Analysis */}
        <NLPAnalysis
          records={filteredRecords}
          onSelectKeyword={handleSelectKeyword}
          onSelectTheme={handleSelectTheme}
        />

        {/* SECTION 4: Hidden Organizational Problems */}
        <HiddenProblems
          records={filteredRecords}
          onDrillDown={(filterType, val) => {
            if (filterType === 'service') setSelectedServiceLine(val as ServiceLine);
          }}
        />

        {/* SECTION 6: Healthcare Equity and Accessibility */}
        <EquityAccessibility
          records={filteredRecords}
          overallAvgSat={metrics.avgSatisfaction}
        />

        {/* SECTION 7: AI Risk Monitoring */}
        <AIRiskMonitoring
          records={filteredRecords}
          onReviewRecord={handleReviewRecord}
        />

        {/* SECTION 8: AI Agent Opportunities */}
        <AIAgentOpportunities />

        {/* SECTION 9: Executive Recommendations */}
        <ExecutiveRecommendations />

        {/* Bottom Raw Feedback Trigger Callout */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Inspect Raw Verbatim Patient Transcripts ({filteredRecords.length} records)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Search individual comments, cross-reference clinical risk flags, and audit nurse communication transcripts.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsRawDataOpen(true)}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-md shadow-cyan-600/20 transition shrink-0"
          >
            Open Comments Explorer
          </button>
        </div>
      </main>

      {/* Modals & Slide Drawers */}
      {isRawDataOpen && (
        <PatientFeedbackModal
          records={filteredRecords}
          onClose={() => setIsRawDataOpen(false)}
          onReviewRecord={handleReviewRecord}
        />
      )}

      {isPresentationOpen && (
        <PresentationMode
          metrics={metrics}
          serviceStats={serviceStats}
          onClose={() => setIsPresentationOpen(false)}
        />
      )}

      {isAIConsultantOpen && (
        <AIConsultantDrawer
          isOpen={isAIConsultantOpen}
          onClose={() => setIsAIConsultantOpen(false)}
          metrics={metrics}
          serviceStats={serviceStats}
        />
      )}

      {isUploadOpen && (
        <DataUploaderModal
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
          onDataUploaded={handleDataUploaded}
        />
      )}

      {/* Executive Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Healthcare Analytics Agent • Metropolitan Health System Clinical Quality Intelligence</span>
          <span className="text-[11px] text-slate-600">
            Compliant with CMS HCAHPS Standards & Responsible Clinical AI Governance Frameworks
          </span>
        </div>
      </footer>
    </div>
  );
}
