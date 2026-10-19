import React, { useState, useMemo } from 'react';
import {
  MessageSquareText,
  Cloud,
  Hash,
  Layers,
  Sparkles,
  Search,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';
import { PatientFeedbackRecord, KeywordStat } from '../types/healthcare';
import { calculateNLPThemes, calculateTopKeywords } from '../utils/analytics';

interface NLPAnalysisProps {
  records: PatientFeedbackRecord[];
  onSelectKeyword?: (keyword: string) => void;
  onSelectTheme?: (theme: string) => void;
}

export const NLPAnalysis: React.FC<NLPAnalysisProps> = ({
  records,
  onSelectKeyword,
  onSelectTheme,
}) => {
  const themes = useMemo(() => calculateNLPThemes(records), [records]);
  const keywords = useMemo(() => calculateTopKeywords(records), [records]);

  const [activeWordCloudFilter, setActiveWordCloudFilter] = useState<'All' | 'Positive' | 'Neutral' | 'Negative'>('All');
  const [hoveredWord, setHoveredWord] = useState<KeywordStat | null>(null);

  // Top 35 keywords for the interactive Word Cloud
  const wordCloudItems = useMemo(() => {
    let filtered = keywords;
    if (activeWordCloudFilter !== 'All') {
      filtered = keywords.filter((k) => k.sentiment === activeWordCloudFilter);
    }
    return filtered.slice(0, 32);
  }, [keywords, activeWordCloudFilter]);

  const maxKeywordCount = useMemo(() => {
    return Math.max(...keywords.map((k) => k.count), 1);
  }, [keywords]);

  return (
    <section id="section-nlp" className="scroll-mt-32 mb-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Section 3
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Natural Language Processing</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            NLP Feedback Analysis & Interactive Word Cloud
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Machine learning extraction of clinical themes, linguistic semantics, sentiment polarity, and high-frequency terminology across verbatim patient reviews.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Top Themes Identified + Distribution (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Top Clinical & Operational Themes ({themes.length})</span>
              </h3>
              <span className="text-xs text-slate-400">Sentiment Ratio</span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Click any theme to view specific patient records and root causes.
            </p>

            {/* Themes Distribution List */}
            <div className="space-y-3 max-h-[390px] overflow-y-auto pr-1">
              {themes.map((t) => {
                const total = t.count || 1;
                const posPct = Math.round((t.positiveCount / total) * 100);
                const neuPct = Math.round((t.neutralCount / total) * 100);
                const negPct = Math.round((t.negativeCount / total) * 100);

                return (
                  <div
                    key={t.theme}
                    onClick={() => onSelectTheme?.(t.theme)}
                    className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-800/60 transition cursor-pointer group"
                    title={`Click to filter comments for "${t.theme}"`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-white group-hover:text-cyan-300 transition">
                        {t.theme}
                      </span>
                      <div className="flex items-center space-x-2 text-[11px]">
                        <span className="text-slate-400 font-medium">{t.count} comments</span>
                        <span className="font-bold text-white bg-slate-800 px-1.5 py-0.5 rounded">
                          Avg {t.avgScore}★
                        </span>
                      </div>
                    </div>

                    {/* Segmented Sentiment Bar */}
                    <div className="flex h-2 w-full rounded-full overflow-hidden bg-slate-800">
                      <div
                        style={{ width: `${posPct}%` }}
                        className="bg-emerald-500 transition-all duration-300"
                        title={`Positive: ${posPct}%`}
                      />
                      <div
                        style={{ width: `${neuPct}%` }}
                        className="bg-amber-500 transition-all duration-300"
                        title={`Neutral: ${neuPct}%`}
                      />
                      <div
                        style={{ width: `${negPct}%` }}
                        className="bg-rose-500 transition-all duration-300"
                        title={`Negative: ${negPct}%`}
                      />
                    </div>

                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span className="text-emerald-400">{posPct}% Positive</span>
                      <span className="text-amber-400">{neuPct}% Neutral</span>
                      <span className="text-rose-400">{negPct}% Negative</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5" /> Positive
              <span className="w-2 h-2 rounded-full bg-amber-500 ml-3 mr-1.5" /> Neutral
              <span className="w-2 h-2 rounded-full bg-rose-500 ml-3 mr-1.5" /> Negative
            </span>
            <span>Total Themes: {themes.length}</span>
          </div>
        </div>

        {/* Right Column: Interactive Word Cloud & Keyword Rankings (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Cloud className="w-4 h-4 text-teal-400" />
                <span>Interactive Word Cloud</span>
              </h3>

              {/* Word Cloud Filter Toggle */}
              <div className="flex items-center space-x-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[11px]">
                {(['All', 'Positive', 'Negative', 'Neutral'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveWordCloudFilter(filter)}
                    className={`px-2 py-0.5 rounded-md transition font-medium ${
                      activeWordCloudFilter === filter
                        ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Word Cloud Container */}
            <div className="relative min-h-[220px] bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 overflow-hidden select-none">
              {wordCloudItems.map((item, idx) => {
                // Scale font size from 11px to 26px based on count
                const scale = item.count / maxKeywordCount;
                const fontSize = Math.max(11, Math.min(26, Math.round(11 + scale * 15)));

                const colorClasses = {
                  Positive: 'text-emerald-400 hover:text-emerald-200 bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30',
                  Negative: 'text-rose-400 hover:text-rose-200 bg-rose-500/10 hover:bg-rose-500/20 border-rose-500/30',
                  Neutral: 'text-amber-300 hover:text-amber-100 bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30',
                };

                return (
                  <button
                    key={item.word}
                    onClick={() => onSelectKeyword?.(item.word)}
                    onMouseEnter={() => setHoveredWord(item)}
                    onMouseLeave={() => setHoveredWord(null)}
                    style={{ fontSize: `${fontSize}px` }}
                    className={`inline-flex items-center px-2 py-1 rounded-lg border font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                      colorClasses[item.sentiment]
                    }`}
                    title={`"${item.word}": ${item.count} occurrences (${item.sentiment})`}
                  >
                    <span>{item.word}</span>
                    <span className="text-[10px] ml-1 opacity-70 font-normal">
                      {item.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Word Hover Details Tooltip Bar */}
            <div className="h-8 mt-2 flex items-center justify-between text-xs px-2 text-slate-400">
              {hoveredWord ? (
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white uppercase tracking-wider">
                    "{hoveredWord.word}"
                  </span>
                  <span className="text-slate-500">•</span>
                  <span>{hoveredWord.count} mentions</span>
                  <span className="text-slate-500">•</span>
                  <span
                    className={`font-semibold ${
                      hoveredWord.sentiment === 'Positive'
                        ? 'text-emerald-400'
                        : hoveredWord.sentiment === 'Negative'
                        ? 'text-rose-400'
                        : 'text-amber-400'
                    }`}
                  >
                    {hoveredWord.sentiment}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-300 italic">{hoveredWord.primaryTheme}</span>
                </div>
              ) : (
                <span className="text-[11px] text-slate-400 italic">
                  Hover over or click any term in the cloud to view context & occurrences.
                </span>
              )}
            </div>

            {/* Top Keywords Frequency Ranking Table */}
            <div className="mt-2 border-t border-slate-800 pt-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                  <Hash className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Most Frequent Clinical Keywords Ranking</span>
                </span>
                <span className="text-[11px] text-slate-400">Frequency Meter</span>
              </div>

              <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                {keywords.slice(0, 5).map((kw, i) => (
                  <div
                    key={kw.word}
                    onClick={() => onSelectKeyword?.(kw.word)}
                    className="flex items-center justify-between text-xs p-1.5 rounded-lg bg-slate-950/40 hover:bg-slate-800/50 cursor-pointer transition"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold text-slate-400 w-4">#{i + 1}</span>
                      <span className="font-medium text-slate-200 capitalize">{kw.word}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                          kw.sentiment === 'Positive'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : kw.sentiment === 'Negative'
                            ? 'bg-rose-500/10 text-rose-400'
                            : 'bg-amber-500/10 text-amber-300'
                        }`}
                      >
                        {kw.sentiment}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-cyan-400 h-full rounded-full"
                          style={{ width: `${(kw.count / maxKeywordCount) * 100}%` }}
                        />
                      </div>
                      <span className="text-slate-400 text-[11px] font-medium w-8 text-right">
                        {kw.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
