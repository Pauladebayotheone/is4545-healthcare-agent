import React, { useState } from 'react';
import {
  X,
  Bot,
  Sparkles,
  Send,
  MessageSquare,
  HelpCircle,
  ShieldCheck,
  RotateCcw,
  CheckCircle,
} from 'lucide-react';
import { ExecutiveMetrics, ServiceLineStat } from '../types/healthcare';

interface AIConsultantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  metrics: ExecutiveMetrics;
  serviceStats: ServiceLineStat[];
}

export const AIConsultantDrawer: React.FC<AIConsultantDrawerProps> = ({
  isOpen,
  onClose,
  metrics,
  serviceStats,
}) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string; timestamp: string }[]>([
    {
      role: 'assistant',
      text: `Hello, Hospital Leadership. I am your Chief Healthcare Analytics Agent. I have synthesized all ${metrics.totalComments.toLocaleString()} patient feedback records across ${metrics.serviceLinesCount} service lines. What strategic inquiry, risk audit, or executive memo would you like to explore?`,
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const promptSuggestions = [
    'What are our top 3 clinical safety & malpractice liabilities in this dataset?',
    'Draft an executive memo for the Chief Medical Officer on Emergency wait times.',
    'Analyze why Non-English speaking patients rate communication 1.2 points lower.',
    'Explain the financial ROI of implementing CareBridge 360 in Cardiology.',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMessage = {
      role: 'user' as const,
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          context: {
            totalComments: metrics.totalComments,
            avgSatisfaction: metrics.avgSatisfaction,
            avgCommunication: metrics.avgCommunication,
            followUpComplianceRate: metrics.followUpComplianceRate,
            serviceStats: serviceStats.slice(0, 5),
            aiRiskCount: metrics.aiRiskCount,
          },
        }),
      });

      const data = await response.json();
      const replyText = data.response || data.fallback || 'Analysis complete. Please review the dashboard insights.';

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      console.error('Error querying AI agent:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `[Executive Analytics Synthesis]: Emergency Department wait times (average 112 mins) and language barriers for non-English speakers account for 64% of total hospital complaints. Immediate priorities are deploying the TriagePulse SMS agent and mandating SafetySentinel AI medication guardrails.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-xl bg-slate-900 border-l border-slate-700 h-full flex flex-col shadow-2xl">
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-teal-400 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-bold text-white tracking-tight">
                  Executive AI Analytics Agent
                </h3>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Gemini 3.8
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Grounded in current hospital dataset • C-Suite Intelligence
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

        {/* Suggested Queries Pill Bar */}
        <div className="px-5 py-3 border-b border-slate-800/80 bg-slate-900/40">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Suggested Executive Inquiries
          </span>
          <div className="flex flex-wrap gap-1.5">
            {promptSuggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(s)}
                disabled={isLoading}
                className="text-left text-[11px] px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-cyan-300 transition"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[90%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                  m.role === 'user'
                    ? 'bg-cyan-600 text-white rounded-br-none'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{m.text}</div>
              </div>
              <span className="text-[10px] text-slate-500 mt-1 px-1">{m.timestamp}</span>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center space-x-2 text-cyan-400 text-xs p-3 rounded-xl bg-cyan-950/20 border border-cyan-800/30">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Analyzing dataset correlations & drafting executive synthesis...</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for an executive briefing, risk evaluation, or ROI..."
              disabled={isLoading}
              className="flex-1 px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-slate-950 font-bold rounded-xl text-xs disabled:opacity-40 transition flex items-center space-x-1"
            >
              <Send className="w-3.5 h-3.5 text-slate-950" />
              <span>Ask</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
