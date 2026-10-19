import React, { useState } from 'react';
import {
  ShieldAlert,
  BrainCircuit,
  Scale,
  UserCheck,
  AlertOctagon,
  CheckCircle,
  ExternalLink,
  ChevronDown,
  Filter,
} from 'lucide-react';
import { PatientFeedbackRecord, AIRiskCategory } from '../types/healthcare';
import { calculateAIRisks } from '../utils/analytics';

interface AIRiskMonitoringProps {
  records: PatientFeedbackRecord[];
  onReviewRecord?: (recordId: string) => void;
}

export const AIRiskMonitoring: React.FC<AIRiskMonitoringProps> = ({
  records,
  onReviewRecord,
}) => {
  const { hallucinationTraps, biasRelated, humanReviewCases } = calculateAIRisks(records);
  const [activeTab, setActiveTab] = useState<'hallucination' | 'bias' | 'humanReview'>('hallucination');
  const [reviewedMap, setReviewedMap] = useState<Record<string, boolean>>({});

  const handleToggleReview = (id: string) => {
    setReviewedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    onReviewRecord?.(id);
  };

  return (
    <section id="section-airisk" className="scroll-mt-32 mb-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              Section 7
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Governance & Clinical Liability</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            AI Risk Monitoring & Algorithmic Safety Audit
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Surveillance of patient comments exposing LLM hallucination traps, clinical bias in triage heuristics, and critical safety incidents requiring mandatory human-in-the-loop review.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
            <ShieldAlert className="w-3.5 h-3.5 mr-1 text-rose-400" />
            Active Clinical Surveillance
          </span>
        </div>
      </div>

      {/* 3 Risk Pillar KPI Counters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => setActiveTab('hallucination')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeTab === 'hallucination'
              ? 'bg-rose-500/15 border-rose-500/50 shadow-lg shadow-rose-500/10'
              : 'bg-slate-900/80 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-rose-300 uppercase tracking-wider">Hallucination Traps</span>
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
              <BrainCircuit className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">
            {hallucinationTraps.length} Flagged
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Conflicting drug dosage & automated chart contradictions.
          </p>
        </button>

        <button
          onClick={() => setActiveTab('bias')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeTab === 'bias'
              ? 'bg-amber-500/15 border-amber-500/50 shadow-lg shadow-amber-500/10'
              : 'bg-slate-900/80 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Bias & Inequity Flags</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Scale className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">
            {biasRelated.length} Incidents
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Triage prioritization skew, ageism, and insurance disparity.
          </p>
        </button>

        <button
          onClick={() => setActiveTab('humanReview')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeTab === 'humanReview'
              ? 'bg-cyan-500/15 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
              : 'bg-slate-900/80 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Human Review Queue</span>
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">
            {humanReviewCases.length} Critical
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Immediate patient safety events & acute clinical deteriorations.
          </p>
        </button>
      </div>

      {/* Detail Cards List */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg">
        {/* TAB 1: Hallucination Traps */}
        {activeTab === 'hallucination' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <BrainCircuit className="w-4 h-4 text-rose-400" />
                  <span>Hallucination Trap Incidents ({hallucinationTraps.length})</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Occurs when patients consult commercial consumer AI tools or when hospital auto-generated EHR notes produce medically contradictory advice.
                </p>
              </div>
            </div>

            <div className="space-y-3.5">
              {hallucinationTraps.map((record) => {
                const isReviewed = reviewedMap[record.id] || record.humanReviewed;

                return (
                  <div
                    key={record.id}
                    className="p-4 rounded-xl bg-slate-950/70 border border-rose-500/30 hover:border-rose-500/50 transition"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-rose-400">{record.id}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300">
                          {record.serviceLine}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300">
                          {record.patientPersona}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleToggleReview(record.id)}
                          className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                            isReviewed
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30'
                          }`}
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>{isReviewed ? 'Reviewed & Guarded' : 'Mark as Reviewed'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Patient Comment */}
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800/80 mb-2">
                      <p className="text-xs text-slate-200 leading-relaxed italic">
                        "{record.comment}"
                      </p>
                    </div>

                    {/* Clinical Rationale & Guardrail Recommendation */}
                    <div className="text-[11px] space-y-1">
                      <div className="text-rose-300">
                        <strong className="text-rose-400">Clinical Hazard: </strong>
                        {record.aiRiskDescription}
                      </div>
                      <div className="text-cyan-300">
                        <strong className="text-cyan-400">Required Guardrail: </strong>
                        Mandate <strong>SafetySentinel</strong> interceptor to block automated EHR note generation without physician sign-off.
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: Bias-Related Comments */}
        {activeTab === 'bias' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Scale className="w-4 h-4 text-amber-400" />
                  <span>Algorithmic & Heuristic Bias Comments ({biasRelated.length})</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Identifies structural or algorithmic bias patterns across triage heuristics, pain management, and language discrimination.
                </p>
              </div>
            </div>

            <div className="space-y-3.5">
              {biasRelated.map((record) => {
                const isReviewed = reviewedMap[record.id] || record.humanReviewed;

                return (
                  <div
                    key={record.id}
                    className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/30 hover:border-amber-500/50 transition"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-amber-400">{record.id}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300">
                          {record.serviceLine}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                          {record.patientPersona}
                        </span>
                      </div>

                      <button
                        onClick={() => handleToggleReview(record.id)}
                        className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                          isReviewed
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30'
                        }`}
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>{isReviewed ? 'Reviewed by Quality Board' : 'Escalate to Quality Board'}</span>
                      </button>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800/80 mb-2">
                      <p className="text-xs text-slate-200 leading-relaxed italic">
                        "{record.comment}"
                      </p>
                    </div>

                    <div className="text-[11px] space-y-1">
                      <div className="text-amber-300">
                        <strong className="text-amber-400">Equity Bias Finding: </strong>
                        {record.aiRiskDescription || 'Implicit heuristic bias impacting care prioritization.'}
                      </div>
                      <div className="text-indigo-300">
                        <strong className="text-indigo-400">Remediation Action: </strong>
                        Audit triage scoring weights for chronic pain conditions; deploy accredited <strong>LinguaCare</strong> interpreters for all non-English intake consents.
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: Cases Requiring Human Review */}
        {activeTab === 'humanReview' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <UserCheck className="w-4 h-4 text-cyan-400" />
                  <span>Cases Requiring Immediate Human Review ({humanReviewCases.length})</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  High-liability medical alerts, delayed surgical complications, and acute adverse events requiring Risk Management notification.
                </p>
              </div>
            </div>

            <div className="space-y-3.5">
              {humanReviewCases.map((record) => {
                const isReviewed = reviewedMap[record.id] || record.humanReviewed;

                return (
                  <div
                    key={record.id}
                    className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/30 hover:border-cyan-500/50 transition"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-cyan-400">{record.id}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          Critical Safety Alert
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300">
                          {record.serviceLine}
                        </span>
                      </div>

                      <button
                        onClick={() => handleToggleReview(record.id)}
                        className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                          isReviewed
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30'
                        }`}
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>{isReviewed ? 'Case Closed & Logged' : 'Acknowledge & Escalate'}</span>
                      </button>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800/80 mb-2">
                      <p className="text-xs text-slate-200 leading-relaxed italic">
                        "{record.comment}"
                      </p>
                    </div>

                    <div className="text-[11px] space-y-1">
                      <div className="text-rose-300">
                        <strong className="text-rose-400">Risk Assessment: </strong>
                        {record.aiRiskDescription || 'High severity patient grievance posing acute medical malpractice or adverse outcome risk.'}
                      </div>
                      <div className="text-slate-400">
                        Status: <strong className="text-white">{isReviewed ? 'Action Logged by Chief Medical Officer' : 'Pending Formal Clinical Review'}</strong>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
