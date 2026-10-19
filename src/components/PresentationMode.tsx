import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Activity,
  Layers,
  Sparkles,
  Target,
  ShieldAlert,
  Cpu,
  Clock,
  Star,
  Scale,
} from 'lucide-react';
import { ExecutiveMetrics, ServiceLineStat } from '../types/healthcare';

interface PresentationModeProps {
  metrics: ExecutiveMetrics;
  serviceStats: ServiceLineStat[];
  onClose: () => void;
}

export const PresentationMode: React.FC<PresentationModeProps> = ({
  metrics,
  serviceStats,
  onClose,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Executive Healthcare Analytics Briefing',
      subtitle: 'Q3 Enterprise Quality, Patient Sentiment & AI Governance Review',
      section: 'Title Overview',
      content: (
        <div className="space-y-6 max-w-3xl mx-auto text-center py-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-cyan-600 to-emerald-400 flex items-center justify-center shadow-xl shadow-cyan-500/20">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Hospital Leadership Executive Briefing
            </h1>
            <p className="text-base text-slate-300 mt-2">
              Autonomous Patient Feedback Intelligence, Operational Friction Discovery & Strategic AI Roadmap
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left pt-6">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-xs text-slate-400 uppercase tracking-wider">Comments Analyzed</span>
              <div className="text-2xl font-extrabold text-white mt-1">{metrics.totalComments.toLocaleString()}</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-xs text-slate-400 uppercase tracking-wider">Avg Satisfaction</span>
              <div className="text-2xl font-extrabold text-amber-400 mt-1">{metrics.avgSatisfaction}★</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-xs text-slate-400 uppercase tracking-wider">Follow-Up Loop</span>
              <div className="text-2xl font-extrabold text-emerald-400 mt-1">{metrics.followUpComplianceRate}%</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <span className="text-xs text-slate-400 uppercase tracking-wider">AI Risk Flags</span>
              <div className="text-2xl font-extrabold text-rose-400 mt-1">{metrics.aiRiskCount}</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Section 1: Enterprise Performance Overview',
      subtitle: 'Core HCAHPS experience ratings and follow-up compliance',
      section: 'Section 1: Executive Overview',
      content: (
        <div className="space-y-6 max-w-4xl mx-auto py-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Patient Satisfaction</span>
              <div className="text-3xl font-extrabold text-white mt-1">{metrics.avgSatisfaction} / 5.0</div>
              <p className="text-xs text-slate-400 mt-2">
                HCAHPS benchmark is 4.20. Current drag stems from Emergency and Orthopedics.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Communication Rating</span>
              <div className="text-3xl font-extrabold text-cyan-400 mt-1">{metrics.avgCommunication} / 5.0</div>
              <p className="text-xs text-slate-400 mt-2">
                Strong bedside nurse ratings offset by rushed physician consultations and shift changes.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Care Transitions</span>
              <div className="text-3xl font-extrabold text-emerald-400 mt-1">{metrics.followUpComplianceRate}%</div>
              <p className="text-xs text-slate-400 mt-2">
                30-day follow-up compliance rate; 25.2% of patients face unclosed clinical loops post-discharge.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-2">
            <h4 className="font-bold text-white text-sm">Key C-Suite Takeaway</h4>
            <p className="leading-relaxed">
              Patient satisfaction is distinctly bimodal. High clinical competency in Oncology (4.3★) and Cardiology (4.1★) is overshadowed by operational friction in Emergency (3.2★) and outpatient scheduling backlogs.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Section 2: Satisfaction Across Service Lines & Personas',
      subtitle: 'Identifying high performers vs department drag',
      section: 'Section 2: Satisfaction Insights',
      content: (
        <div className="space-y-4 max-w-4xl mx-auto py-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {serviceStats.slice(0, 6).map((sl) => (
              <div key={sl.serviceLine} className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
                  <span className="font-bold text-white">{sl.serviceLine}</span>
                  <span className={sl.complaintRate >= 25 ? 'text-rose-400 font-bold' : 'text-slate-400'}>
                    {sl.complaintRate}% Neg
                  </span>
                </div>
                <div className="text-xl font-extrabold text-white">{sl.avgSatisfaction}★</div>
                <div className="text-[11px] text-slate-400 mt-1">Avg Wait: {sl.avgWaitTime} mins</div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
            <strong className="text-amber-400">Demographic Disparity Finding: </strong>
            Non-English speaking patients experience an average satisfaction score of <strong>2.92★</strong> (a 1.2-point negative gap vs hospital average), driven primarily by delayed interpreter cart connectivity and English-only discharge paperwork.
          </div>
        </div>
      ),
    },
    {
      title: 'Section 4: Hidden Organizational Problems',
      subtitle: 'Systemic bottlenecks in Emergency, Scheduling, and EHR Technology',
      section: 'Section 4: Organizational Friction',
      content: (
        <div className="space-y-4 max-w-4xl mx-auto py-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30">
              <span className="font-bold text-rose-400 uppercase tracking-wider block mb-1">Emergency Department Flow</span>
              <p className="text-slate-300 leading-relaxed">
                Emergency average wait of 112 mins drives 38% complaint rate. Over 60% of complaints cite zero status updates while waiting for blood lab results.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/30">
              <span className="font-bold text-amber-400 uppercase tracking-wider block mb-1">Shift Change Communication</span>
              <p className="text-slate-300 leading-relaxed">
                Contradictory discharge orders between departing day nurses and incoming night staff trigger medication confusion and prolonged hospital bed boarding.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/30">
              <span className="font-bold text-cyan-400 uppercase tracking-wider block mb-1">Digital 2FA Hurdles</span>
              <p className="text-slate-300 leading-relaxed">
                Elderly chronic care patients suffer a 32% failure rate connecting to video visits due to SMS two-factor authentication latency.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-200">
            <strong className="text-rose-400">Wait Time Critical Threshold: </strong>
            Patient satisfaction plummets from 4.6★ when seen under 20 minutes to 1.8★ when wait times exceed 3 hours. Providing transparent clinical milestone SMS updates cuts perceived wait frustration by 45%.
          </div>
        </div>
      ),
    },
    {
      title: 'Section 7: AI Risk Monitoring & Hallucination Traps',
      subtitle: 'Clinical governance & algorithmic liability protection',
      section: 'Section 7: AI Risk Monitoring',
      content: (
        <div className="space-y-4 max-w-4xl mx-auto py-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/40">
              <span className="font-bold text-rose-400 uppercase tracking-wider block mb-1">
                Hallucination Trap Exposure
              </span>
              <p className="text-slate-300 leading-relaxed">
                Patients utilizing third-party LLMs or receiving unchecked auto-generated EHR summaries received contradictory cardiac medication dosages and unsafe post-op clearance.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/40">
              <span className="font-bold text-amber-400 uppercase tracking-wider block mb-1">
                Clinical Safety Escalations
              </span>
              <p className="text-slate-300 leading-relaxed">
                Cases flagged for immediate human review include acute surgical abdomen deterioration and weekend release of unannounced malignant pathology without physician pre-counseling.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <strong className="text-cyan-400">Governance Mandate: </strong>
            Institute mandatory human clinician sign-off on all AI-generated clinical summaries prior to chart release; deploy <strong>SafetySentinel</strong> guardrails to block autonomous conflicting guidance.
          </div>
        </div>
      ),
    },
    {
      title: 'Section 8: Recommended Healthcare AI Agents',
      subtitle: 'High-ROI targeted autonomous agent architectures',
      section: 'Section 8: AI Agent Solutions',
      content: (
        <div className="space-y-3 max-w-4xl mx-auto py-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="font-bold text-cyan-400">CareBridge 360</span>
              <p className="text-slate-300 mt-1">
                Autonomous post-discharge medication companion. Projected 28% drop in 30-day readmissions; $1.42M annual ROI.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="font-bold text-cyan-400">TriagePulse</span>
              <p className="text-slate-300 mt-1">
                Conversational SMS ED waiting room companion. 41% reduction in walkouts; $680K annual revenue recovery.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="font-bold text-cyan-400">LinguaCare</span>
              <p className="text-slate-300 mt-1">
                Medically certified real-time translation agent across 36 languages, eliminating interpreter wait delays.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
            All agents enforce strict clinical guardrails, SNOMED-CT ontology grounding, and zero autonomous prescription alteration without licensed nurse escalation.
          </div>
        </div>
      ),
    },
    {
      title: 'Section 9: Executive Priorities & 90-Day Roadmap',
      subtitle: 'Actionable transformation timeline for hospital leadership',
      section: 'Section 9: Executive Action Plan',
      content: (
        <div className="space-y-4 max-w-4xl mx-auto py-2 text-xs">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="font-bold text-emerald-400 text-sm">Top 3 Immediate C-Suite Action Items:</h4>
            <div className="space-y-1.5 text-slate-200">
              <div>1. <strong>Deploy Two-Way SMS Status Alerts in Emergency:</strong> Target 30-day operational launch to eliminate waiting room anxiety.</div>
              <div>2. <strong>Implement Audio-Translated Discharge QR Guides:</strong> Deliver multi-lingual post-discharge audio summaries in 4 major patient languages.</div>
              <div>3. <strong>Establish Clinical AI Risk Governance Board:</strong> Enforce mandatory SafetySentinel interception on automated EHR chart notes.</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400">Total Projected Financial ROI Across Initiatives:</span>
            <span className="text-emerald-400 font-extrabold text-base">$3.2M / Year</span>
          </div>
        </div>
      ),
    },
  ];

  const handlePrev = () => {
    setCurrentSlide((s) => Math.max(0, s - 1));
  };

  const handleNext = () => {
    setCurrentSlide((s) => Math.min(slides.length - 1, s + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col select-none text-white overflow-hidden">
      {/* Presentation Top Control Bar */}
      <div className="px-6 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
        <div className="flex items-center space-x-3">
          <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            Executive Deck
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Use Left / Right arrow keys to navigate • Esc to exit
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-400 mr-2">
            Slide {currentSlide + 1} of {slides.length}
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Slide Body */}
      <div className="flex-1 px-6 sm:px-12 py-8 flex flex-col justify-center max-w-5xl mx-auto w-full overflow-y-auto">
        <div className="mb-6">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-1">
            {slide.section}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {slide.title}
          </h2>
          <p className="text-sm text-slate-400 mt-1">{slide.subtitle}</p>
        </div>

        <div className="flex-1 flex flex-col justify-center">{slide.content}</div>
      </div>

      {/* Presentation Bottom Navigation Bar */}
      <div className="px-6 py-4 border-t border-slate-800/80 bg-slate-900/80 flex items-center justify-between">
        <div className="flex items-center space-x-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === idx ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
              title={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrev}
            disabled={currentSlide === 0}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-xs font-semibold text-white transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
          <button
            onClick={handleNext}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center space-x-1 px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-30 text-xs font-semibold text-white shadow-md shadow-cyan-600/20 transition"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
