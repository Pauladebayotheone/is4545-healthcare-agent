import React from 'react';
import {
  LayoutDashboard,
  SmilePlus,
  MessageSquareText,
  AlertTriangle,
  Scale,
  ShieldCheck,
  Cpu,
  Target,
  FileText,
} from 'lucide-react';

export type SectionId =
  | 'overview'
  | 'satisfaction'
  | 'nlp'
  | 'bottlenecks'
  | 'equity'
  | 'airisk'
  | 'agents'
  | 'recommendations'
  | 'records';

interface SectionNavProps {
  activeSection: SectionId;
  onSelectSection: (id: SectionId) => void;
  aiRiskCount: number;
}

export const SectionNav: React.FC<SectionNavProps> = ({
  activeSection,
  onSelectSection,
  aiRiskCount,
}) => {
  const sections = [
    { id: 'overview' as SectionId, label: '1. Executive Overview', icon: LayoutDashboard },
    { id: 'satisfaction' as SectionId, label: '2. Satisfaction Insights', icon: SmilePlus },
    { id: 'nlp' as SectionId, label: '3. NLP & Word Cloud', icon: MessageSquareText },
    { id: 'bottlenecks' as SectionId, label: '4. Hidden Bottlenecks', icon: AlertTriangle },
    { id: 'equity' as SectionId, label: '6. Equity & Accessibility', icon: Scale },
    { id: 'airisk' as SectionId, label: '7. AI Risk Monitoring', icon: ShieldCheck, badge: aiRiskCount },
    { id: 'agents' as SectionId, label: '8. AI Agent Opportunities', icon: Cpu },
    { id: 'recommendations' as SectionId, label: '9. Executive Priorities', icon: Target },
    { id: 'records' as SectionId, label: 'Patient Comments Explorer', icon: FileText },
  ];

  return (
    <nav className="bg-slate-900/90 backdrop-blur border-b border-slate-800 sticky top-16 z-30 overflow-x-auto scrollbar-none py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center space-x-1 sm:space-x-2 min-w-max">
        {sections.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => {
                onSelectSection(sec.id);
                const elem = document.getElementById(`section-${sec.id}`);
                if (elem) {
                  elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-transparent'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span>{sec.label}</span>
              {typeof sec.badge === 'number' && sec.badge > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {sec.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
