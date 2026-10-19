import React, { useState } from 'react';
import {
  AlertTriangle,
  Clock,
  WifiOff,
  CalendarX,
  PhoneMissed,
  ArrowRight,
  TrendingDown,
  Layers,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { PatientFeedbackRecord } from '../types/healthcare';
import { calculateOrganizationalProblems } from '../utils/analytics';

interface HiddenProblemsProps {
  records: PatientFeedbackRecord[];
  onDrillDown?: (filterType: string, val: string) => void;
}

export const HiddenProblems: React.FC<HiddenProblemsProps> = ({
  records,
  onDrillDown,
}) => {
  const problems = calculateOrganizationalProblems(records);
  const [activeCategory, setActiveCategory] = useState<'serviceLines' | 'communication' | 'technology' | 'scheduling' | 'waitTime'>('serviceLines');

  return (
    <section id="section-bottlenecks" className="scroll-mt-32 mb-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              Section 4
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Operational Friction Discovery</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Hidden Organizational Problems & Systemic Bottlenecks
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Algorithmic detection of service line friction hotspots, communication handoff breakdowns, EHR/portal tech failures, scheduling latency, and emergency wait-time deterioration.
          </p>
        </div>
      </div>

      {/* 5 Problem Category Selector Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        <button
          onClick={() => setActiveCategory('serviceLines')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            activeCategory === 'serviceLines'
              ? 'bg-rose-500/15 border-rose-500/50 shadow-md shadow-rose-500/10'
              : 'bg-slate-900/80 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-slate-400">1. High Complaint Lines</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-xl font-extrabold text-white">
            {problems.highComplaintServiceLines.length} Hotspots
          </div>
          <div className="text-[10px] text-rose-400 font-medium mt-1 truncate">
            Emergency & Orthopedics
          </div>
        </button>

        <button
          onClick={() => setActiveCategory('communication')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            activeCategory === 'communication'
              ? 'bg-amber-500/15 border-amber-500/50 shadow-md shadow-amber-500/10'
              : 'bg-slate-900/80 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-slate-400">2. Communication Gaps</span>
            <PhoneMissed className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-extrabold text-white">
            {problems.commBreakdownsTotal} Cases
          </div>
          <div className="text-[10px] text-amber-400 font-medium mt-1 truncate">
            Shift Handoff & Discharge
          </div>
        </button>

        <button
          onClick={() => setActiveCategory('technology')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            activeCategory === 'technology'
              ? 'bg-cyan-500/15 border-cyan-500/50 shadow-md shadow-cyan-500/10'
              : 'bg-slate-900/80 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-slate-400">3. Tech & Portal Issues</span>
            <WifiOff className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-xl font-extrabold text-white">
            {problems.techIssuesTotal} Reports
          </div>
          <div className="text-[10px] text-cyan-400 font-medium mt-1 truncate">
            2FA Lockouts & Kiosk Drops
          </div>
        </button>

        <button
          onClick={() => setActiveCategory('scheduling')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            activeCategory === 'scheduling'
              ? 'bg-purple-500/15 border-purple-500/50 shadow-md shadow-purple-500/10'
              : 'bg-slate-900/80 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-slate-400">4. Scheduling Delays</span>
            <CalendarX className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-xl font-extrabold text-white">
            {problems.schedIssuesTotal} Complaints
          </div>
          <div className="text-[10px] text-purple-400 font-medium mt-1 truncate">
            Specialist 45-78 Day Backlog
          </div>
        </button>

        <button
          onClick={() => setActiveCategory('waitTime')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            activeCategory === 'waitTime'
              ? 'bg-rose-500/15 border-rose-500/50 shadow-md shadow-rose-500/10'
              : 'bg-slate-900/80 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-slate-400">5. Wait-Time Decay</span>
            <Clock className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-xl font-extrabold text-white">
            -2.8★ Drop
          </div>
          <div className="text-[10px] text-rose-400 font-medium mt-1 truncate">
            Correlated with Duration
          </div>
        </button>
      </div>

      {/* Main Focus Panel based on Active Category */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg">
        {/* 1. Service Lines with High Complaint Rates */}
        {activeCategory === 'serviceLines' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Service Lines with Unusually High Complaint Rates (&gt;20%)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Identifies clinical departments where negative reviews diverge sharply from enterprise benchmarks.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {problems.highComplaintServiceLines.map((sl) => (
                <div
                  key={sl.serviceLine}
                  className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-rose-500/40 transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-white">{sl.serviceLine}</span>
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {sl.complaintRate}% Negative
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-300 mb-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Avg Satisfaction:</span>
                      <strong className="text-rose-400">{sl.avgSatisfaction} / 5.0</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Communication Score:</span>
                      <strong className="text-amber-400">{sl.avgCommunication} / 5.0</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Average Wait Time:</span>
                      <strong className="text-white">{sl.avgWaitTime} minutes</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Follow-up Compliance:</span>
                      <strong className="text-slate-200">{sl.followUpRate}%</strong>
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-slate-800 text-[11px] text-slate-400">
                    <span className="text-rose-300 font-semibold">Primary Driver: </span>
                    {sl.serviceLine === 'Emergency'
                      ? 'Severe triage wait times and lack of status transparency.'
                      : sl.serviceLine === 'Orthopedics'
                      ? 'Post-op clinic overbooking and parking elevator accessibility.'
                      : 'Specialist referral scheduling delays.'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Communication Bottlenecks */}
        {activeCategory === 'communication' && (
          <div>
            <div className="mb-4">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <PhoneMissed className="w-4 h-4 text-amber-400" />
                <span>Identified Communication Bottlenecks Breakdown</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Frequency breakdown of verbal and clinical communication gaps identified via NLP keyword association.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                {Object.entries(problems.commSubcategories).map(([category, count]) => {
                  const pct = Math.round((count / (problems.commBreakdownsTotal || 1)) * 100);
                  return (
                    <div key={category} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-semibold text-slate-200">{category}</span>
                        <span className="font-bold text-amber-400">{count} occurrences ({pct}%)</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-400 h-full rounded-full transition-all duration-300"
                          style={{ width: `${Math.max(4, pct)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Qualitative Bottleneck Memo */}
              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-slate-300 space-y-3">
                <div className="font-bold text-amber-300 text-sm flex items-center space-x-1.5">
                  <Layers className="w-4 h-4" />
                  <span>Clinical Handoff Risk Summary</span>
                </div>
                <p className="leading-relaxed">
                  <strong>Shift Change Divergence:</strong> Day nurses clearing patients for discharge while evening nursing teams require ongoing observation without updated EHR orders accounts for <strong>{problems.commSubcategories['Shift Change Handoff Gaps']} recorded incidents</strong>.
                </p>
                <p className="leading-relaxed">
                  <strong>Post-Discharge Medication Ambiguity:</strong> Patients discharged with changes to anticoagulants, beta-blockers, or antibiotics report contradictory verbal vs paperwork instructions, triggering acute emergency department readmissions.
                </p>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-cyan-300 font-medium">
                  💡 Recommended Solution: Deploy <strong>CareBridge 360</strong> autonomous post-discharge companion agent to perform 48-hour 3-way medication reconciliation.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Technology-Related Issues */}
        {activeCategory === 'technology' && (
          <div>
            <div className="mb-4">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <WifiOff className="w-4 h-4 text-cyan-400" />
                <span>Technology & Patient Portal Friction Points</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Digital health friction contributing to patient frustration, missed appointments, and support ticket surges.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                {Object.entries(problems.techCategories).map(([category, count]) => {
                  const pct = Math.round((count / (problems.techIssuesTotal || 1)) * 100);
                  return (
                    <div key={category} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-semibold text-slate-200">{category}</span>
                        <span className="font-bold text-cyan-400">{count} reports ({pct}%)</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-cyan-400 h-full rounded-full transition-all duration-300"
                          style={{ width: `${Math.max(4, pct)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Technology Actionable Insight */}
              <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-xs text-slate-300 space-y-3">
                <div className="font-bold text-cyan-300 text-sm">
                  Root Cause: Geriatric 2FA Hurdles & Unfiltered Lab Releases
                </div>
                <p className="leading-relaxed">
                  <strong>Two-Factor Authentication Latency:</strong> 2FA SMS codes arriving 15–20 minutes late lock out patients attempting to connect to scheduled video visits, primarily impacting patients age 65+.
                </p>
                <p className="leading-relaxed">
                  <strong>Unfiltered Pathology Portal Uploads:</strong> Automatic EHR upload of biopsy results confirming malignancies over weekends prior to physician counseling causes acute emotional distress and panic.
                </p>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-teal-300 font-medium">
                  💡 Recommended Solution: Deploy <strong>OmniAccess</strong> voice-guided portal assistant and introduce clinician pre-release hold windows on high-acuity pathology results.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. Scheduling-Related Issues */}
        {activeCategory === 'scheduling' && (
          <div>
            <div className="mb-4">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <CalendarX className="w-4 h-4 text-purple-400" />
                <span>Scheduling Latency & Specialist Backlogs</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Appointment access bottlenecks driving care delays and out-of-network patient leakage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                {Object.entries(problems.schedCategories).map(([category, count]) => {
                  const pct = Math.round((count / (problems.schedIssuesTotal || 1)) * 100);
                  return (
                    <div key={category} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-semibold text-slate-200">{category}</span>
                        <span className="font-bold text-purple-400">{count} complaints ({pct}%)</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-purple-400 h-full rounded-full transition-all duration-300"
                          style={{ width: `${Math.max(4, pct)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20 text-xs text-slate-300 space-y-3">
                <div className="font-bold text-purple-300 text-sm">
                  Clinical Consequence: High Acuity Specialist Wait
                </div>
                <p className="leading-relaxed">
                  Neurology post-stroke consultation backlogs reaching <strong>78 days</strong> present severe patient safety anxiety and elevated recurrent vascular risk.
                </p>
                <p className="leading-relaxed">
                  Clinic overbooking cancellations communicated via automated SMS only hours before appointments disproportionately penalize rural patients driving 50+ miles.
                </p>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-purple-300 font-medium">
                  💡 Priority Action: Implement predictive appointment overbooking buffers and reserved urgent fast-track slots for post-event clinical referrals.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. Wait-Time Complaints & Severity Curve */}
        {activeCategory === 'waitTime' && (
          <div>
            <div className="mb-4">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Clock className="w-4 h-4 text-rose-400" />
                <span>Wait-Time Severity & Satisfaction Drop-off Curve</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Empirical correlation showing steep rating collapse as patient waiting room duration exceeds 45 minutes.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {problems.waitBuckets.map((bucket) => {
                  const isSevere = bucket.avgSat < 3.0;

                  return (
                    <div
                      key={bucket.range}
                      className={`p-3.5 rounded-xl border text-center transition ${
                        isSevere
                          ? 'bg-rose-500/10 border-rose-500/40 text-rose-200'
                          : 'bg-slate-950/60 border-slate-800 text-slate-200'
                      }`}
                    >
                      <div className="text-xs text-slate-400 font-semibold mb-1">{bucket.range}</div>
                      <div className="text-2xl font-extrabold text-white mb-1">
                        {bucket.avgSat}★
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {bucket.count} encounters
                      </div>
                      <div className="mt-2 text-[10px] font-bold">
                        {bucket.avgSat >= 4.0 ? (
                          <span className="text-emerald-400">High Satisfaction</span>
                        ) : bucket.avgSat >= 3.0 ? (
                          <span className="text-amber-400">Moderate Drag</span>
                        ) : (
                          <span className="text-rose-400">Severe Dissatisfaction</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                <div className="font-semibold text-white mb-1 flex items-center space-x-1.5">
                  <TrendingDown className="w-4 h-4 text-rose-400" />
                  <span>Executive Takeaway on Wait Times</span>
                </div>
                <p className="leading-relaxed">
                  Satisfaction remains high (<strong>4.6★</strong>) for wait times under 20 minutes, drops to <strong>3.7★</strong> between 45–90 minutes, and craters to <strong>1.8★</strong> beyond 180 minutes. The primary patient grievance is not solely the duration, but the <em>lack of transparency</em> regarding clinical progress.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
