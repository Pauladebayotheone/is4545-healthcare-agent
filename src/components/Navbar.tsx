import React from 'react';
import {
  Activity,
  Upload,
  Presentation,
  Bot,
  FileSpreadsheet,
  RefreshCw,
  Sparkles,
  ShieldAlert,
  ChevronDown,
} from 'lucide-react';

interface NavbarProps {
  totalRecords: number;
  filteredCount: number;
  onOpenUpload: () => void;
  onOpenPresentation: () => void;
  onOpenAIConsultant: () => void;
  onOpenRawData: () => void;
  activeScenario: string;
  onSelectScenario: (scenario: string) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
  aiRiskCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  totalRecords,
  filteredCount,
  onOpenUpload,
  onOpenPresentation,
  onOpenAIConsultant,
  onOpenRawData,
  activeScenario,
  onSelectScenario,
  onResetFilters,
  hasActiveFilters,
  aiRiskCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Organization Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-teal-500/20 ring-1 ring-white/20">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-base font-bold tracking-tight text-white">
                  Healthcare Analytics Agent
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Executive Suite
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Metropolitan Health System • Clinical Quality & Patient Experience
              </p>
            </div>
          </div>

          {/* Scenario Selector & Data Status */}
          <div className="hidden lg:flex items-center space-x-3">
            <div className="relative group">
              <button className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 transition">
                <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-400" />
                <span>Scenario: <strong className="text-white">{activeScenario}</strong></span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <div className="absolute right-0 mt-1 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 hidden group-hover:block z-50">
                <div className="text-[11px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
                  Select Hospital Dataset
                </div>
                <button
                  onClick={() => onSelectScenario('Full Enterprise (1,248 Records)')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition flex items-center justify-between ${
                    activeScenario.includes('Full') ? 'bg-cyan-500/20 text-cyan-300 font-medium' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>Full Hospital System</span>
                  <span className="text-[10px] text-slate-400">1,248 records</span>
                </button>
                <button
                  onClick={() => onSelectScenario('Emergency & Acute Surge Focus')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition flex items-center justify-between ${
                    activeScenario.includes('Emergency') ? 'bg-cyan-500/20 text-cyan-300 font-medium' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>ED & Acute Surge Crisis</span>
                  <span className="text-[10px] text-slate-400">High wait time</span>
                </button>
                <button
                  onClick={() => onSelectScenario('Health Equity & Vulnerable Focus')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition flex items-center justify-between ${
                    activeScenario.includes('Equity') ? 'bg-cyan-500/20 text-cyan-300 font-medium' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>Health Equity & Language</span>
                  <span className="text-[10px] text-slate-400">ESL & Medicaid</span>
                </button>
              </div>
            </div>

            {/* Records badge */}
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>
                <strong>{filteredCount}</strong> of {totalRecords} Records
              </span>
              {hasActiveFilters && (
                <button
                  onClick={onResetFilters}
                  title="Reset filters"
                  className="ml-1 text-slate-400 hover:text-cyan-400 transition"
                >
                  <RefreshCw className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* AI Risk Alert Badge */}
            {aiRiskCount > 0 && (
              <button
                onClick={onOpenRawData}
                className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 hover:bg-rose-500/25 transition text-xs font-medium"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span>{aiRiskCount} AI Risk Flags</span>
              </button>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={onOpenUpload}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition"
              title="Upload custom patient feedback CSV or JSON"
            >
              <Upload className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Upload Feedback Data</span>
              <span className="sm:hidden">Upload</span>
            </button>

            <button
              onClick={onOpenPresentation}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition"
              title="Enter Fullscreen Presentation Mode for C-Suite Board Meetings"
            >
              <Presentation className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Executive Deck</span>
              <span className="sm:hidden">Deck</span>
            </button>

            <button
              onClick={onOpenAIConsultant}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-slate-950 font-semibold text-xs shadow-md shadow-cyan-500/20 transition active:scale-95"
            >
              <Bot className="w-3.5 h-3.5 text-slate-950" />
              <span>Ask AI Agent</span>
              <Sparkles className="w-3 h-3 text-slate-900" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
