import React, { useState } from 'react';
import {
  FileText,
  Search,
  X,
  Star,
  Clock,
  ShieldAlert,
  CheckCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { PatientFeedbackRecord } from '../types/healthcare';

interface PatientFeedbackModalProps {
  records: PatientFeedbackRecord[];
  onClose: () => void;
  onReviewRecord?: (id: string) => void;
}

export const PatientFeedbackModal: React.FC<PatientFeedbackModalProps> = ({
  records,
  onClose,
  onReviewRecord,
}) => {
  const [search, setSearch] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<PatientFeedbackRecord | null>(records[0] || null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const filtered = records.filter((r) => {
    if (!search) return true;
    const term = search.toLowerCase();
    return (
      r.id.toLowerCase().includes(term) ||
      r.comment.toLowerCase().includes(term) ||
      r.serviceLine.toLowerCase().includes(term) ||
      r.patientPersona.toLowerCase().includes(term) ||
      r.keywords.some((k) => k.toLowerCase().includes(term))
    );
  });

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-6xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Verbatim Patient Feedback Records Explorer
              </h2>
              <p className="text-xs text-slate-400">
                Browsing {filtered.length} matching encounters • Full clinical transcripts & sentiment tags
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="px-6 py-3 border-b border-slate-800/80 flex items-center space-x-3 bg-slate-900/50">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by ID, keyword, patient statement, or service line..."
              className="w-full pl-9 pr-4 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <span className="text-xs text-slate-400">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        {/* Content: Split List and Detail View */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          {/* Records Table / List (7 cols) */}
          <div className="md:col-span-7 border-r border-slate-800 overflow-y-auto p-4 space-y-2">
            {paginated.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                No patient feedback comments match the search filter.
              </div>
            ) : (
              paginated.map((r) => {
                const isSelected = selectedRecord?.id === r.id;

                return (
                  <div
                    key={r.id}
                    onClick={() => setSelectedRecord(r)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-cyan-950/30 border-cyan-500/60 shadow-md ring-1 ring-cyan-500/20'
                        : 'bg-slate-950/50 border-slate-800/80 hover:bg-slate-850 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-slate-200">{r.id}</span>
                        <span className="px-2 py-0.2 rounded text-[10px] bg-slate-800 text-slate-300">
                          {r.serviceLine}
                        </span>
                        <span className="text-[10px] text-slate-500">{r.date}</span>
                      </div>

                      <div className="flex items-center space-x-1.5">
                        <span
                          className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                            r.sentiment === 'Positive'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : r.sentiment === 'Negative'
                              ? 'bg-rose-500/20 text-rose-300'
                              : 'bg-amber-500/20 text-amber-300'
                          }`}
                        >
                          {r.sentiment}
                        </span>
                        <span className="font-bold text-white flex items-center">
                          {r.satisfactionScore}★
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-300 line-clamp-2 leading-relaxed italic mb-1.5">
                      "{r.comment}"
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className="truncate max-w-[200px]">{r.patientPersona}</span>
                      {r.aiRiskCategory !== 'None' && (
                        <span className="px-1.5 py-0.2 rounded font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center space-x-1">
                          <ShieldAlert className="w-2.5 h-2.5 mr-0.5" />
                          <span>{r.aiRiskCategory}</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-3 text-xs text-slate-400">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 transition flex items-center space-x-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 transition flex items-center space-x-1"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Full Detail Inspection (5 cols) */}
          <div className="md:col-span-5 p-5 overflow-y-auto bg-slate-950/80 flex flex-col justify-between">
            {selectedRecord ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                      Encounter Dossier
                    </span>
                    <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                      <span>{selectedRecord.id}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-cyan-400">{selectedRecord.serviceLine}</span>
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400">{selectedRecord.date}</span>
                </div>

                {/* Patient Verbatim Statement */}
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Verbatim Patient Statement
                  </h4>
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 leading-relaxed italic">
                    "{selectedRecord.comment}"
                  </div>
                </div>

                {/* Quantitative Ratings */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="text-[10px] text-slate-400">Satisfaction Score</span>
                    <div className="font-bold text-base text-white">
                      {selectedRecord.satisfactionScore} / 5.0
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="text-[10px] text-slate-400">Communication Rating</span>
                    <div className="font-bold text-base text-cyan-400">
                      {selectedRecord.communicationRating} / 5.0
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="text-[10px] text-slate-400">Recorded Wait Time</span>
                    <div className="font-bold text-base text-slate-200">
                      {selectedRecord.waitTimeMinutes} minutes
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="text-[10px] text-slate-400">Follow-Up Compliant</span>
                    <div className="font-bold text-base text-emerald-400">
                      {selectedRecord.followUpCompliance ? 'Yes (Verified)' : 'No (Loop Open)'}
                    </div>
                  </div>
                </div>

                {/* NLP Themes & Keywords */}
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Extracted NLP Themes
                  </span>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {selectedRecord.nlpThemes.map((th) => (
                      <span
                        key={th}
                        className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-200 border border-slate-700"
                      >
                        {th}
                      </span>
                    ))}
                  </div>

                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Key Extracted Terms
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {selectedRecord.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="px-2 py-0.5 rounded text-[10px] bg-cyan-950/40 text-cyan-300 border border-cyan-800/40"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AI Risk & Clinical Review Flag */}
                {selectedRecord.aiRiskCategory !== 'None' && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs">
                    <div className="flex items-center space-x-1.5 text-rose-300 font-bold mb-1">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>{selectedRecord.aiRiskCategory}</span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {selectedRecord.aiRiskDescription}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-20 text-slate-500 text-xs">
                Select an encounter from the left to inspect its clinical profile.
              </div>
            )}

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
              >
                Close Explorer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
