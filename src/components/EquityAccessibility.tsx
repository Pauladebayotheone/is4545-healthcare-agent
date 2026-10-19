import React from 'react';
import {
  Scale,
  Languages,
  Accessibility,
  Smartphone,
  MapPin,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { PatientFeedbackRecord } from '../types/healthcare';
import { calculateEquityAndAccessibility, calculateSatisfactionByPersona } from '../utils/analytics';

interface EquityAccessibilityProps {
  records: PatientFeedbackRecord[];
  overallAvgSat: number;
}

export const EquityAccessibility: React.FC<EquityAccessibilityProps> = ({
  records,
  overallAvgSat,
}) => {
  const equityData = calculateEquityAndAccessibility(records);
  const personaStats = calculateSatisfactionByPersona(records, overallAvgSat);

  return (
    <section id="section-equity" className="scroll-mt-32 mb-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Section 6
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Health Equity & Inclusion</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Healthcare Equity & Accessibility Surveillance
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Evaluating structural care disparities across patient demographic personas, language access barriers, physical hospital accessibility, and digital health literacy obstacles.
          </p>
        </div>
      </div>

      {/* 4 Pillars of Health Equity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Pillar 1: Language Barriers */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg hover:border-indigo-500/40 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Language Access</span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Languages className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">
            {equityData.language.total} Encounters
          </div>
          <div className="flex items-center space-x-2 text-xs mt-1">
            <span className="text-slate-400">Avg Rating:</span>
            <span className="font-bold text-rose-400">{equityData.language.avgSat}★</span>
            <span className="text-rose-400 font-semibold text-[11px]">(-1.2 Gap)</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
            {equityData.language.keyFindings.map((f, i) => (
              <div key={i} className="flex items-start space-x-1.5">
                <span className="text-indigo-400">•</span>
                <span className="truncate">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pillar 2: Physical Accessibility */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg hover:border-cyan-500/40 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Physical Access</span>
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Accessibility className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">
            {equityData.physicalAccessibility.total} Encounters
          </div>
          <div className="flex items-center space-x-2 text-xs mt-1">
            <span className="text-slate-400">Avg Rating:</span>
            <span className="font-bold text-amber-400">{equityData.physicalAccessibility.avgSat}★</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
            {equityData.physicalAccessibility.keyFindings.map((f, i) => (
              <div key={i} className="flex items-start space-x-1.5">
                <span className="text-cyan-400">•</span>
                <span className="truncate">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pillar 3: Digital Literacy */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg hover:border-teal-500/40 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Digital Literacy</span>
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
              <Smartphone className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">
            {equityData.digitalLiteracy.total} Encounters
          </div>
          <div className="flex items-center space-x-2 text-xs mt-1">
            <span className="text-slate-400">Avg Rating:</span>
            <span className="font-bold text-amber-400">{equityData.digitalLiteracy.avgSat}★</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
            {equityData.digitalLiteracy.keyFindings.map((f, i) => (
              <div key={i} className="flex items-start space-x-1.5">
                <span className="text-teal-400">•</span>
                <span className="truncate">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pillar 4: Transportation / Commute */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg hover:border-purple-500/40 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Transit & Distance</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">
            {equityData.transportation.total} Encounters
          </div>
          <div className="flex items-center space-x-2 text-xs mt-1">
            <span className="text-slate-400">Avg Rating:</span>
            <span className="font-bold text-amber-400">{equityData.transportation.avgSat}★</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
            {equityData.transportation.keyFindings.map((f, i) => (
              <div key={i} className="flex items-start space-x-1.5">
                <span className="text-purple-400">•</span>
                <span className="truncate">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Disparity Index Comparison Chart */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Scale className="w-4 h-4 text-indigo-400" />
              <span>Persona Equity Disparity Matrix (vs Hospital Baseline: {overallAvgSat}★)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Identifies demographic segments suffering systematic satisfaction drag due to non-clinical friction.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {personaStats.map((item) => {
            const isNegative = item.disparityGap < 0;
            const barWidth = Math.min(100, Math.abs(item.disparityGap) * 40);

            return (
              <div
                key={item.persona}
                className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs mb-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-white">{item.persona}</span>
                    <span className="text-[11px] text-slate-400">({item.count} patients)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-slate-300">
                      Satisfaction: <strong className="text-white">{item.avgSatisfaction}★</strong>
                    </span>
                    <span
                      className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                        isNegative
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {item.disparityGap > 0 ? `+${item.disparityGap}` : item.disparityGap}★ vs Baseline
                    </span>
                  </div>
                </div>

                {/* Qualitative Root Issue Bar */}
                <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                  <span className="truncate">
                    <strong className="text-slate-300">Dominant Barrier: </strong>
                    {item.topConcern}
                  </span>
                  {item.equityIssuesCount > 0 && (
                    <span className="text-indigo-400 text-[10px] font-semibold shrink-0 ml-2">
                      {item.equityIssuesCount} documented barrier incidents
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
