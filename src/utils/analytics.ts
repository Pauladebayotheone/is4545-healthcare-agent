import {
  PatientFeedbackRecord,
  ExecutiveMetrics,
  ServiceLineStat,
  VisitTypeStat,
  PersonaStat,
  ThemeStat,
  KeywordStat,
  ServiceLine,
  VisitType,
  PatientPersona,
} from '../types/healthcare';

export function calculateExecutiveMetrics(records: PatientFeedbackRecord[]): ExecutiveMetrics {
  if (records.length === 0) {
    return {
      totalComments: 0,
      avgSatisfaction: 0,
      avgCommunication: 0,
      followUpComplianceRate: 0,
      serviceLinesCount: 0,
      positivePct: 0,
      neutralPct: 0,
      negativePct: 0,
      avgWaitTime: 0,
      aiRiskCount: 0,
      equityFlagsCount: 0,
    };
  }

  const total = records.length;
  const satSum = records.reduce((acc, r) => acc + r.satisfactionScore, 0);
  const commSum = records.reduce((acc, r) => acc + r.communicationRating, 0);
  const followUpCount = records.filter((r) => r.followUpCompliance).length;
  const uniqueServiceLines = new Set(records.map((r) => r.serviceLine)).size;

  const posCount = records.filter((r) => r.sentiment === 'Positive').length;
  const neuCount = records.filter((r) => r.sentiment === 'Neutral').length;
  const negCount = records.filter((r) => r.sentiment === 'Negative').length;

  const waitSum = records.reduce((acc, r) => acc + r.waitTimeMinutes, 0);
  const aiRiskCount = records.filter((r) => r.aiRiskCategory !== 'None').length;
  const equityFlagsCount = records.filter((r) => (r.equityAccessibilityFlags?.length || 0) > 0).length;

  return {
    totalComments: total,
    avgSatisfaction: Number((satSum / total).toFixed(2)),
    avgCommunication: Number((commSum / total).toFixed(2)),
    followUpComplianceRate: Number(((followUpCount / total) * 100).toFixed(1)),
    serviceLinesCount: uniqueServiceLines,
    positivePct: Number(((posCount / total) * 100).toFixed(1)),
    neutralPct: Number(((neuCount / total) * 100).toFixed(1)),
    negativePct: Number(((negCount / total) * 100).toFixed(1)),
    avgWaitTime: Math.round(waitSum / total),
    aiRiskCount,
    equityFlagsCount,
  };
}

export function calculateSatisfactionDistribution(records: PatientFeedbackRecord[]) {
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  records.forEach((r) => {
    const score = Math.max(1, Math.min(5, Math.round(r.satisfactionScore))) as 1 | 2 | 3 | 4 | 5;
    counts[score]++;
  });

  const total = records.length || 1;
  return [1, 2, 3, 4, 5].map((score) => ({
    stars: score,
    label: `${score} Star${score > 1 ? 's' : ''}`,
    count: counts[score as 1 | 2 | 3 | 4 | 5],
    percentage: Number(((counts[score as 1 | 2 | 3 | 4 | 5] / total) * 100).toFixed(1)),
  }));
}

export function calculateSatisfactionByServiceLine(records: PatientFeedbackRecord[]): ServiceLineStat[] {
  const map = new Map<ServiceLine, { sumSat: number; sumComm: number; sumWait: number; count: number; negCount: number; followUpCount: number }>();

  records.forEach((r) => {
    const existing = map.get(r.serviceLine) || { sumSat: 0, sumComm: 0, sumWait: 0, count: 0, negCount: 0, followUpCount: 0 };
    existing.sumSat += r.satisfactionScore;
    existing.sumComm += r.communicationRating;
    existing.sumWait += r.waitTimeMinutes;
    existing.count += 1;
    if (r.sentiment === 'Negative') existing.negCount += 1;
    if (r.followUpCompliance) existing.followUpCount += 1;
    map.set(r.serviceLine, existing);
  });

  const results: ServiceLineStat[] = [];
  map.forEach((val, serviceLine) => {
    results.push({
      serviceLine,
      count: val.count,
      avgSatisfaction: Number((val.sumSat / val.count).toFixed(2)),
      avgCommunication: Number((val.sumComm / val.count).toFixed(2)),
      complaintRate: Number(((val.negCount / val.count) * 100).toFixed(1)),
      avgWaitTime: Math.round(val.sumWait / val.count),
      followUpRate: Number(((val.followUpCount / val.count) * 100).toFixed(1)),
    });
  });

  return results.sort((a, b) => b.count - a.count);
}

export function calculateSatisfactionByVisitType(records: PatientFeedbackRecord[]): VisitTypeStat[] {
  const map = new Map<VisitType, { sumSat: number; sumComm: number; count: number; negCount: number }>();

  records.forEach((r) => {
    const existing = map.get(r.visitType) || { sumSat: 0, sumComm: 0, count: 0, negCount: 0 };
    existing.sumSat += r.satisfactionScore;
    existing.sumComm += r.communicationRating;
    existing.count += 1;
    if (r.sentiment === 'Negative') existing.negCount += 1;
    map.set(r.visitType, existing);
  });

  const results: VisitTypeStat[] = [];
  map.forEach((val, visitType) => {
    results.push({
      visitType,
      count: val.count,
      avgSatisfaction: Number((val.sumSat / val.count).toFixed(2)),
      avgCommunication: Number((val.sumComm / val.count).toFixed(2)),
      negativePct: Number(((val.negCount / val.count) * 100).toFixed(1)),
    });
  });

  return results.sort((a, b) => b.count - a.count);
}

export function calculateSatisfactionByPersona(records: PatientFeedbackRecord[], overallAvgSat: number): PersonaStat[] {
  const map = new Map<PatientPersona, { sumSat: number; sumComm: number; count: number; equityIssues: number }>();

  records.forEach((r) => {
    const existing = map.get(r.patientPersona) || { sumSat: 0, sumComm: 0, count: 0, equityIssues: 0 };
    existing.sumSat += r.satisfactionScore;
    existing.sumComm += r.communicationRating;
    existing.count += 1;
    if ((r.equityAccessibilityFlags?.length || 0) > 0) existing.equityIssues += 1;
    map.set(r.patientPersona, existing);
  });

  const topConcerns: Record<PatientPersona, string> = {
    'Tech-Savvy Adult': 'Portal navigation & digital self-service latency',
    'Geriatric Chronic Care': 'Shift change confusion & 2FA login friction',
    'Non-English Primary Speaker': 'Interpreter cart delay & untranslated discharge orders',
    'Pediatric Caregiver': 'ER pediatric triage wait times & rushed consults',
    'Rural / Long-Commute': 'Specialist appointment backlog & travel rescheduling',
    'Medicaid / Vulnerable': 'Implicit triage bias & pain medication stigma',
    'High-Acuity Surgical': 'Post-op clarity discrepancy & automated note conflicts',
  };

  const results: PersonaStat[] = [];
  map.forEach((val, persona) => {
    const avg = Number((val.sumSat / val.count).toFixed(2));
    results.push({
      persona,
      count: val.count,
      avgSatisfaction: avg,
      avgCommunication: Number((val.sumComm / val.count).toFixed(2)),
      disparityGap: Number((avg - overallAvgSat).toFixed(2)),
      topConcern: topConcerns[persona] || 'General care coordination',
      equityIssuesCount: val.equityIssues,
    });
  });

  return results.sort((a, b) => a.avgSatisfaction - b.avgSatisfaction);
}

export function calculateNLPThemes(records: PatientFeedbackRecord[]): ThemeStat[] {
  const map = new Map<string, { count: number; pos: number; neu: number; neg: number; sumScore: number }>();

  records.forEach((r) => {
    r.nlpThemes.forEach((theme) => {
      const existing = map.get(theme) || { count: 0, pos: 0, neu: 0, neg: 0, sumScore: 0 };
      existing.count += 1;
      existing.sumScore += r.satisfactionScore;
      if (r.sentiment === 'Positive') existing.pos += 1;
      else if (r.sentiment === 'Neutral') existing.neu += 1;
      else existing.neg += 1;
      map.set(theme, existing);
    });
  });

  const results: ThemeStat[] = [];
  map.forEach((val, theme) => {
    results.push({
      theme,
      count: val.count,
      positiveCount: val.pos,
      neutralCount: val.neu,
      negativeCount: val.neg,
      avgScore: Number((val.sumScore / val.count).toFixed(2)),
    });
  });

  return results.sort((a, b) => b.count - a.count);
}

export function calculateTopKeywords(records: PatientFeedbackRecord[]): KeywordStat[] {
  const map = new Map<string, { count: number; pos: number; neu: number; neg: number; themes: Map<string, number> }>();

  records.forEach((r) => {
    const primaryTheme = r.nlpThemes[0] || 'General';
    r.keywords.forEach((rawWord) => {
      const word = rawWord.trim().toLowerCase();
      if (word.length < 3) return;

      const existing = map.get(word) || { count: 0, pos: 0, neu: 0, neg: 0, themes: new Map<string, number>() };
      existing.count += 1;
      if (r.sentiment === 'Positive') existing.pos += 1;
      else if (r.sentiment === 'Neutral') existing.neu += 1;
      else existing.neg += 1;

      existing.themes.set(primaryTheme, (existing.themes.get(primaryTheme) || 0) + 1);
      map.set(word, existing);
    });
  });

  const results: KeywordStat[] = [];
  map.forEach((val, word) => {
    let dominantSentiment: 'Positive' | 'Neutral' | 'Negative' = 'Neutral';
    if (val.pos > val.neg && val.pos > val.neu) dominantSentiment = 'Positive';
    else if (val.neg > val.pos && val.neg > val.neu) dominantSentiment = 'Negative';

    // Find top theme for this keyword
    let topTheme = 'General';
    let maxThemeCount = 0;
    val.themes.forEach((thCount, thName) => {
      if (thCount > maxThemeCount) {
        maxThemeCount = thCount;
        topTheme = thName;
      }
    });

    results.push({
      word,
      count: val.count,
      sentiment: dominantSentiment,
      primaryTheme: topTheme,
    });
  });

  return results.sort((a, b) => b.count - a.count);
}

export function calculateOrganizationalProblems(records: PatientFeedbackRecord[]) {
  // 1. Service lines with high complaint rates (> 22%)
  const serviceStats = calculateSatisfactionByServiceLine(records);
  const highComplaintServiceLines = serviceStats
    .filter((s) => s.complaintRate >= 20)
    .sort((a, b) => b.complaintRate - a.complaintRate);

  // 2. Communication bottlenecks
  const commBreakdowns = records.filter(
    (r) => r.organizationalBottlenecks?.includes('Communication Breakdown') || r.communicationRating <= 2
  );
  const commSubcategories = {
    'Shift Change Handoff Gaps': 0,
    'Discharge Medication Unclarity': 0,
    'Physician Rushed / Low Eye Contact': 0,
    'Unanswered Nursing Pager / Helpline': 0,
    'Delayed Test Result Explanation': 0,
  };
  commBreakdowns.forEach((r) => {
    const text = (r.comment + ' ' + r.nlpThemes.join(' ')).toLowerCase();
    if (text.includes('shift') || text.includes('night nurse') || text.includes('handoff')) commSubcategories['Shift Change Handoff Gaps']++;
    else if (text.includes('discharge') || text.includes('medication') || text.includes('prescription')) commSubcategories['Discharge Medication Unclarity']++;
    else if (text.includes('rushed') || text.includes('eye contact') || text.includes('sit down') || text.includes('four minutes')) commSubcategories['Physician Rushed / Low Eye Contact']++;
    else if (text.includes('hold time') || text.includes('callback') || text.includes('pager') || text.includes('helpline')) commSubcategories['Unanswered Nursing Pager / Helpline']++;
    else commSubcategories['Delayed Test Result Explanation']++;
  });

  // 3. Technology-related issues
  const techIssues = records.filter(
    (r) => r.organizationalBottlenecks?.includes('Technology / Portal Failure') || r.nlpThemes.some(t => t.toLowerCase().includes('portal') || t.toLowerCase().includes('tech') || t.toLowerCase().includes('kiosk') || t.toLowerCase().includes('2fa'))
  );
  const techCategories = {
    'Patient Portal 2FA & Login Lockouts': 0,
    'Telehealth Audio/Video Drops': 0,
    'Automated SMS / Reminder Spam': 0,
    'Lobby Kiosk Check-In Failures': 0,
    'Confusing EHR Release of Raw Labs': 0,
  };
  techIssues.forEach((r) => {
    const text = (r.comment + ' ' + r.nlpThemes.join(' ')).toLowerCase();
    if (text.includes('two-factor') || text.includes('2fa') || text.includes('locked') || text.includes('password')) techCategories['Patient Portal 2FA & Login Lockouts']++;
    else if (text.includes('telehealth') || text.includes('video') || text.includes('wifi') || text.includes('dropped')) techCategories['Telehealth Audio/Video Drops']++;
    else if (text.includes('canceled text') || text.includes('spam') || text.includes('automated text')) techCategories['Automated SMS / Reminder Spam']++;
    else if (text.includes('kiosk') || text.includes('tablet') || text.includes('reception')) techCategories['Lobby Kiosk Check-In Failures']++;
    else techCategories['Confusing EHR Release of Raw Labs']++;
  });

  // 4. Scheduling-related issues
  const schedIssues = records.filter(
    (r) => r.organizationalBottlenecks?.includes('Scheduling Latency') || r.nlpThemes.some(t => t.toLowerCase().includes('schedul') || t.toLowerCase().includes('appointment') || t.toLowerCase().includes('rescheduled'))
  );
  const schedCategories = {
    'Specialist Backlog Exceeding 45 Days': 0,
    'Last-Minute Clinic Cancellation / Overbooking': 0,
    'Post-Op Follow-Up Scheduling Delays': 0,
    'Primary Care Routine Intake Delay': 0,
  };
  schedIssues.forEach((r) => {
    const text = (r.comment + ' ' + r.nlpThemes.join(' ')).toLowerCase();
    if (text.includes('78 days') || text.includes('specialist') || text.includes('backlog') || text.includes('dread')) schedCategories['Specialist Backlog Exceeding 45 Days']++;
    else if (text.includes('canceled') || text.includes('overbooking') || text.includes('highway')) schedCategories['Last-Minute Clinic Cancellation / Overbooking']++;
    else if (text.includes('post-op') || text.includes('surgery') || text.includes('follow-up')) schedCategories['Post-Op Follow-Up Scheduling Delays']++;
    else schedCategories['Primary Care Routine Intake Delay']++;
  });

  // 5. Wait-time complaints & wait brackets
  const waitBuckets = [
    { range: '< 20 mins', count: 0, avgSat: 0, satSum: 0 },
    { range: '20 - 45 mins', count: 0, avgSat: 0, satSum: 0 },
    { range: '45 - 90 mins', count: 0, avgSat: 0, satSum: 0 },
    { range: '90 - 180 mins', count: 0, avgSat: 0, satSum: 0 },
    { range: '> 180 mins', count: 0, avgSat: 0, satSum: 0 },
  ];

  records.forEach((r) => {
    let bucketIdx = 0;
    if (r.waitTimeMinutes <= 20) bucketIdx = 0;
    else if (r.waitTimeMinutes <= 45) bucketIdx = 1;
    else if (r.waitTimeMinutes <= 90) bucketIdx = 2;
    else if (r.waitTimeMinutes <= 180) bucketIdx = 3;
    else bucketIdx = 4;

    waitBuckets[bucketIdx].count++;
    waitBuckets[bucketIdx].satSum += r.satisfactionScore;
  });

  waitBuckets.forEach((b) => {
    b.avgSat = b.count > 0 ? Number((b.satSum / b.count).toFixed(2)) : 0;
  });

  return {
    highComplaintServiceLines,
    commBreakdownsTotal: commBreakdowns.length,
    commSubcategories,
    techIssuesTotal: techIssues.length,
    techCategories,
    schedIssuesTotal: schedIssues.length,
    schedCategories,
    waitBuckets,
  };
}

export function calculateEquityAndAccessibility(records: PatientFeedbackRecord[]) {
  const languageRecords = records.filter(
    (r) => r.patientPersona === 'Non-English Primary Speaker' || r.equityAccessibilityFlags?.includes('Language Barrier')
  );
  const physicalAccessRecords = records.filter(
    (r) => r.equityAccessibilityFlags?.includes('Wheelchair / Physical') || r.comment.toLowerCase().includes('elevator') || r.comment.toLowerCase().includes('ramp') || r.comment.toLowerCase().includes('parking')
  );
  const digitalLiteracyRecords = records.filter(
    (r) => r.equityAccessibilityFlags?.includes('Digital Health Literacy') || (r.patientPersona === 'Geriatric Chronic Care' && r.visitType === 'Telehealth')
  );
  const transportationRecords = records.filter(
    (r) => r.equityAccessibilityFlags?.includes('Transportation / Distance') || r.patientPersona === 'Rural / Long-Commute'
  );

  return {
    language: {
      total: languageRecords.length,
      avgSat: languageRecords.length ? Number((languageRecords.reduce((a, b) => a + b.satisfactionScore, 0) / languageRecords.length).toFixed(2)) : 0,
      avgComm: languageRecords.length ? Number((languageRecords.reduce((a, b) => a + b.communicationRating, 0) / languageRecords.length).toFixed(2)) : 0,
      keyFindings: [
        'Interpreter iPad video dropping during basement clinic appointments',
        'Discharge summaries handed over in English without verbal verification',
        'Lack of certified medical interpreters during off-hours emergency and labor triage'
      ]
    },
    physicalAccessibility: {
      total: physicalAccessRecords.length,
      avgSat: physicalAccessRecords.length ? Number((physicalAccessRecords.reduce((a, b) => a + b.satisfactionScore, 0) / physicalAccessRecords.length).toFixed(2)) : 0,
      keyFindings: [
        'Broken parking garage elevators on level 3 forcing patients up vehicle ramps',
        'Inaccessible high exam tables without electronic lowering mechanisms in outpatient clinics',
        'Confusing hospital wayfinding signs causing mobility-impaired patients to walk redundant distances'
      ]
    },
    digitalLiteracy: {
      total: digitalLiteracyRecords.length,
      avgSat: digitalLiteracyRecords.length ? Number((digitalLiteracyRecords.reduce((a, b) => a + b.satisfactionScore, 0) / digitalLiteracyRecords.length).toFixed(2)) : 0,
      keyFindings: [
        'Elderly patients locked out after SMS 2FA codes arrive with 20-minute latency',
        'Difficulty opening radiology images and multi-page PDF summaries on mobile browsers',
        'Lack of simple telephone bridge fallback when patient camera permissions fail'
      ]
    },
    transportation: {
      total: transportationRecords.length,
      avgSat: transportationRecords.length ? Number((transportationRecords.reduce((a, b) => a + b.satisfactionScore, 0) / transportationRecords.length).toFixed(2)) : 0,
      keyFindings: [
        'Patients traveling 50+ miles arriving to discover unnotified clinic overbooking cancellations',
        'Absence of transit-synchronized clinic scheduling for rural bus riders',
        'High parking garage costs creating financial strain for multi-day chemotherapy visits'
      ]
    }
  };
}

export function calculateAIRisks(records: PatientFeedbackRecord[]) {
  const hallucinationTraps = records.filter((r) => r.aiRiskCategory === 'Hallucination Trap');
  const biasRelated = records.filter((r) => r.aiRiskCategory === 'Care / Algorithmic Bias');
  const humanReviewCases = records.filter((r) => r.needsHumanReview || r.aiRiskCategory === 'Clinical Safety / Human Review');

  return {
    hallucinationTraps,
    biasRelated,
    humanReviewCases,
    totalRisks: hallucinationTraps.length + biasRelated.length + humanReviewCases.length,
  };
}
