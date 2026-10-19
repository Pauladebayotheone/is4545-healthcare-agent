import React from 'react';
import { Search, Filter, X, ShieldAlert } from 'lucide-react';
import {
  SERVICE_LINES,
  VISIT_TYPES,
  PATIENT_PERSONAS,
} from '../data/mockFeedbackData';
import { ServiceLine, VisitType, PatientPersona, SentimentType, AIRiskCategory } from '../types/healthcare';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedServiceLine: ServiceLine | 'ALL';
  onServiceLineChange: (val: ServiceLine | 'ALL') => void;
  selectedVisitType: VisitType | 'ALL';
  onVisitTypeChange: (val: VisitType | 'ALL') => void;
  selectedPersona: PatientPersona | 'ALL';
  onPersonaChange: (val: PatientPersona | 'ALL') => void;
  selectedSentiment: SentimentType | 'ALL';
  onSentimentChange: (val: SentimentType | 'ALL') => void;
  selectedRisk: AIRiskCategory | 'ALL';
  onRiskChange: (val: AIRiskCategory | 'ALL') => void;
  onReset: () => void;
  hasFilters: boolean;
  totalFiltered: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedServiceLine,
  onServiceLineChange,
  selectedVisitType,
  onVisitTypeChange,
  selectedPersona,
  onPersonaChange,
  selectedSentiment,
  onSentimentChange,
  selectedRisk,
  onRiskChange,
  onReset,
  hasFilters,
  totalFiltered,
}) => {
  return (
    <div className="bg-slate-900/60 border-b border-slate-800/80 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search comments, keywords, diagnoses, or notes..."
            className="w-full pl-9 pr-8 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter dropdowns */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center text-slate-400 space-x-1 mr-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium hidden sm:inline">Filters:</span>
          </div>

          {/* Service line */}
          <select
            value={selectedServiceLine}
            onChange={(e) => onServiceLineChange(e.target.value as ServiceLine | 'ALL')}
            className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">All Service Lines ({SERVICE_LINES.length})</option>
            {SERVICE_LINES.map((sl) => (
              <option key={sl} value={sl}>
                {sl}
              </option>
            ))}
          </select>

          {/* Visit Type */}
          <select
            value={selectedVisitType}
            onChange={(e) => onVisitTypeChange(e.target.value as VisitType | 'ALL')}
            className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">All Visit Types</option>
            {VISIT_TYPES.map((vt) => (
              <option key={vt} value={vt}>
                {vt}
              </option>
            ))}
          </select>

          {/* Patient Persona */}
          <select
            value={selectedPersona}
            onChange={(e) => onPersonaChange(e.target.value as PatientPersona | 'ALL')}
            className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 max-w-[150px] sm:max-w-none truncate"
          >
            <option value="ALL">All Personas</option>
            {PATIENT_PERSONAS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          {/* Sentiment */}
          <select
            value={selectedSentiment}
            onChange={(e) => onSentimentChange(e.target.value as SentimentType | 'ALL')}
            className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">All Sentiments</option>
            <option value="Positive">Positive Only</option>
            <option value="Neutral">Neutral Only</option>
            <option value="Negative">Negative Only</option>
          </select>

          {/* AI Risk Filter */}
          <select
            value={selectedRisk}
            onChange={(e) => onRiskChange(e.target.value as AIRiskCategory | 'ALL')}
            className={`border rounded-lg px-2.5 py-1.5 focus:outline-none ${
              selectedRisk !== 'ALL'
                ? 'bg-rose-950/40 border-rose-500/50 text-rose-300'
                : 'bg-slate-800 border-slate-700 text-slate-200'
            }`}
          >
            <option value="ALL">All AI Risk Categories</option>
            <option value="Hallucination Trap">Hallucination Trap Only</option>
            <option value="Care / Algorithmic Bias">Algorithmic Bias Only</option>
            <option value="Clinical Safety / Human Review">Urgent Human Review Only</option>
          </select>

          {/* Clear Filters */}
          {hasFilters && (
            <button
              onClick={onReset}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 transition font-medium"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear ({totalFiltered})</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
