import React, { useState } from 'react';
import {
  Cpu,
  Bot,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  Play,
  RotateCcw,
  CheckCircle2,
  Clock,
  ArrowRight,
  Send,
} from 'lucide-react';
import { RECOMMENDED_AI_AGENTS } from '../data/mockFeedbackData';
import { RecommendedAIAgent } from '../types/healthcare';

export const AIAgentOpportunities: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<RecommendedAIAgent>(RECOMMENDED_AI_AGENTS[0]);
  const [testInput, setTestInput] = useState('');
  const [testConversation, setTestConversation] = useState<{ role: 'patient' | 'agent'; text: string }[]>([
    { role: 'patient', text: RECOMMENDED_AI_AGENTS[0].samplePatientQuery },
    { role: 'agent', text: RECOMMENDED_AI_AGENTS[0].simulatedAgentResponse },
  ]);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSelectAgent = (agent: RecommendedAIAgent) => {
    setSelectedAgent(agent);
    setTestConversation([
      { role: 'patient', text: agent.samplePatientQuery },
      { role: 'agent', text: agent.simulatedAgentResponse },
    ]);
    setTestInput('');
  };

  const handleRunSimulation = (customQuery?: string) => {
    const query = customQuery || testInput;
    if (!query.trim()) return;

    setTestConversation((prev) => [...prev, { role: 'patient', text: query }]);
    setTestInput('');
    setIsSimulating(true);

    setTimeout(() => {
      let reply = '';
      const lower = query.toLowerCase();

      if (selectedAgent.id === 'agent-carebridge') {
        reply = `[CareBridge 360 Response]: I've cross-referenced your medication profile in Epic. Your prescribing physician, Dr. Chen, confirmed this dosage. Remember to take it with water after breakfast. If you feel any dizziness or swelling, reply here and I will alert Nurse Sarah immediately.`;
      } else if (selectedAgent.id === 'agent-triagepulse') {
        reply = `[TriagePulse Live]: You are in Stage 3 of 4: "Awaiting Radiologist CT Read". Your expected review window is 20–35 minutes. If your pain level increases past 6/10, please press your bedside call bell or notify the triage desk.`;
      } else if (selectedAgent.id === 'agent-linguacare') {
        reply = `[LinguaCare Verified Medical Translation]: Se ha verificado su consulta con el vocabulario médico certificado. El Dr. Ramírez ha confirmado sus instrucciones de alta en español. No dude en consultar cualquier duda.`;
      } else if (selectedAgent.id === 'agent-safetysentinel') {
        reply = `[SafetySentinel Guardrail]: Verified against hospital clinical guidelines. No drug-drug interactions or conflicting operative guidelines detected. Verified by human clinical rules engine.`;
      } else if (selectedAgent.id === 'agent-omniaccess') {
        reply = `[OmniAccess Voice Navigator]: You're all set! I have activated one-touch telephone check-in for your visit with Dr. Washington. You do not need to enter any passwords or codes. Just answer your phone when it rings at 2:00 PM.`;
      } else {
        reply = `[LeadSignal Executive Alert]: Feedback pattern analyzed and mapped to Department Quality Index. Trending variance reported to Chief Experience Officer.`;
      }

      setTestConversation((prev) => [...prev, { role: 'agent', text: reply }]);
      setIsSimulating(false);
    }, 700);
  };

  return (
    <section id="section-agents" className="scroll-mt-32 mb-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Section 8
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Strategic Technology Roadmap</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            AI Agent Opportunities & Organizational Solutions
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Tailored autonomous healthcare AI agent architectures designed to remediate identified patient bottlenecks with verified clinical safety guardrails.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800">
            <Cpu className="w-3.5 h-3.5 mr-1 text-cyan-400" />
            6 Recommended Agent Systems
          </span>
        </div>
      </div>

      {/* Agents Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {RECOMMENDED_AI_AGENTS.map((agent) => {
          const isSelected = selectedAgent.id === agent.id;

          return (
            <div
              key={agent.id}
              onClick={() => handleSelectAgent(agent)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-slate-900 border-cyan-500 shadow-xl shadow-cyan-500/10 ring-1 ring-cyan-500/40'
                  : 'bg-slate-900/80 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="text-[10px] font-bold tracking-wider text-cyan-400 uppercase">
                    {agent.acronym}
                  </span>
                  <h3 className="text-sm font-bold text-white leading-tight mt-0.5">
                    {agent.name.split(':')[0]}
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 shrink-0">
                  {agent.timeToImplement}
                </span>
              </div>

              <p className="text-xs text-slate-300 line-clamp-2 mb-3 leading-relaxed">
                {agent.purpose}
              </p>

              {/* Target Bottlenecks Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {agent.targetBottlenecks.map((b) => (
                  <span
                    key={b}
                    className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-slate-950 text-slate-400 border border-slate-800"
                  >
                    {b}
                  </span>
                ))}
              </div>

              {/* Expected Impact Snapshot */}
              <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-bold flex items-center">
                  <DollarSign className="w-3.5 h-3.5 mr-0.5" />
                  {agent.expectedImpact.financialEstimate.split(' ')[0]} ROI
                </span>
                <span className="text-cyan-400 font-semibold flex items-center text-[11px]">
                  {isSelected ? 'Active Simulator' : 'Select to Test'} <ArrowRight className="w-3 h-3 ml-1" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep-Dive Agent Dossier & Interactive Simulator */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Comprehensive Agent Architecture & Impact (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Selected System Architecture
                </span>
                <span className="text-xs text-slate-400">Feasibility Index: <strong>{selectedAgent.feasibilityScore}/100</strong></span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight mt-1">
                {selectedAgent.name}
              </h3>
            </div>

            {/* Purpose */}
            <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                Clinical & Operational Purpose
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                {selectedAgent.purpose}
              </p>
            </div>

            {/* Expected Organizational Impact Cards */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Expected Organizational Impact
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                  <div className="text-[11px] font-semibold text-slate-400 mb-0.5">Primary Target KPI</div>
                  <div className="font-bold text-white">{selectedAgent.expectedImpact.kpi}</div>
                  <div className="text-emerald-400 font-medium text-[11px] mt-1">
                    {selectedAgent.expectedImpact.projectedImprovement}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                  <div className="text-[11px] font-semibold text-slate-400 mb-0.5">Estimated Financial Value</div>
                  <div className="font-bold text-emerald-400">{selectedAgent.expectedImpact.financialEstimate}</div>
                  <div className="text-slate-400 text-[11px] mt-1">
                    Via readmission reduction & operational efficiency
                  </div>
                </div>
              </div>
            </div>

            {/* Guardrails against Hallucination & Bias */}
            <div className="p-3.5 rounded-lg bg-rose-500/5 border border-rose-500/20">
              <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center space-x-1.5 mb-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                <span>Clinical Guardrails & Anti-Hallucination Enforcements</span>
              </h4>
              <ul className="space-y-1 text-xs text-slate-300">
                {selectedAgent.guardrails.map((g, i) => (
                  <li key={i} className="flex items-start space-x-1.5">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Live Interactive Agent Sandbox (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-slate-950/90 border border-slate-800 rounded-xl p-4">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-white">Interactive Agent Simulator</span>
                </div>
                <button
                  onClick={() => handleSelectAgent(selectedAgent)}
                  className="text-slate-400 hover:text-slate-200 text-xs flex items-center space-x-1"
                  title="Reset conversation"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-400 mb-3">
                Test how <strong>{selectedAgent.acronym}</strong> handles real-time patient interactions while upholding safety constraints.
              </p>

              {/* Chat Log */}
              <div className="space-y-2.5 max-h-[250px] overflow-y-auto pr-1">
                {testConversation.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-lg text-xs leading-relaxed ${
                      msg.role === 'patient'
                        ? 'bg-slate-850 text-slate-200 border border-slate-700 ml-4'
                        : 'bg-cyan-950/40 text-cyan-200 border border-cyan-800/60 mr-4'
                    }`}
                  >
                    <div className="text-[10px] font-bold mb-0.5 opacity-70 uppercase tracking-wider">
                      {msg.role === 'patient' ? 'Patient Inquiry' : `${selectedAgent.acronym} Response`}
                    </div>
                    {msg.text}
                  </div>
                ))}

                {isSimulating && (
                  <div className="p-2 rounded bg-cyan-950/20 text-cyan-300 text-xs italic flex items-center space-x-2">
                    <Sparkles className="w-3 h-3 animate-spin text-cyan-400" />
                    <span>Agent evaluating against clinical ontology...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Input Bar */}
            <div className="mt-4 pt-3 border-t border-slate-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleRunSimulation();
                }}
                className="flex items-center space-x-2"
              >
                <input
                  type="text"
                  value={testInput}
                  onChange={(e) => setTestInput(e.target.value)}
                  placeholder={`Ask ${selectedAgent.acronym} a scenario...`}
                  className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="submit"
                  disabled={!testInput.trim() || isSimulating}
                  className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center space-x-1 transition"
                >
                  <Send className="w-3 h-3" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
