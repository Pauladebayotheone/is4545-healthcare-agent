export type ServiceLine =
  | 'Emergency'
  | 'Cardiology'
  | 'Oncology'
  | 'Pediatrics'
  | 'Orthopedics'
  | 'Neurology'
  | 'Primary Care'
  | 'Women\'s Health'
  | 'Surgical Services';

export type VisitType =
  | 'Inpatient'
  | 'Outpatient Clinic'
  | 'Emergency Dept'
  | 'Telehealth'
  | 'Day Surgery';

export type PatientPersona =
  | 'Tech-Savvy Adult'
  | 'Geriatric Chronic Care'
  | 'Non-English Primary Speaker'
  | 'Pediatric Caregiver'
  | 'Rural / Long-Commute'
  | 'Medicaid / Vulnerable'
  | 'High-Acuity Surgical';

export type SentimentType = 'Positive' | 'Neutral' | 'Negative';

export type AIRiskCategory =
  | 'None'
  | 'Hallucination Trap'
  | 'Care / Algorithmic Bias'
  | 'Clinical Safety / Human Review';

export interface PatientFeedbackRecord {
  id: string;
  date: string;
  patientPersona: PatientPersona;
  serviceLine: ServiceLine;
  visitType: VisitType;
  satisfactionScore: number; // 1 - 5
  communicationRating: number; // 1 - 5
  followUpCompliance: boolean;
  waitTimeMinutes: number;
  comment: string;
  sentiment: SentimentType;
  nlpThemes: string[];
  keywords: string[];
  organizationalBottlenecks?: ('Wait-Time' | 'Communication Breakdown' | 'Scheduling Latency' | 'Technology / Portal Failure' | 'Staffing Shortage' | 'Facility Access')[];
  equityAccessibilityFlags?: ('Language Barrier' | 'Wheelchair / Physical' | 'Digital Health Literacy' | 'Transportation / Distance')[];
  aiRiskCategory: AIRiskCategory;
  aiRiskDescription?: string;
  needsHumanReview: boolean;
  humanReviewed?: boolean;
}

export interface ExecutiveMetrics {
  totalComments: number;
  avgSatisfaction: number;
  avgCommunication: number;
  followUpComplianceRate: number;
  serviceLinesCount: number;
  positivePct: number;
  neutralPct: number;
  negativePct: number;
  avgWaitTime: number;
  aiRiskCount: number;
  equityFlagsCount: number;
}

export interface ServiceLineStat {
  serviceLine: ServiceLine;
  count: number;
  avgSatisfaction: number;
  avgCommunication: number;
  complaintRate: number; // % negative
  avgWaitTime: number;
  followUpRate: number;
}

export interface VisitTypeStat {
  visitType: VisitType;
  count: number;
  avgSatisfaction: number;
  avgCommunication: number;
  negativePct: number;
}

export interface PersonaStat {
  persona: PatientPersona;
  count: number;
  avgSatisfaction: number;
  avgCommunication: number;
  disparityGap: number; // compared to overall average
  topConcern: string;
  equityIssuesCount: number;
}

export interface ThemeStat {
  theme: string;
  count: number;
  positiveCount: number;
  neutralCount: number;
  negativeCount: number;
  avgScore: number;
}

export interface KeywordStat {
  word: string;
  count: number;
  sentiment: SentimentType;
  primaryTheme: string;
}

export interface RecommendedAIAgent {
  id: string;
  name: string;
  acronym: string;
  purpose: string;
  targetBottlenecks: string[];
  serviceLineRelevance: string[];
  expectedImpact: {
    kpi: string;
    projectedImprovement: string;
    clinicalSafety: string;
    financialEstimate: string;
  };
  feasibilityScore: number; // 1 - 100
  timeToImplement: string;
  guardrails: string[];
  samplePatientQuery: string;
  simulatedAgentResponse: string;
}

export interface ExecutivePriority {
  id: number;
  rank: number;
  title: string;
  category: 'Clinical Safety' | 'Patient Experience' | 'Operations' | 'Health Equity' | 'Digital Health';
  serviceLine: string;
  evidence: string;
  actionPlan: string;
  expectedOutcome: string;
  timeframe: string;
  urgency: 'Immediate (Critical)' | 'High' | 'Strategic Medium';
}
