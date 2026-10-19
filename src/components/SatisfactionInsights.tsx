import React, { useState } from 'react';
import {
  Star,
  Building2,
  Users,
  Compass,
  ArrowUpDown,
  TrendingDown,
  TrendingUp,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import {
  ServiceLineStat,
  VisitTypeStat,
  PersonaStat,
  PatientFeedbackRecord,
} from '../types/healthcare';
import {
  calculateSatisfactionDistribution,
  calculateSatisfactionByServiceLine,
  calculateSatisfactionByVisitType,
  calculateSatisfactionByPersona,
} from '../utils/analytics';

interface SatisfactionInsightsProps {
  records: PatientFeedbackRecord[];
  overallAvgSat: number;
  onFilterServiceLine?: (line: any) => void;
  onFilterPersona?: (persona: any) => void;
}

export const SatisfactionInsights: React.FC<SatisfactionInsightsProps> = ({
  records,
  overallAvgSat,
  onFilterServiceLine,
  onFilterPersona,
}) => {
  const distribution = calculateSatisfactionDistribution(records);
  const serviceStats = calculateSatisfactionByServiceLine(records);
  const visitTypeStats = calculateSatisfactionByVisitType(records);
  const personaStats = calculateSatisfactionByPersona(records, overallAvgSat);

  const [activeTab, setActiveTab] = useState<'service' | 'visit' | 'persona'>('service');
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  return (
    <section id="section-satisfaction" className="scroll-mt-32 mb-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Section 2
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Patient Sentiment Analysis</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Patient Satisfaction Insights & Distribution
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Comparative analysis of patient satisfaction scores segmented by clinical service lines, care modalities, and demographic personas.
          </p>
        </div>
      </div>

      {/* Grid: Distribution Histogram + Tabbed Segmentation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Satisfaction Distribution Histogram (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Satisfaction Distribution (1–5 Stars)</span>
              </h3>
              <span className="text-xs text-slate-400 font-medium">N={records.length}</span>
            </div>

            {/* Distribution Bars */}
            <div className="space-y-3.5 my-4">
              {distribution.map((item) => {
                const colorMap = {
                  5: 'bg-emerald-500',
                  4: 'bg-teal-500',
                  3: 'bg-amber-500',
                  2: 'bg-orange-500',
                  1: 'bg-rose-500',
                };
                const bgBar = colorMap[item.stars as 1 | 2 | 3 | 4 | 5];

                return (
                  <div key={item.stars} className="group">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <div className="flex items-center space-x-1.5 font-medium text-slate-300">
                        <span className="w-12">{item.label}</span>
                        <div className="flex items-center text-amber-400">
                          {Array.from({ length: item.stars }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-white">{item.percentage}%</span>
                        <span className="text-slate-500 ml-1.5">({item.count})</span>
                      </div>
                    </div>
                    {/* Progress Track */}
                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5">
                      <div
                        className={`${bgBar} h-full rounded-full transition-all duration-500 group-hover:brightness-110`}
                        style={{ width: `${Math.max(2, item.percentage)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Distribution Summary Insight Box */}
          <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400 bg-slate-950/60 p-3 rounded-lg">
            <div className="flex items-center space-x-1.5 text-amber-300 font-semibold mb-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Bimodal Satisfaction Warning</span>
            </div>
            <p className="leading-relaxed">
              <strong>{((distribution[0].percentage + distribution[1].percentage)).toFixed(1)}%</strong> of patients report 1 or 2 stars, concentrated primarily in Emergency and Orthopedics. 5-star ratings (<strong>{distribution[4].percentage}%</strong>) correlate with proactive bedside nurse communication.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Segmentations (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col">
          {/* Tabs for Segmentations */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setActiveTab('service')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'service'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>By Service Line ({serviceStats.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('visit')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'visit'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>By Visit Type ({visitTypeStats.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('persona')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'persona'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>By Patient Persona ({personaStats.length})</span>
              </button>
            </div>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Benchmark Target: <strong>4.20</strong>
            </span>
          </div>

          {/* Tab 1: Satisfaction By Service Line */}
          {activeTab === 'service' && (
            <div className="space-y-3 overflow-y-auto max-h-[380px] pr-1">
              <div className="grid grid-cols-12 text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
                <span className="col-span-4">Service Line</span>
                <span className="col-span-4 text-center">Satisfaction (out of 5.0)</span>
                <span className="col-span-2 text-right">Complaint Rate</span>
                <span className="col-span-2 text-right">Wait Time</span>
              </div>

              {serviceStats.map((item) => {
                const isUnderperforming = item.avgSatisfaction < 3.8;
                const isTopPerformer = item.avgSatisfaction >= 4.2;

                return (
                  <div
                    key={item.serviceLine}
                    onClick={() => onFilterServiceLine?.(item.serviceLine)}
                    className="grid grid-cols-12 items-center p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-800/60 transition cursor-pointer group"
                    title={`Click to filter comments for ${item.serviceLine}`}
                  >
                    <div className="col-span-4">
                      <div className="font-semibold text-xs text-white group-hover:text-cyan-300 transition flex items-center space-x-1.5">
                        <span>{item.serviceLine}</span>
                        {isUnderperforming && (
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" title="High complaint rate" />
                        )}
                        {isTopPerformer && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Top performer" />
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400">{item.count} encounters analyzed</div>
                    </div>

                    <div className="col-span-4 px-2">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-white">{item.avgSatisfaction}</span>
                        <span className="text-[10px] text-slate-400">Comm: {item.avgCommunication}</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            item.avgSatisfaction >= 4.2
                              ? 'bg-emerald-400'
                              : item.avgSatisfaction >= 3.8
                              ? 'bg-teal-400'
                              : item.avgSatisfaction >= 3.5
                              ? 'bg-amber-400'
                              : 'bg-rose-500'
                          }`}
                          style={{ width: `${(item.avgSatisfaction / 5.0) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="col-span-2 text-right">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                          item.complaintRate >= 25
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {item.complaintRate}%
                      </span>
                    </div>

                    <div className="col-span-2 text-right text-xs font-medium text-slate-300">
                      {item.avgWaitTime}m
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 2: Satisfaction By Visit Type */}
          {activeTab === 'visit' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {visitTypeStats.map((item) => (
                <div
                  key={item.visitType}
                  className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white">{item.visitType}</span>
                    <span className="text-[11px] text-slate-400">{item.count} pts</span>
                  </div>
                  <div className="flex items-baseline space-x-1.5 mb-2">
                    <span className="text-2xl font-extrabold text-white">{item.avgSatisfaction}</span>
                    <span className="text-xs text-slate-400">/ 5.0</span>
                    <span
                      className={`ml-auto text-[11px] font-semibold px-2 py-0.5 rounded ${
                        item.negativePct > 25 ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                      }`}
                    >
                      {item.negativePct}% Neg
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
                    <div
                      className="bg-cyan-400 h-full rounded-full"
                      style={{ width: `${(item.avgSatisfaction / 5.0) * 100}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-slate-400 flex justify-between">
                    <span>Communication:</span>
                    <strong className="text-slate-200">{item.avgCommunication} / 5.0</strong>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Satisfaction By Patient Persona */}
          {activeTab === 'persona' && (
            <div className="space-y-2.5 overflow-y-auto max-h-[380px] pr-1">
              <div className="grid grid-cols-12 text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
                <span className="col-span-4">Patient Persona</span>
                <span className="col-span-3 text-center">Satisfaction Score</span>
                <span className="col-span-2 text-center">Disparity Gap</span>
                <span className="col-span-3">Primary Root Concern</span>
              </div>

              {personaStats.map((item) => {
                const isNegativeGap = item.disparityGap < 0;

                return (
                  <div
                    key={item.persona}
                    onClick={() => onFilterPersona?.(item.persona)}
                    className="grid grid-cols-12 items-center p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-800/60 transition cursor-pointer"
                    title={`Click to filter comments for ${item.persona}`}
                  >
                    <div className="col-span-4">
                      <div className="font-semibold text-xs text-white flex items-center space-x-1.5">
                        <span>{item.persona}</span>
                        {item.equityIssuesCount > 0 && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            {item.equityIssuesCount} equity flags
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400">{item.count} patients surveyed</div>
                    </div>

                    <div className="col-span-3 px-2">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-white">{item.avgSatisfaction}</span>
                        <span className="text-[10px] text-slate-400">Comm: {item.avgCommunication}</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${isNegativeGap ? 'bg-rose-500' : 'bg-emerald-400'}`}
                          style={{ width: `${(item.avgSatisfaction / 5.0) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="col-span-2 text-center">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                          isNegativeGap
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {isNegativeGap ? <TrendingDown className="w-3 h-3 mr-1" /> : <TrendingUp className="w-3 h-3 mr-1" />}
                        {item.disparityGap > 0 ? `+${item.disparityGap}` : item.disparityGap}
                      </span>
                    </div>

                    <div className="col-span-3 text-[11px] text-slate-300 truncate" title={item.topConcern}>
                      {item.topConcern}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
