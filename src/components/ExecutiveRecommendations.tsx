import React, { useState } from 'react';
import {
  Target,
  Zap,
  Rocket,
  Download,
  Printer,
  CheckCircle,
  Clock,
  TrendingUp,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import { EXECUTIVE_PRIORITIES, QUICK_WINS, LONG_TERM_OPPORTUNITIES } from '../data/mockFeedbackData';

export const ExecutiveRecommendations: React.FC = () => {
  const [copiedBriefing, setCopiedBriefing] = useState(false);

  const handleCopyExecutiveSummary = () => {
    const summaryText = `EXECUTIVE HEALTHCARE ANALYTICS BRIEFING
Metropolitan Health System - Board of Directors & C-Suite Committee

TOP 5 ORGANIZATIONAL PRIORITIES:
1. Transform Emergency Department Flow & Triage Transparency (Urgency: Immediate)
2. Standardize Discharge Communication & Multilingual Equity (Urgency: Immediate)
3. Establish Clinical AI Risk Governance & Hallucination Guardrails (Urgency: High)
4. Resolve Digital Literacy & Portal Usability Barriers for Seniors (Urgency: High)
5. Eliminate Specialist Referral & Diagnostic Latency Bottlenecks (Urgency: Medium)

QUICK WINS (WITHIN 3 MONTHS):
- Two-Way SMS Wait-Time Notifications in Emergency (30 Days)
- Physical QR Codes for Audio-Translated Discharge Guides (45 Days)
- One-Click Nurse Callback Button in Patient Portal (60 Days)
- Hospital Physical Accessibility & Wayfinding Fast-Track (30 Days)

LONG-TERM AI OPPORTUNITIES (6-12 MONTHS):
- Enterprise CareBridge 360 EHR Integration ($1.42M annual ROI)
- Ambient AI Scribing for Physician-Patient Eye Contact (+18% HCAHPS Communication)
- Predictive Inpatient Bed Flow & Discharge Forecasting (1.4 Days Reduced ALOS)
- Continuous Disparity & Health Equity Surveillance Network`;

    navigator.clipboard.writeText(summaryText);
    setCopiedBriefing(true);
    setTimeout(() => setCopiedBriefing(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="section-recommendations" className="scroll-mt-32 mb-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Section 9
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Action Plan & C-Suite Roadmap</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Executive Recommendations & Transformation Roadmap
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Prioritized strategic initiatives, 90-day operational quick wins, and multi-horizon AI infrastructure opportunities for hospital leadership.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <button
            onClick={handleCopyExecutiveSummary}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>{copiedBriefing ? 'Briefing Copied!' : 'Copy Executive Brief'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* SUB-SECTION 1: Top 5 Organizational Priorities */}
      <div className="mb-8">
        <h3 className="text-base font-bold text-white flex items-center space-x-2 mb-4">
          <Target className="w-4 h-4 text-emerald-400" />
          <span>Top 5 Strategic Organizational Priorities</span>
        </h3>

        <div className="space-y-4">
          {EXECUTIVE_PRIORITIES.map((p) => {
            const urgencyColors = {
              'Immediate (Critical)': 'bg-rose-500/20 text-rose-300 border-rose-500/30',
              High: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
              'Strategic Medium': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
            };

            return (
              <div
                key={p.id}
                className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg hover:border-slate-700 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sm text-cyan-400">
                      #{p.rank}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-tight">
                        {p.title}
                      </h4>
                      <span className="text-[11px] text-slate-400">
                        Service Line Focus: <strong className="text-slate-300">{p.serviceLine}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2.5 py-0.5 rounded text-xs font-semibold border ${
                        urgencyColors[p.urgency]
                      }`}
                    >
                      {p.urgency}
                    </span>
                    <span className="text-xs text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {p.timeframe}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mt-3 pt-3 border-t border-slate-800">
                  <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                    <div className="text-[10px] font-bold text-rose-400 uppercase tracking-wider mb-1">
                      Data Evidence
                    </div>
                    <p className="text-slate-300 leading-relaxed">{p.evidence}</p>
                  </div>

                  <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                    <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider mb-1">
                      Action Plan
                    </div>
                    <p className="text-slate-300 leading-relaxed">{p.actionPlan}</p>
                  </div>

                  <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                    <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">
                      Expected Outcome & ROI
                    </div>
                    <p className="text-slate-300 leading-relaxed">{p.expectedOutcome}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SUB-SECTION 2: Quick Wins & Long-Term Opportunities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Wins (Within 3 Months) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Quick Wins (Within 3 Months)</span>
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Low Effort • Rapid Impact
              </span>
            </div>

            <div className="space-y-3">
              {QUICK_WINS.map((qw, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-amber-500/30 transition"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-white">{qw.title}</span>
                    <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-slate-800 text-amber-400">
                      {qw.timeline}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-2">
                    {qw.description}
                  </p>
                  <div className="flex items-center space-x-3 text-[11px] text-slate-400">
                    <span>Implementation Effort: <strong className="text-slate-200">{qw.effort}</strong></span>
                    <span>•</span>
                    <span>Expected ROI: <strong className="text-emerald-400">{qw.impact}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Long-Term AI Opportunities (6–12 Months) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Rocket className="w-4 h-4 text-purple-400" />
                <span>Long-Term AI Horizons (6–12 Months)</span>
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                High Value Transformation
              </span>
            </div>

            <div className="space-y-3">
              {LONG_TERM_OPPORTUNITIES.map((lt, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-purple-500/30 transition"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-white">{lt.title}</span>
                    <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300">
                      {lt.timeline}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-2">
                    {lt.description}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
                    <span>Horizon: 6–12 Months</span>
                    <span className="text-emerald-400 font-bold">Estimated Benefit: {lt.roi}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
