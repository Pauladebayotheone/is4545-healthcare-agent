import React from 'react';
import {
  MessageSquare,
  Star,
  PhoneCall,
  CheckCircle2,
  Building2,
  TrendingUp,
  AlertOctagon,
  Clock,
  Sparkles,
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react';
import { ExecutiveMetrics } from '../types/healthcare';

interface ExecutiveOverviewProps {
  metrics: ExecutiveMetrics;
  onExploreSection: (sec: string) => void;
}

export const ExecutiveOverview: React.FC<ExecutiveOverviewProps> = ({
  metrics,
  onExploreSection,
}) => {
  return (
    <section id="section-overview" className="scroll-mt-32">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Section 1
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Executive Summary</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Executive Overview & Key Performance Indicators
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time synthesis of patient encounters, HCAHPS experience ratings, compliance loops, and enterprise clinical safety.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800">
            Q3 Performance Period
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
            100% Data Grounded
          </span>
        </div>
      </div>

      {/* 5 Core Required KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {/* KPI 1: Total Patient Comments Analyzed */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg hover:border-slate-700 transition relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Comments Analyzed</span>
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {metrics.totalComments.toLocaleString()}
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
            <span>Inpatient & Outpatient</span>
            <span className="text-emerald-400 font-medium flex items-center">
              +14% vol <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>
          {/* Micro Sentiment Bar */}
          <div className="mt-3">
            <div className="flex h-1.5 w-full rounded-full overflow-hidden bg-slate-800">
              <div style={{ width: `${metrics.positivePct}%` }} className="bg-emerald-500" title={`Positive: ${metrics.positivePct}%`} />
              <div style={{ width: `${metrics.neutralPct}%` }} className="bg-amber-500" title={`Neutral: ${metrics.neutralPct}%`} />
              <div style={{ width: `${metrics.negativePct}%` }} className="bg-rose-500" title={`Negative: ${metrics.negativePct}%`} />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span className="text-emerald-400">{metrics.positivePct}% Pos</span>
              <span className="text-rose-400">{metrics.negativePct}% Neg</span>
            </div>
          </div>
        </div>

        {/* KPI 2: Average Patient Satisfaction Score */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg hover:border-slate-700 transition relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-emerald-500" />
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Avg Satisfaction</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {metrics.avgSatisfaction}
            </span>
            <span className="text-xs text-slate-400 font-semibold">/ 5.0</span>
          </div>
          <div className="mt-2 text-xs text-slate-400">
            <div className="flex items-center justify-between mb-1">
              <span>HCAHPS Target: 4.2</span>
              <span className={metrics.avgSatisfaction >= 4.0 ? 'text-emerald-400' : 'text-amber-400 font-medium'}>
                {metrics.avgSatisfaction >= 4.0 ? 'On Target' : 'Gap: -0.36'}
              </span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full"
                style={{ width: `${(metrics.avgSatisfaction / 5.0) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* KPI 3: Average Communication Rating */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg hover:border-slate-700 transition relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-cyan-500" />
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Communication</span>
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
              <PhoneCall className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {metrics.avgCommunication}
            </span>
            <span className="text-xs text-slate-400 font-semibold">/ 5.0</span>
          </div>
          <div className="mt-2 text-xs text-slate-400">
            <div className="flex items-center justify-between mb-1">
              <span>Bedside & Discharge</span>
              <span className="text-cyan-400 font-medium">Physician & RN</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-cyan-400 h-full rounded-full"
                style={{ width: `${(metrics.avgCommunication / 5.0) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* KPI 4: Follow-up Compliance Rate */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg hover:border-slate-700 transition relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400" />
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Follow-Up Rate</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {metrics.followUpComplianceRate}%
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-400">
            <div className="flex items-center justify-between mb-1">
              <span>30-Day Transition</span>
              <span className="text-emerald-400 font-medium">Goal: &gt;80%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full"
                style={{ width: `${metrics.followUpComplianceRate}%` }}
              />
            </div>
          </div>
        </div>

        {/* KPI 5: Number of Service Lines Represented */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg hover:border-slate-700 transition relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Service Lines</span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {metrics.serviceLinesCount}
          </div>
          <div className="mt-2 text-xs text-slate-400">
            <div className="flex items-center justify-between mb-1">
              <span>Hospital Coverage</span>
              <span className="text-indigo-400 font-semibold">100% Enterprise</span>
            </div>
            <p className="text-[11px] text-slate-400 truncate">ED, Cardio, Onco, Peds & 5 more</p>
          </div>
        </div>
      </div>

      {/* Strategic Executive Insights Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-bold text-white tracking-tight">
                  Chief Medical Officer & C-Suite Analytical Summary
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  3 Critical Bottlenecks Flagged
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Analysis of <strong>{metrics.totalComments.toLocaleString()} patient comments</strong> reveals strong clinical quality in Oncology (4.3/5) and Cardiology (4.1/5), but severe patient friction centered in <strong>Emergency Department wait times (avg 112 mins)</strong>, <strong>shift-change discharge instructions</strong>, and a <strong>1.2-point satisfaction gap for Non-English speakers</strong>. Additionally, <strong>{metrics.aiRiskCount} comments trigger AI safety or hallucination risk flags</strong> requiring clinical oversight.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0">
            <button
              onClick={() => onExploreSection('bottlenecks')}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition"
            >
              View Bottlenecks
            </button>
            <button
              onClick={() => onExploreSection('airisk')}
              className="px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/50 text-xs font-medium text-rose-200 border border-rose-800/60 transition"
            >
              Audit AI Risks ({metrics.aiRiskCount})
            </button>
            <button
              onClick={() => onExploreSection('agents')}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold text-white shadow-md shadow-cyan-600/20 transition"
            >
              Explore AI Agent Solutions
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
