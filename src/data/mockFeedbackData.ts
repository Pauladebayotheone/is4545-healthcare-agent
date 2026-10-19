import {
  PatientFeedbackRecord,
  RecommendedAIAgent,
  ExecutivePriority,
  ServiceLine,
  VisitType,
  PatientPersona,
} from '../types/healthcare';

// Pre-crafted high-fidelity realistic clinical feedback records
const SEED_PATIENT_COMMENTS: Omit<PatientFeedbackRecord, 'id' | 'date'>[] = [
  // SECTION 7: Hallucination Trap Comments
  {
    patientPersona: 'Tech-Savvy Adult',
    serviceLine: 'Cardiology',
    visitType: 'Inpatient',
    satisfactionScore: 2,
    communicationRating: 2,
    followUpCompliance: false,
    waitTimeMinutes: 45,
    comment:
      'I ran my discharge summary through an AI health summary app on my phone, and it told me to increase my Metoprolol to 50mg twice daily, while the hospital paper packet said 25mg once daily. When I messaged the portal for clarification, an automated bot reply gave generic heart advice. This conflicting guidance is dangerous and terrifying for a heart patient.',
    sentiment: 'Negative',
    nlpThemes: ['Discharge Clarity', 'Medication Safety', 'AI Health Summary', 'Communication Breakdown'],
    keywords: ['AI app', 'Metoprolol', 'conflicting', 'discharge summary', 'dosage', 'dangerous'],
    organizationalBottlenecks: ['Communication Breakdown', 'Technology / Portal Failure'],
    equityAccessibilityFlags: ['Digital Health Literacy'],
    aiRiskCategory: 'Hallucination Trap',
    aiRiskDescription: 'Patient prompted third-party AI tool on discharge text yielding contradictory pharmacological dosage; automated hospital portal response failed to intercept.',
    needsHumanReview: true,
    humanReviewed: false,
  },
  {
    patientPersona: 'High-Acuity Surgical',
    serviceLine: 'Orthopedics',
    visitType: 'Day Surgery',
    satisfactionScore: 1,
    communicationRating: 1,
    followUpCompliance: false,
    waitTimeMinutes: 70,
    comment:
      'The automated portal post-op summary generated on my chart stated I was cleared for full weight-bearing sports within 14 days of rotator cuff anchor repair. However, in the recovery bay Dr. Reynolds explicitly warned me zero lifting above 45 degrees for 6 weeks. Had I followed the automated portal note, I would have torn my surgical anchors.',
    sentiment: 'Negative',
    nlpThemes: ['Post-Op Guidance', 'Clinical Discrepancy', 'Patient Safety', 'EHR Notes'],
    keywords: ['portal note', 'weight-bearing', 'rotator cuff', 'surgeon warning', 'anchors', 'contradiction'],
    organizationalBottlenecks: ['Technology / Portal Failure', 'Communication Breakdown'],
    aiRiskCategory: 'Hallucination Trap',
    aiRiskDescription: 'EHR automated note generator populated boilerplate physical therapy clearance contradicting specialized operative constraints.',
    needsHumanReview: true,
    humanReviewed: false,
  },
  {
    patientPersona: 'Geriatric Chronic Care',
    serviceLine: 'Oncology',
    visitType: 'Outpatient Clinic',
    satisfactionScore: 2,
    communicationRating: 2,
    followUpCompliance: true,
    waitTimeMinutes: 85,
    comment:
      'The clinic automated virtual assistant told me that mild neuropathy after chemotherapy is harmless and to soak my feet in hot water. My oncologist rushed in later shocked, saying hot water causes severe burns with chemo neuropathy. The AI advice could have caused third-degree burns on my numb feet.',
    sentiment: 'Negative',
    nlpThemes: ['Chemotherapy Safety', 'AI Advice Error', 'Symptom Management', 'Neuropathy'],
    keywords: ['virtual assistant', 'hot water', 'neuropathy', 'burns', 'oncologist shocked', 'unsafe advice'],
    organizationalBottlenecks: ['Technology / Portal Failure'],
    aiRiskCategory: 'Hallucination Trap',
    aiRiskDescription: 'Unsupervised conversational bot recommended contraindicated home remedy (heat application) for chemo-induced sensory neuropathy.',
    needsHumanReview: true,
    humanReviewed: false,
  },

  // SECTION 7: Bias-related Comments
  {
    patientPersona: 'Medicaid / Vulnerable',
    serviceLine: 'Emergency',
    visitType: 'Emergency Dept',
    satisfactionScore: 1,
    communicationRating: 1,
    followUpCompliance: false,
    waitTimeMinutes: 210,
    comment:
      'I came in during a severe sickle cell pain crisis. The triage nurse assumed I was drug-seeking, made dismissive remarks about frequent flyers, and left me agonizing in the waiting room for three and a half hours while two patients with minor wrist sprains who had private commercial insurance were called back first.',
    sentiment: 'Negative',
    nlpThemes: ['Pain Management Disparity', 'Staff Bias', 'Triage Inequity', 'Wait Times'],
    keywords: ['sickle cell', 'drug-seeking', 'dismissive', 'bias', 'insurance disparity', 'ignored'],
    organizationalBottlenecks: ['Wait-Time', 'Staffing Shortage'],
    equityAccessibilityFlags: ['Language Barrier', 'Transportation / Distance'],
    aiRiskCategory: 'Care / Algorithmic Bias',
    aiRiskDescription: 'Suspected triage algorithm and clinician heuristic bias deprioritizing vaso-occlusive pain crisis against lower-acuity commercial insurance presentations.',
    needsHumanReview: true,
    humanReviewed: false,
  },
  {
    patientPersona: 'Geriatric Chronic Care',
    serviceLine: 'Cardiology',
    visitType: 'Outpatient Clinic',
    satisfactionScore: 2,
    communicationRating: 1,
    followUpCompliance: true,
    waitTimeMinutes: 60,
    comment:
      'I am an 82-year-old retired physics teacher. The cardiology fellow spoke entirely to my son as if I was senile, barely made eye contact with me, and referred to my valve symptoms as "just normal aging" without reviewing my echocardiogram. I had to insist on speaking directly with the attending.',
    sentiment: 'Negative',
    nlpThemes: ['Ageism', 'Bedside Manner', 'Shared Decision Making', 'Doctor Communication'],
    keywords: ['ageism', 'ignored', 'fellow', 'eye contact', 'normal aging', 'disrespectful'],
    organizationalBottlenecks: ['Communication Breakdown'],
    equityAccessibilityFlags: ['Wheelchair / Physical'],
    aiRiskCategory: 'Care / Algorithmic Bias',
    aiRiskDescription: 'Age-based cognitive bias leading to failure to engage the patient directly in therapeutic decision-making.',
    needsHumanReview: false,
    humanReviewed: true,
  },
  {
    patientPersona: 'Non-English Primary Speaker',
    serviceLine: 'Women\'s Health',
    visitType: 'Inpatient',
    satisfactionScore: 2,
    communicationRating: 1,
    followUpCompliance: false,
    waitTimeMinutes: 40,
    comment:
      'During my labor induction, no Spanish interpreter was called despite me checking the box on admission. The staff kept using hand gestures and google translate on a phone, which translated "epidural" incorrectly. I felt frightened, powerless, and uninformed about the consent forms they made me sign.',
    sentiment: 'Negative',
    nlpThemes: ['Language Access', 'Informed Consent', 'Maternal Health', 'Translation Failure'],
    keywords: ['Spanish interpreter', 'google translate', 'consent form', 'frightened', 'gestures', 'labor induction'],
    organizationalBottlenecks: ['Communication Breakdown'],
    equityAccessibilityFlags: ['Language Barrier'],
    aiRiskCategory: 'Care / Algorithmic Bias',
    aiRiskDescription: 'Failure to furnish certified medical interpreter for obstetric informed consent; non-compliant ad-hoc translation.',
    needsHumanReview: true,
    humanReviewed: false,
  },

  // SECTION 7: Cases Requiring Urgent Human Review
  {
    patientPersona: 'High-Acuity Surgical',
    serviceLine: 'Surgical Services',
    visitType: 'Inpatient',
    satisfactionScore: 1,
    communicationRating: 1,
    followUpCompliance: false,
    waitTimeMinutes: 30,
    comment:
      'My father had colon resection on Tuesday. By Thursday morning his abdomen was rigid and he had a 103F fever. We pleaded with the floor nurse for 5 hours that something was leaking. The surgical team did not round until 6 PM. He had a septic anastomotic leak and had to be rushed back into emergency surgery.',
    sentiment: 'Negative',
    nlpThemes: ['Clinical Deterioration', 'Post-Op Complication', 'Staff Delay', 'Patient Safety Red Flag'],
    keywords: ['rigid abdomen', 'fever', 'septic leak', 'anastomotic leak', 'emergency re-operation', 'ignored'],
    organizationalBottlenecks: ['Communication Breakdown', 'Staffing Shortage'],
    aiRiskCategory: 'Clinical Safety / Human Review',
    aiRiskDescription: 'Critical patient safety event: Delayed escalation of acute surgical abdomen resulting in emergency re-exploration for sepsis.',
    needsHumanReview: true,
    humanReviewed: false,
  },
  {
    patientPersona: 'Rural / Long-Commute',
    serviceLine: 'Oncology',
    visitType: 'Outpatient Clinic',
    satisfactionScore: 1,
    communicationRating: 1,
    followUpCompliance: true,
    waitTimeMinutes: 110,
    comment:
      'My biopsy results confirming breast carcinoma were posted to the MyChart portal on Friday at 8:30 PM with no physician call. We spent the entire weekend sobbing with zero medical explanation or emotional guidance until Monday at 2 PM. Posting raw malignancy pathology without physician counseling is cruel.',
    sentiment: 'Negative',
    nlpThemes: ['Pathology Release', 'Emotional Distress', 'Oncology Care', 'EHR Notification'],
    keywords: ['carcinoma', 'MyChart release', 'weekend panic', 'no doctor call', 'biopsy results', 'cruel'],
    organizationalBottlenecks: ['Technology / Portal Failure', 'Communication Breakdown'],
    aiRiskCategory: 'Clinical Safety / Human Review',
    aiRiskDescription: 'Automatic unfiltered release of malignant pathology without clinical pre-counseling, causing acute psychological trauma.',
    needsHumanReview: true,
    humanReviewed: false,
  },

  // SECTION 4: Communication Bottlenecks
  {
    patientPersona: 'Geriatric Chronic Care',
    serviceLine: 'Cardiology',
    visitType: 'Inpatient',
    satisfactionScore: 2,
    communicationRating: 2,
    followUpCompliance: false,
    waitTimeMinutes: 50,
    comment:
      'At 7 PM shift change, the day nurse told us mom could be discharged, but the night nurse had no idea and said mom needed another 24 hours of IV Lasix. The doctors had not updated the chart notes. We sat in the room packed with our bags for four hours wondering who was actually in charge.',
    sentiment: 'Negative',
    nlpThemes: ['Shift Handoff', 'Discharge Coordination', 'Conflicting Orders', 'Nurse Communication'],
    keywords: ['shift change', 'night nurse', 'conflicting orders', 'Lasix', 'discharge delay', 'chart update'],
    organizationalBottlenecks: ['Communication Breakdown'],
    aiRiskCategory: 'None',
    needsHumanReview: false,
    humanReviewed: true,
  },
  {
    patientPersona: 'Pediatric Caregiver',
    serviceLine: 'Pediatrics',
    visitType: 'Outpatient Clinic',
    satisfactionScore: 2,
    communicationRating: 2,
    followUpCompliance: true,
    waitTimeMinutes: 65,
    comment:
      'The pediatrician was in and out of the room in under four minutes. She prescribed three inhalers for my asthmatic 4-year-old but did not demonstrate how to use the spacer, and the pharmacy gave us a different brand. When I called the nurse helpline, I sat on hold for 52 minutes.',
    sentiment: 'Negative',
    nlpThemes: ['Pediatric Asthma', 'Inhaler Technique', 'Rushed Visit', 'Helpline Hold Time'],
    keywords: ['four minutes', 'asthma spacer', 'rushed', 'nurse helpline', 'hold time', 'prescriptions'],
    organizationalBottlenecks: ['Communication Breakdown', 'Wait-Time'],
    aiRiskCategory: 'None',
    needsHumanReview: false,
  },

  // SECTION 4: Technology & Portal Issues
  {
    patientPersona: 'Geriatric Chronic Care',
    serviceLine: 'Primary Care',
    visitType: 'Telehealth',
    satisfactionScore: 2,
    communicationRating: 3,
    followUpCompliance: false,
    waitTimeMinutes: 35,
    comment:
      'The video visit link sent to my phone prompted a two-factor verification code that arrived 20 minutes after my appointment slot had already passed. When I tried to log in through the portal, it locked my account for three invalid password attempts. I missed my diabetic refill visit completely.',
    sentiment: 'Negative',
    nlpThemes: ['Portal Lockout', '2FA Failure', 'Telehealth Access', 'Diabetic Refill'],
    keywords: ['two-factor', 'locked account', 'portal link', 'missed appointment', 'login failure'],
    organizationalBottlenecks: ['Technology / Portal Failure', 'Scheduling Latency'],
    equityAccessibilityFlags: ['Digital Health Literacy'],
    aiRiskCategory: 'None',
    needsHumanReview: false,
  },
  {
    patientPersona: 'Tech-Savvy Adult',
    serviceLine: 'Primary Care',
    visitType: 'Outpatient Clinic',
    satisfactionScore: 3,
    communicationRating: 4,
    followUpCompliance: true,
    waitTimeMinutes: 25,
    comment:
      'Doctor Patel is wonderful, but the hospital self-check-in tablet in the lobby crashed twice while scanning my insurance card. The receptionist had to manually re-type everything, which made me late for my appointment slot.',
    sentiment: 'Neutral',
    nlpThemes: ['Kiosk Check-in', 'Portal Glitch', 'Clinic Reception', 'Check-in Tech'],
    keywords: ['tablet crashed', 'scanning card', 'receptionist', 'kiosk', 'insurance check-in'],
    organizationalBottlenecks: ['Technology / Portal Failure'],
    aiRiskCategory: 'None',
    needsHumanReview: false,
  },

  // SECTION 4: Scheduling-Related Issues
  {
    patientPersona: 'Rural / Long-Commute',
    serviceLine: 'Neurology',
    visitType: 'Outpatient Clinic',
    satisfactionScore: 2,
    communicationRating: 3,
    followUpCompliance: true,
    waitTimeMinutes: 55,
    comment:
      'After my transient ischemic attack (mini-stroke) in April, the hospital told me I urgently needed a neurology consultation within 14 days. The earliest available appointment at the medical center was 78 days later. I spent 2.5 months in constant dread of suffering a catastrophic stroke.',
    sentiment: 'Negative',
    nlpThemes: ['Specialist Delay', 'Appointment Latency', 'Stroke Risk', 'Scheduling Bottleneck'],
    keywords: ['neurology', '78 days', 'stroke', 'appointment backlog', 'specialist wait', 'dread'],
    organizationalBottlenecks: ['Scheduling Latency'],
    equityAccessibilityFlags: ['Transportation / Distance'],
    aiRiskCategory: 'None',
    needsHumanReview: false,
  },
  {
    patientPersona: 'High-Acuity Surgical',
    serviceLine: 'Orthopedics',
    visitType: 'Outpatient Clinic',
    satisfactionScore: 2,
    communicationRating: 3,
    followUpCompliance: true,
    waitTimeMinutes: 90,
    comment:
      'My knee replacement post-op follow-up was canceled by the hospital automated text system two hours before my scheduled appointment due to clinic overbooking. Because I live 60 miles away, I was already in the car on the highway. Rescheduling took three phone calls.',
    sentiment: 'Negative',
    nlpThemes: ['Last-Minute Cancellation', 'Overbooking', 'Travel Burden', 'Post-Op Follow-up'],
    keywords: ['canceled text', 'overbooking', '60 miles', 'highway', 'rescheduling', 'knee replacement'],
    organizationalBottlenecks: ['Scheduling Latency', 'Technology / Portal Failure'],
    equityAccessibilityFlags: ['Transportation / Distance'],
    aiRiskCategory: 'None',
    needsHumanReview: false,
  },

  // SECTION 4: Wait-Time Complaints
  {
    patientPersona: 'Medicaid / Vulnerable',
    serviceLine: 'Emergency',
    visitType: 'Emergency Dept',
    satisfactionScore: 1,
    communicationRating: 2,
    followUpCompliance: false,
    waitTimeMinutes: 245,
    comment:
      'Sat in the emergency waiting area for over 4 hours with severe kidney stone spasms. The display screen just said "Wait Time: Variable". There was no water fountain working, no blankets, and the triage staff refused to tell anyone where they were in the queue. Complete lack of human empathy.',
    sentiment: 'Negative',
    nlpThemes: ['ER Wait Times', 'Triage Transparency', 'Waiting Room Conditions', 'Empathy'],
    keywords: ['4 hours', 'kidney stone', 'no updates', 'triage queue', 'cold room', 'empathy'],
    organizationalBottlenecks: ['Wait-Time', 'Facility Access'],
    aiRiskCategory: 'None',
    needsHumanReview: false,
  },

  // SECTION 6: Healthcare Equity & Accessibility
  {
    patientPersona: 'Non-English Primary Speaker',
    serviceLine: 'Primary Care',
    visitType: 'Outpatient Clinic',
    satisfactionScore: 2,
    communicationRating: 2,
    followUpCompliance: false,
    waitTimeMinutes: 75,
    comment:
      'My mother speaks Vietnamese. The clinic had an iPad interpreter cart, but the WiFi in the basement clinic kept buffering and dropped three times during the doctor consultation. The doctor finally gave up and handed her English discharge papers that she cannot read.',
    sentiment: 'Negative',
    nlpThemes: ['Language Equity', 'iPad Interpreter', 'WiFi Failure', 'Discharge Instructions'],
    keywords: ['Vietnamese', 'iPad interpreter', 'WiFi dropped', 'English papers', 'cannot read', 'barrier'],
    organizationalBottlenecks: ['Communication Breakdown', 'Technology / Portal Failure'],
    equityAccessibilityFlags: ['Language Barrier', 'Digital Health Literacy'],
    aiRiskCategory: 'None',
    needsHumanReview: false,
  },
  {
    patientPersona: 'Geriatric Chronic Care',
    serviceLine: 'Orthopedics',
    visitType: 'Outpatient Clinic',
    satisfactionScore: 2,
    communicationRating: 3,
    followUpCompliance: true,
    waitTimeMinutes: 45,
    comment:
      'The parking garage elevators for handicap spots on level 3 were broken with a handwritten sign. My husband is in a wheelchair recovering from hip fracture. I had to push him up a steep concrete vehicle ramp to reach the pedestrian bridge. Dangerous and unacceptable for an orthopedic building.',
    sentiment: 'Negative',
    nlpThemes: ['Physical Accessibility', 'Elevator Outage', 'Wheelchair Ramp', 'Hospital Facilities'],
    keywords: ['handicap parking', 'broken elevator', 'wheelchair', 'steep ramp', 'dangerous', 'hip fracture'],
    organizationalBottlenecks: ['Facility Access'],
    equityAccessibilityFlags: ['Wheelchair / Physical'],
    aiRiskCategory: 'None',
    needsHumanReview: false,
  },

  // Positive Comments across Service Lines (Showing high performers & benchmark care)
  {
    patientPersona: 'Tech-Savvy Adult',
    serviceLine: 'Cardiology',
    visitType: 'Inpatient',
    satisfactionScore: 5,
    communicationRating: 5,
    followUpCompliance: true,
    waitTimeMinutes: 15,
    comment:
      'Dr. Chen and the Cardiac Care Unit nurses were exemplary. They explained my cardiac catheterization stent procedure using a 3D anatomical tablet diagram, answered all my wife\'s questions with empathy, and walked through my medications step-by-step prior to discharge.',
    sentiment: 'Positive',
    nlpThemes: ['Compassionate Care', 'Visual Education', 'Bedside Manner', 'Medication Clarity'],
    keywords: ['exemplary', 'diagram', 'empathy', 'stent procedure', 'step-by-step', 'nurse care'],
    organizationalBottlenecks: [],
    equityAccessibilityFlags: [],
    aiRiskCategory: 'None',
    needsHumanReview: false,
  },
  {
    patientPersona: 'Pediatric Caregiver',
    serviceLine: 'Pediatrics',
    visitType: 'Inpatient',
    satisfactionScore: 5,
    communicationRating: 5,
    followUpCompliance: true,
    waitTimeMinutes: 10,
    comment:
      'The pediatric surgical nurses treated our 6-year-old daughter like family. They brought her a therapeutic teddy bear, spoke to her in words she understood, and let us stay bedside overnight. World-class compassionate medicine.',
    sentiment: 'Positive',
    nlpThemes: ['Pediatric Compassion', 'Family-Centered Care', 'Bedside Manner', 'Nurse Excellence'],
    keywords: ['teddy bear', 'family-centered', 'compassionate', 'world-class', 'comforting'],
    organizationalBottlenecks: [],
    equityAccessibilityFlags: [],
    aiRiskCategory: 'None',
    needsHumanReview: false,
  },
  {
    patientPersona: 'Geriatric Chronic Care',
    serviceLine: 'Oncology',
    visitType: 'Outpatient Clinic',
    satisfactionScore: 5,
    communicationRating: 5,
    followUpCompliance: true,
    waitTimeMinutes: 20,
    comment:
      'Nurse Navigator Sarah called me 48 hours after my first immunotherapy infusion to check on chills and nausea. Having a dedicated human point of contact made all the difference in easing my anxiety through chemotherapy.',
    sentiment: 'Positive',
    nlpThemes: ['Nurse Navigator', 'Proactive Follow-up', 'Oncology Care', 'Empathy'],
    keywords: ['nurse navigator', 'proactive call', 'immunotherapy', 'easing anxiety', 'attentive'],
    organizationalBottlenecks: [],
    equityAccessibilityFlags: [],
    aiRiskCategory: 'None',
    needsHumanReview: false,
  },
  {
    patientPersona: 'Tech-Savvy Adult',
    serviceLine: 'Primary Care',
    visitType: 'Telehealth',
    satisfactionScore: 5,
    communicationRating: 5,
    followUpCompliance: true,
    waitTimeMinutes: 5,
    comment:
      'Seamless telehealth visit with Dr. Washington. Started right on time, video connection was crystal clear, and my lab prescription was transmitted to my neighborhood pharmacy before the call ended. Best outpatient experience I have had all year.',
    sentiment: 'Positive',
    nlpThemes: ['Telehealth Efficiency', 'On-Time', 'Digital Prescriptions', 'Doctor Communication'],
    keywords: ['seamless', 'crystal clear', 'on time', 'fast prescription', 'convenient'],
    organizationalBottlenecks: [],
    equityAccessibilityFlags: [],
    aiRiskCategory: 'None',
    needsHumanReview: false,
  },
  {
    patientPersona: 'Non-English Primary Speaker',
    serviceLine: 'Emergency',
    visitType: 'Emergency Dept',
    satisfactionScore: 4,
    communicationRating: 4,
    followUpCompliance: true,
    waitTimeMinutes: 50,
    comment:
      'The ER doctor brought in an in-person Mandarin medical interpreter within 15 minutes of our arrival. Having someone explain the CT scan and gallbladder surgery in my native language brought immense relief to my family.',
    sentiment: 'Positive',
    nlpThemes: ['Interpreter Availability', 'Language Respect', 'Prompt Triage', 'Emergency Care'],
    keywords: ['Mandarin interpreter', 'relief', 'prompt', 'CT scan', 'native language'],
    organizationalBottlenecks: [],
    equityAccessibilityFlags: ['Language Barrier'],
    aiRiskCategory: 'None',
    needsHumanReview: false,
  },
];

// Service lines and visit types definitions
export const SERVICE_LINES: ServiceLine[] = [
  'Emergency',
  'Cardiology',
  'Oncology',
  'Pediatrics',
  'Orthopedics',
  'Neurology',
  'Primary Care',
  'Women\'s Health',
  'Surgical Services',
];

export const VISIT_TYPES: VisitType[] = [
  'Inpatient',
  'Outpatient Clinic',
  'Emergency Dept',
  'Telehealth',
  'Day Surgery',
];

export const PATIENT_PERSONAS: PatientPersona[] = [
  'Tech-Savvy Adult',
  'Geriatric Chronic Care',
  'Non-English Primary Speaker',
  'Pediatric Caregiver',
  'Rural / Long-Commute',
  'Medicaid / Vulnerable',
  'High-Acuity Surgical',
];

// Helper to generate full realistic cohort of 1,248 comments
export function generateFullDataset(): PatientFeedbackRecord[] {
  const records: PatientFeedbackRecord[] = [];
  let idCounter = 10001;

  // Add the hand-crafted seed records first (guaranteeing exact high-impact qualitative insights)
  SEED_PATIENT_COMMENTS.forEach((seed, idx) => {
    records.push({
      ...seed,
      id: `FB-${idCounter++}`,
      date: `2026-09-${String((idx % 28) + 1).padStart(2, '0')}`,
    });
  });

  // Systematic themes & snippets for generating balanced, statistically coherent hospital dataset
  const positiveSnippets = [
    { text: 'Nurses were attentive and checked on pain levels promptly throughout the stay.', themes: ['Pain Management', 'Bedside Manner'], keywords: ['nurse', 'pain', 'attentive', 'prompt'] },
    { text: 'Doctor took 25 minutes to thoroughly review my lab trends and explain the treatment rationale.', themes: ['Doctor Communication', 'Care Coordination'], keywords: ['doctor', 'thorough', 'explained', 'lab trends'] },
    { text: 'Discharge instructions were exceptionally well organized with medication calendars.', themes: ['Discharge Clarity', 'Medication Safety'], keywords: ['discharge', 'medication', 'calendar', 'organized'] },
    { text: 'Clean, quiet hospital floor and dietary team accommodated food allergy without a hitch.', themes: ['Facilities', 'Dietary Care'], keywords: ['clean', 'quiet', 'dietary', 'allergy'] },
    { text: 'Physical therapy staff helped me walk with walker just 8 hours after hip surgery.', themes: ['Post-Op Guidance', 'Rehabilitation'], keywords: ['therapy', 'walker', 'hip surgery', 'rehabilitation'] },
    { text: 'Registration staff was courteous and check-in was finished in under three minutes.', themes: ['Registration', 'Check-in Tech'], keywords: ['courteous', 'fast registration', 'smooth check-in'] },
  ];

  const neutralSnippets = [
    { text: 'Clinical care was competent, but the cafeteria food was cold and parking rates are excessive.', themes: ['Facilities', 'Billing & Parking'], keywords: ['competent', 'food cold', 'parking rates'] },
    { text: 'Waited 40 minutes past my appointment time, though doctor apologized and was thorough.', themes: ['Wait Times', 'Doctor Communication'], keywords: ['delayed', 'apologized', 'appointment', 'wait'] },
    { text: 'Portal app worked fine for lab results, but billing section had confusing line items.', themes: ['Billing & Insurance', 'Technology / Portal Failure'], keywords: ['billing', 'confusing', 'portal', 'lab results'] },
    { text: 'Good physician care, but room was noisy due to frequent call bells down the hall.', themes: ['Facilities', 'Noise Levels'], keywords: ['noisy', 'call bells', 'sleep', 'room'] },
  ];

  const negativeSnippets = [
    { text: 'Doctor appeared rushed, did not sit down, and talked over my symptoms.', themes: ['Doctor Communication', 'Bedside Manner'], keywords: ['rushed', 'interrupting', 'no eye contact'], bottleneck: 'Communication Breakdown' as const },
    { text: 'Phlebotomist had to poke both arms four times for routine blood draw with bruising.', themes: ['Clinical Competency', 'Pain Management'], keywords: ['phlebotomist', 'bruising', 'blood draw'], bottleneck: 'Staffing Shortage' as const },
    { text: 'Discharge nurse handed us paperwork while transport was already wheeling mom out the door.', themes: ['Discharge Clarity', 'Care Coordination'], keywords: ['discharge', 'paperwork', 'rushed out'], bottleneck: 'Communication Breakdown' as const },
    { text: 'Called pharmacy desk three times to authorize antibiotic refill with zero callbacks.', themes: ['Care Coordination', 'Pharmacy Delay'], keywords: ['pharmacy', 'antibiotic', 'no callback'], bottleneck: 'Communication Breakdown' as const },
    { text: 'Waiting room was packed beyond fire capacity, waited 3 hours without any triage update.', themes: ['Wait Times', 'Triage Transparency'], keywords: ['waiting room', '3 hours', 'overcrowded', 'no update'], bottleneck: 'Wait-Time' as const },
    { text: 'Clinic rescheduled my follow-up appointment twice with zero advance warning.', themes: ['Scheduling Latency', 'Care Coordination'], keywords: ['rescheduled', 'scheduling', 'canceled', 'delay'], bottleneck: 'Scheduling Latency' as const },
    { text: 'App crashed repeatedly when trying to view post-operative wound care instructions.', themes: ['Technology / Portal Failure', 'Post-Op Guidance'], keywords: ['app crash', 'portal', 'instructions', 'error'], bottleneck: 'Technology / Portal Failure' as const },
  ];

  // Distribution weights across service lines (Emergency & Orthopedics have slightly higher negative rates to mirror realistic hospital metrics)
  const serviceWeights: Record<ServiceLine, { baseSatisfaction: number; complaintProb: number; avgWait: number }> = {
    'Emergency': { baseSatisfaction: 3.2, complaintProb: 0.38, avgWait: 112 },
    'Cardiology': { baseSatisfaction: 4.1, complaintProb: 0.16, avgWait: 28 },
    'Oncology': { baseSatisfaction: 4.3, complaintProb: 0.13, avgWait: 24 },
    'Pediatrics': { baseSatisfaction: 4.2, complaintProb: 0.15, avgWait: 22 },
    'Orthopedics': { baseSatisfaction: 3.6, complaintProb: 0.28, avgWait: 52 },
    'Neurology': { baseSatisfaction: 3.7, complaintProb: 0.24, avgWait: 44 },
    'Primary Care': { baseSatisfaction: 3.9, complaintProb: 0.18, avgWait: 31 },
    'Women\'s Health': { baseSatisfaction: 4.0, complaintProb: 0.19, avgWait: 29 },
    'Surgical Services': { baseSatisfaction: 3.8, complaintProb: 0.22, avgWait: 38 },
  };

  const targetTotal = 1248;
  const countToGenerate = targetTotal - records.length;

  for (let i = 0; i < countToGenerate; i++) {
    const serviceLine = SERVICE_LINES[i % SERVICE_LINES.length];
    const visitType = VISIT_TYPES[(i * 3 + (i % 5)) % VISIT_TYPES.length];
    const persona = PATIENT_PERSONAS[(i * 2 + (i % 7)) % PATIENT_PERSONAS.length];
    const config = serviceWeights[serviceLine];

    // Determine sentiment based on service complaint probability + persona modifiers
    let complaintBias = config.complaintProb;
    if (persona === 'Medicaid / Vulnerable') complaintBias += 0.08;
    if (persona === 'Non-English Primary Speaker') complaintBias += 0.09;
    if (persona === 'Rural / Long-Commute') complaintBias += 0.04;

    const rand = Math.random();
    let sentiment: 'Positive' | 'Neutral' | 'Negative';
    let satScore: number;
    let commRating: number;
    let snippetObj: any;

    if (rand < complaintBias) {
      sentiment = 'Negative';
      satScore = Math.random() < 0.55 ? 1 : 2;
      commRating = Math.random() < 0.6 ? 1 : 2;
      snippetObj = negativeSnippets[i % negativeSnippets.length];
    } else if (rand < complaintBias + 0.22) {
      sentiment = 'Neutral';
      satScore = 3;
      commRating = Math.random() < 0.5 ? 3 : 4;
      snippetObj = neutralSnippets[i % neutralSnippets.length];
    } else {
      sentiment = 'Positive';
      satScore = Math.random() < 0.4 ? 4 : 5;
      commRating = Math.random() < 0.35 ? 4 : 5;
      snippetObj = positiveSnippets[i % positiveSnippets.length];
    }

    const waitVariance = (Math.random() - 0.5) * 30;
    const waitTime = Math.max(8, Math.round(config.avgWait + waitVariance + (sentiment === 'Negative' ? 25 : -5)));

    // Equity flags
    const equityFlags: ('Language Barrier' | 'Wheelchair / Physical' | 'Digital Health Literacy' | 'Transportation / Distance')[] = [];
    if (persona === 'Non-English Primary Speaker' && Math.random() < 0.65) {
      equityFlags.push('Language Barrier');
    }
    if ((persona === 'Geriatric Chronic Care' || persona === 'High-Acuity Surgical') && Math.random() < 0.25) {
      equityFlags.push('Wheelchair / Physical');
    }
    if (persona === 'Geriatric Chronic Care' && (visitType === 'Telehealth' || snippetObj.themes.includes('Technology / Portal Failure'))) {
      equityFlags.push('Digital Health Literacy');
    }
    if (persona === 'Rural / Long-Commute' && Math.random() < 0.45) {
      equityFlags.push('Transportation / Distance');
    }

    // AI Risk category determination
    let aiRisk: 'None' | 'Hallucination Trap' | 'Care / Algorithmic Bias' | 'Clinical Safety / Human Review' = 'None';
    let needsHumanRev = false;
    let aiRiskDesc: string | undefined = undefined;

    if (sentiment === 'Negative') {
      if (snippetObj.themes.includes('Discharge Clarity') && Math.random() < 0.08) {
        aiRisk = 'Hallucination Trap';
        aiRiskDesc = 'Patient reported unverified automated post-discharge guidance conflicting with physician orders.';
        needsHumanRev = true;
      } else if (equityFlags.length > 0 && Math.random() < 0.12) {
        aiRisk = 'Care / Algorithmic Bias';
        aiRiskDesc = 'Disproportionate access or communication delay detected impacting protected demographic.';
        needsHumanRev = Math.random() < 0.5;
      } else if (snippetObj.themes.includes('Pain Management') && satScore === 1 && Math.random() < 0.1) {
        aiRisk = 'Clinical Safety / Human Review';
        aiRiskDesc = 'Unmanaged acute pain escalation with potential clinical safety risk.';
        needsHumanRev = true;
      }
    }

    const day = (i % 30) + 1;
    const month = i % 2 === 0 ? '09' : '10';
    const dateStr = `2026-${month}-${String(day).padStart(2, '0')}`;

    records.push({
      id: `FB-${idCounter++}`,
      date: dateStr,
      patientPersona: persona,
      serviceLine,
      visitType,
      satisfactionScore: satScore,
      communicationRating: commRating,
      followUpCompliance: satScore >= 3 ? Math.random() < 0.84 : Math.random() < 0.52,
      waitTimeMinutes: waitTime,
      comment: snippetObj.text,
      sentiment,
      nlpThemes: snippetObj.themes,
      keywords: snippetObj.keywords,
      organizationalBottlenecks: snippetObj.bottleneck ? [snippetObj.bottleneck] : [],
      equityAccessibilityFlags: equityFlags,
      aiRiskCategory: aiRisk,
      aiRiskDescription: aiRiskDesc,
      needsHumanReview: needsHumanRev,
      humanReviewed: !needsHumanRev,
    });
  }

  return records;
}

// SECTION 8: AI Agent Recommendations Dataset
export const RECOMMENDED_AI_AGENTS: RecommendedAIAgent[] = [
  {
    id: 'agent-carebridge',
    name: 'CareBridge 360: Post-Discharge & Medication Navigator',
    acronym: 'CareBridge 360',
    purpose: 'Autonomous, proactive multi-channel follow-up agent that checks in with discharged patients within 24-48 hours. Verifies medication comprehension, reconciles prescriptions against EHR orders, detects early symptom deterioration, and alerts nurse navigators in real-time.',
    targetBottlenecks: ['Communication Breakdown', 'Discharge Clarity', 'Medication Safety'],
    serviceLineRelevance: ['Cardiology', 'Oncology', 'Surgical Services', 'Emergency'],
    expectedImpact: {
      kpi: '30-Day Hospital Readmission Rate & HCAHPS Care Transition Score',
      projectedImprovement: '28% reduction in avoidable 30-day readmissions; +1.2 star increase in HCAHPS discharge communication.',
      clinicalSafety: 'Automated 3-way reconciliation against EHR pharmacy dispenses, preventing dosage mismatch.',
      financialEstimate: '$1.42M annual penalty avoidance under CMS Hospital Readmissions Reduction Program (HRRP).'
    },
    feasibilityScore: 92,
    timeToImplement: '8–10 Weeks',
    guardrails: [
      'Zero autonomous drug dosage alteration; immediately escalates any medication ambiguity to licensed RN',
      'Clinical ontology grounding against hospital formulary and discharge pharmacy records',
      'Plain language translation at 6th-grade reading level compliant with CMS literacy standards'
    ],
    samplePatientQuery: 'I have two bottles of blood pressure pills with different names from the hospital and my regular doctor. Do I take both?',
    simulatedAgentResponse: 'Thank you for asking. I see in your hospital chart that Lisinopril 10mg replaced your previous Enalapril upon discharge on Tuesday. Do not take both at the same time. I am flagging your cardiology nurse, Nurse Sarah, who will call you within 30 minutes to verify. In the meantime, keep both bottles handy.'
  },
  {
    id: 'agent-triagepulse',
    name: 'TriagePulse: Real-Time ED Journey & De-escalation Agent',
    acronym: 'TriagePulse',
    purpose: 'Real-time conversational SMS and digital display agent that demystifies emergency department wait times. Informs patients of their clinical triage stage (e.g., awaiting blood test analysis, CT scan processing), explains triage urgency, and proactively delivers comfort updates.',
    targetBottlenecks: ['Wait-Time', 'Triage Transparency', 'Waiting Room Conditions'],
    serviceLineRelevance: ['Emergency', 'Pediatrics'],
    expectedImpact: {
      kpi: 'Left Without Being Seen (LWBS) Rate & ED Patient Grievance Volume',
      projectedImprovement: '41% drop in Left Without Being Seen (LWBS); 64% reduction in repetitive front-desk status inquiries.',
      clinicalSafety: 'Continuous symptom worsening re-screening prompt every 45 minutes while in waiting room.',
      financialEstimate: '$680K annual revenue recovery from prevented walkouts and retained patient visits.'
    },
    feasibilityScore: 95,
    timeToImplement: '4–6 Weeks',
    guardrails: [
      'Never discloses exact minute countdowns; uses dynamic stage windows based on live lab analyzer throughput',
      'Auto-flags any patient texting worsening chest pain, shortness of breath, or numbness directly to triage charge nurse pager',
      'HIPAA compliant tokenized SMS links with zero PHI exposed on lock screen'
    ],
    samplePatientQuery: 'I have been sitting here for 2 hours with severe stomach pain. Did everyone forget about me?',
    simulatedAgentResponse: 'We have not forgotten you. Dr. Martinez reviewed your intake vitals at 10:15 AM. Your blood panel was received by the central lab 35 minutes ago, and typical testing turnaround is 45-60 minutes. If your stomach pain is intensifying, please tap the button below or alert Charge Nurse Maria at Station 1 immediately.'
  },
  {
    id: 'agent-linguacare',
    name: 'LinguaCare: Multilingual Clinical Equity & Translation Agent',
    acronym: 'LinguaCare',
    purpose: 'Accredited medical-grade translation and cultural health mediation agent operating across 36 languages. Instantly converts discharge instructions, patient portal messages, and audio consult summaries into culturally attuned, medically verified dialects.',
    targetBottlenecks: ['Language Barrier', 'Communication Breakdown', 'Health Equity'],
    serviceLineRelevance: ['Emergency', 'Women\'s Health', 'Primary Care', 'Pediatrics'],
    expectedImpact: {
      kpi: 'Non-English Speaker Satisfaction Disparity & Post-Op Medication Adherence',
      projectedImprovement: 'Closes the 1.2-point satisfaction gap for ESL patients; 3.4x increase in portal engagement among Spanish & Vietnamese cohorts.',
      clinicalSafety: 'Eliminates ad-hoc uncertified consumer machine translation in clinical areas.',
      financialEstimate: 'Saves $420K annually in ad-hoc tele-interpreter overage fees and minimizes malpractice liability.'
    },
    feasibilityScore: 88,
    timeToImplement: '6–8 Weeks',
    guardrails: [
      'Certified Medical Lexicon enforcement (SNOMED-CT / MedDRA validated terminology)',
      'Human-in-the-loop review queue for all surgical consents and oncology treatment regimens',
      'Dual-language side-by-side audit view for hospital clinicians'
    ],
    samplePatientQuery: 'No entiendo cuántas pastillas de antibiótico debo tomar con la comida y si puedo tomar leche.',
    simulatedAgentResponse: 'Con mucho gusto se lo explicamos. Según la receta del Dr. Gómez: Tome 1 cápsula de Cefalexina de 500 mg cada 8 horas después de una comida o merienda ligera. Es seguro tomarlo con leche o agua. ¿Desea que le envíe este recordatorio a su teléfono a las 8 AM, 4 PM y 10 PM?'
  },
  {
    id: 'agent-safetysentinel',
    name: 'SafetySentinel: AI Hallucination & Clinical Risk Guardrail',
    acronym: 'SafetySentinel',
    purpose: 'Real-time interceptor agent that monitors automated EHR documentation, clinician AI drafting tools, and patient portal messages. Flags hallucination traps, conflicting medical advice, and high-liability clinical discrepancies before they reach patients or charts.',
    targetBottlenecks: ['Technology / Portal Failure', 'Communication Breakdown', 'Clinical Safety'],
    serviceLineRelevance: ['Cardiology', 'Orthopedics', 'Oncology', 'Surgical Services'],
    expectedImpact: {
      kpi: 'AI Hallucination Exposure Rate & Medical Liability Risk Incidents',
      projectedImprovement: '99.4% detection rate of AI dosage conflicts; zero unvetted automated summaries reaching high-acuity surgical patients.',
      clinicalSafety: 'Active guardrail halting unauthorized automated AI chart releases.',
      financialEstimate: 'Estimated $2.1M protection against malpractice claims and diagnostic delay settlements.'
    },
    feasibilityScore: 86,
    timeToImplement: '10–12 Weeks',
    guardrails: [
      'Deterministic rule-engine override for high-alert medications (anticoagulants, insulin, chemotherapy)',
      'Mandatory clinician digital sign-off on any AI-generated clinical summary prior to EHR ingestion',
      'Audit logging of all prompt completions and model drift tracking'
    ],
    samplePatientQuery: 'System audit: EHR note generator generated "Patient cleared for vigorous gymnastics" on Post-Op Day 10 of spinal fusion.',
    simulatedAgentResponse: 'ALERT HALT: Discrepancy detected. Surgical procedure recorded is L4-L5 Spinal Fusion. Guideline restricts flexion/extension and vigorous athletic activity for minimum 12 weeks. AI note publication blocked. Escalated to Dr. Vance\'s urgent review queue.'
  },
  {
    id: 'agent-omniaccess',
    name: 'OmniAccess: Voice & Assistive Digital Health Onboarding Agent',
    acronym: 'OmniAccess',
    purpose: 'Voice-first, cognitive-friendly digital onboarding agent designed for geriatric patients and low digital-literacy populations. Eliminates complex 2FA lockouts, guides patients through video appointments via dial-in telephone bridges, and reads lab trends in reassuring conversational voice.',
    targetBottlenecks: ['Digital Health Literacy', 'Technology / Portal Failure', 'Scheduling Latency'],
    serviceLineRelevance: ['Primary Care', 'Neurology', 'Geriatrics', 'Cardiology'],
    expectedImpact: {
      kpi: 'Telehealth No-Show Rate & Portal Activation in Patients Age 65+',
      projectedImprovement: '62% reduction in tech-related telehealth cancellations; portal activation rate doubles from 34% to 68% in senior cohort.',
      clinicalSafety: 'Guarantees chronic disease patients retain uninterrupted clinical touchpoints regardless of tech literacy.',
      financialEstimate: '$510K annual reduction in IT helpdesk call-center overhead and preserved physician encounter billing.'
    },
    feasibilityScore: 90,
    timeToImplement: '6–8 Weeks',
    guardrails: [
      'Biometric voiceprint authentication option replacing SMS 2FA code hurdles',
      'Simplified UI mode with high contrast, large typography, and screen-reader accessibility',
      'Instant warm-transfer to live hospital operator if confusion persists beyond two attempts'
    ],
    samplePatientQuery: 'I cannot open the video screen on this iPad my daughter gave me, and my arthritis makes typing impossible.',
    simulatedAgentResponse: 'Do not worry at all, Mr. Davis. You do not need to type anything. Just keep this call on your speakerphone. I am connecting you directly to Dr. Patel\'s secure audio room right now, and she will be on the line in one minute.'
  },
  {
    id: 'agent-leadsignal',
    name: 'LeadSignal: Executive Real-Time Sentiment Early-Warning Agent',
    acronym: 'LeadSignal',
    purpose: 'Continuous NLP surveillance agent that parses patient feedback, nursing notes, and discharge grievances across all departments in real time. Detects emerging sentiment dips, staffing stress clusters, or equipment failures days before quarterly HCAHPS surveys are compiled.',
    targetBottlenecks: ['Staffing Shortage', 'Wait-Time', 'Facility Access'],
    serviceLineRelevance: ['All Service Lines', 'Executive Leadership'],
    expectedImpact: {
      kpi: 'Executive Response Time to Operational Bottlenecks & HCAHPS Net Score',
      projectedImprovement: 'Reduces operational response latency from 90 days (quarterly review) to under 24 hours; prevents systemic score decay.',
      clinicalSafety: 'Early detection of hospital-wide supply or nurse burnout hotspots.',
      financialEstimate: 'Protects hospital top-decile VBP (Value-Based Purchasing) reimbursement tier ($3.2M pool).'
    },
    feasibilityScore: 94,
    timeToImplement: '4–6 Weeks',
    guardrails: [
      'De-identification and anonymization of non-critical staff feedback',
      'Cluster threshold validation to prevent false alarms from single isolated complaints',
      'Automated daily executive digest pushed to Chief Quality Officer dashboard'
    ],
    samplePatientQuery: 'Surveillance trigger: 6 complaints regarding elevator outages and wheelchair barriers in Orthopedics within 48 hours.',
    simulatedAgentResponse: 'EXECUTIVE BRIEFING DISPATCH: Cluster detected in Orthopedic Outpatient Wing Level 3. Five patients reported inability to access clinic due to broken elevator. Facilities Management notified. Temporary transport golf carts dispatched to garage entrance.'
  }
];

// SECTION 9: Executive Recommendations Dataset
export const EXECUTIVE_PRIORITIES: ExecutivePriority[] = [
  {
    id: 1,
    rank: 1,
    title: 'Transform Emergency Department Flow & Triage Transparency',
    category: 'Operations',
    serviceLine: 'Emergency',
    evidence: 'Emergency Department accounts for 38% complaint rate, with an average wait time of 112 minutes and widespread patient complaints regarding lack of triage status transparency.',
    actionPlan: 'Deploy TriagePulse conversational SMS agent to deliver proactive milestone updates, activate roving waiting-room comfort liaisons, and display live lab processing stages on overhead screens.',
    expectedOutcome: 'Reduce ED grievance volume by 45%, lower LWBS (left without being seen) from 4.8% to under 1.9%, and recover $680K in lost encounter revenue.',
    timeframe: '0–3 Months (Immediate Quick Win)',
    urgency: 'Immediate (Critical)'
  },
  {
    id: 2,
    rank: 2,
    title: 'Standardize Discharge Communication & Multilingual Equity',
    category: 'Health Equity',
    serviceLine: 'All Hospital Inpatient Floors',
    evidence: 'Patients with non-English primary language register a 1.2-point lower communication rating; 24% of negative inpatient reviews cite conflicting discharge instructions between shifts.',
    actionPlan: 'Institute mandatory standardized 2-tier discharge reconciliation, deploy LinguaCare real-time translation for 36 dialects, and implement CareBridge 360 automated 48-hour follow-up.',
    expectedOutcome: 'Close language satisfaction gap by 85%, eliminate ad-hoc uncertified translation, and reduce 30-day preventable readmissions by 28%.',
    timeframe: '1–4 Months',
    urgency: 'Immediate (Critical)'
  },
  {
    id: 3,
    rank: 3,
    title: 'Establish Clinical AI Risk Governance & Hallucination Guardrails',
    category: 'Clinical Safety',
    serviceLine: 'Cardiology, Orthopedics, Oncology',
    evidence: 'Identified 18 hallucination trap records where patients acted on unverified third-party AI summaries or conflicting automated portal notes, posing direct medical liability.',
    actionPlan: 'Deploy SafetySentinel guardrail engine to intercept contradictory automated chart releases, enforce clinician review sign-offs on AI drafts, and publish patient educational disclaimers.',
    expectedOutcome: '100% human-in-the-loop review for high-risk clinical AI discrepancies, eliminating dosage error liability.',
    timeframe: '2–6 Months',
    urgency: 'High'
  },
  {
    id: 4,
    rank: 4,
    title: 'Resolve Digital Literacy & Portal Usability Barriers for Seniors',
    category: 'Digital Health',
    serviceLine: 'Primary Care, Cardiology, Neurology',
    evidence: 'Geriatric chronic care patients experienced 32% failure rate during 2FA telehealth authentication, leading to missed appointments and treatment disruption.',
    actionPlan: 'Deploy OmniAccess voice-guided portal assistant, introduce one-touch biometric verification, and offer automated phone bridge fallback for low digital-literacy patients.',
    expectedOutcome: 'Reduce telehealth tech no-shows from 14% to 4%, doubling digital portal activation among elderly chronic care cohorts.',
    timeframe: '3–6 Months',
    urgency: 'High'
  },
  {
    id: 5,
    rank: 5,
    title: 'Eliminate Specialist Referral & Diagnostic Latency Bottlenecks',
    category: 'Patient Experience',
    serviceLine: 'Neurology, Orthopedics, Oncology',
    evidence: 'Neurology and Orthopedics patients face up to 78-day backlogs for urgent post-event consultations, generating severe patient anxiety and care leakage.',
    actionPlan: 'Implement predictive scheduling algorithms with algorithmic slot-filling for cancellations, and establish protected urgent access templates for high-acuity referrals.',
    expectedOutcome: 'Compress specialist median wait from 44 days to under 12 days; prevent patient leakage to competing health networks.',
    timeframe: '6–12 Months (Long-Term)',
    urgency: 'Strategic Medium'
  }
];

export const QUICK_WINS = [
  {
    title: 'Two-Way SMS Wait-Time Notifications in Emergency',
    timeline: '30 Days',
    effort: 'Low',
    impact: 'High',
    description: 'Deploy automated SMS alerts updating patients when their blood labs or imaging have entered processing. Alleviates anxiety with zero hardware changes.'
  },
  {
    title: 'Physical QR Codes for Audio-Translated Discharge Guides',
    timeline: '45 Days',
    effort: 'Low',
    impact: 'High',
    description: 'Print localized QR badges on all discharge paperwork allowing patients to listen to their discharge instructions in Spanish, Vietnamese, Mandarin, or Arabic.'
  },
  {
    title: 'One-Click Nurse Callback Button in Patient Portal',
    timeline: '60 Days',
    effort: 'Medium',
    impact: 'High',
    description: 'Replace complex support tickets with an urgent 1-click nurse callback request for patients with post-discharge medication questions.'
  },
  {
    title: 'Hospital Physical Accessibility & Wayfinding Fast-Track',
    timeline: '30 Days',
    effort: 'Low',
    impact: 'Medium',
    description: 'Audit handicap parking ramps and elevator signage across Orthopedics and Surgical buildings; institute immediate elevator repair SLAs.'
  }
];

export const LONG_TERM_OPPORTUNITIES = [
  {
    title: 'Enterprise CareBridge 360 EHR Integration',
    timeline: '6–9 Months',
    roi: '$1.42M / Year',
    description: 'Full bi-directional integration of autonomous post-discharge companion agent directly into Epic / Cerner EHR workflows.'
  },
  {
    title: 'Ambient AI Scribing for Physician-Patient Eye Contact',
    timeline: '6–12 Months',
    roi: '+18% HCAHPS Doctor Comm',
    description: 'Deploy ambient clinical documentation across ambulatory clinics to liberate doctors from computer screens and re-establish face-to-face rapport.'
  },
  {
    title: 'Predictive Inpatient Bed Flow & Discharge Forecasting',
    timeline: '9–12 Months',
    roi: '1.4 Days Reduced ALOS',
    description: 'Machine learning model predicting discharge delays 24 hours in advance to smooth morning bed turnover and alleviate ED boarding.'
  },
  {
    title: 'Continuous Disparity & Health Equity Surveillance Network',
    timeline: '6–12 Months',
    roi: 'Community Health Leadership',
    description: 'Real-time equity dashboard monitoring health outcomes and satisfaction metrics across demographic segments to ensure equitable care delivery.'
  }
];
