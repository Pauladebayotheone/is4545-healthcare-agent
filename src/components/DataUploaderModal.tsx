import React, { useState, useRef } from 'react';
import {
  Upload,
  X,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Download,
  Sparkles,
} from 'lucide-react';
import { PatientFeedbackRecord, ServiceLine, VisitType, PatientPersona, SentimentType } from '../types/healthcare';

interface DataUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataUploaded: (newRecords: PatientFeedbackRecord[], name: string) => void;
}

export const DataUploaderModal: React.FC<DataUploaderModalProps> = ({
  isOpen,
  onClose,
  onDataUploaded,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [parsedCount, setParsedCount] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processFileContent = (content: string, name: string) => {
    setIsProcessing(true);
    setErrorMsg(null);

    try {
      if (name.endsWith('.json')) {
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const records: PatientFeedbackRecord[] = parsed.map((item, idx) => ({
            id: item.id || `FB-CUSTOM-${idx + 1000}`,
            date: item.date || '2026-10-15',
            patientPersona: item.patientPersona || 'Tech-Savvy Adult',
            serviceLine: item.serviceLine || 'Emergency',
            visitType: item.visitType || 'Outpatient Clinic',
            satisfactionScore: Number(item.satisfactionScore || item.rating || 4),
            communicationRating: Number(item.communicationRating || item.commRating || 4),
            followUpCompliance: Boolean(item.followUpCompliance ?? true),
            waitTimeMinutes: Number(item.waitTimeMinutes || 30),
            comment: item.comment || item.feedback || item.text || 'Routine follow-up visit.',
            sentiment: item.sentiment || (Number(item.satisfactionScore || 4) >= 4 ? 'Positive' : Number(item.satisfactionScore || 4) <= 2 ? 'Negative' : 'Neutral'),
            nlpThemes: Array.isArray(item.nlpThemes) ? item.nlpThemes : ['Care Coordination', 'Bedside Manner'],
            keywords: Array.isArray(item.keywords) ? item.keywords : ['doctor', 'nurse', 'prompt'],
            aiRiskCategory: item.aiRiskCategory || 'None',
            aiRiskDescription: item.aiRiskDescription,
            needsHumanReview: Boolean(item.needsHumanReview),
            humanReviewed: Boolean(item.humanReviewed),
          }));

          setParsedCount(records.length);
          setFileName(name);
          onDataUploaded(records, name);
          setTimeout(() => {
            setIsProcessing(false);
            onClose();
          }, 800);
          return;
        }
      } else {
        // Parse CSV format
        const lines = content.split('\n').filter((l) => l.trim().length > 0);
        if (lines.length < 2) {
          throw new Error('CSV file must contain a header row and at least one data row.');
        }

        const headers = lines[0].split(',').map((h) => h.trim().toLowerCase().replace(/['"]/g, ''));
        const commentIdx = headers.findIndex((h) => h.includes('comment') || h.includes('feedback') || h.includes('text'));
        const satIdx = headers.findIndex((h) => h.includes('satisfaction') || h.includes('score') || h.includes('rating'));
        const serviceIdx = headers.findIndex((h) => h.includes('service') || h.includes('department') || h.includes('line'));
        const personaIdx = headers.findIndex((h) => h.includes('persona') || h.includes('demographic'));

        const records: PatientFeedbackRecord[] = [];

        for (let i = 1; i < lines.length; i++) {
          const row = lines[i].split(',').map((c) => c.trim().replace(/^["']|["']$/g, ''));
          if (row.length < 2) continue;

          const comment = commentIdx >= 0 ? row[commentIdx] : row[0] || 'Patient feedback';
          const satScore = satIdx >= 0 ? Math.max(1, Math.min(5, Number(row[satIdx]) || 4)) : 4;
          const serviceLine = (serviceIdx >= 0 ? row[serviceIdx] : 'Primary Care') as ServiceLine;
          const persona = (personaIdx >= 0 ? row[personaIdx] : 'Tech-Savvy Adult') as PatientPersona;

          let sentiment: SentimentType = 'Neutral';
          if (satScore >= 4) sentiment = 'Positive';
          else if (satScore <= 2) sentiment = 'Negative';

          // Extract keywords
          const words = comment.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ').filter((w) => w.length > 3);
          const keywords = Array.from(new Set(words)).slice(0, 4);

          records.push({
            id: `FB-CSV-${i + 1000}`,
            date: '2026-10-18',
            patientPersona: persona,
            serviceLine,
            visitType: 'Outpatient Clinic',
            satisfactionScore: satScore,
            communicationRating: satScore,
            followUpCompliance: satScore >= 3,
            waitTimeMinutes: Math.round(20 + Math.random() * 45),
            comment,
            sentiment,
            nlpThemes: ['Care Experience', 'Communication'],
            keywords: keywords.length ? keywords : ['care', 'staff'],
            aiRiskCategory: 'None',
            needsHumanReview: satScore === 1,
            humanReviewed: false,
          });
        }

        if (records.length === 0) {
          throw new Error('No valid records could be extracted from this CSV.');
        }

        setParsedCount(records.length);
        setFileName(name);
        onDataUploaded(records, name);
        setTimeout(() => {
          setIsProcessing(false);
          onClose();
        }, 800);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to parse feedback file. Please verify CSV or JSON structure.');
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        processFileContent(text, file.name);
      };
      reader.readAsText(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        processFileContent(text, file.name);
      };
      reader.readAsText(file);
    }
  };

  const handleDownloadSampleCSV = () => {
    const sampleCSV = `comment,satisfactionScore,serviceLine,patientPersona\n"Nurses in Cardiology explained my catheterization clearly and kindly.",5,Cardiology,Tech-Savvy Adult\n"Emergency room wait time was over 3 hours with no status updates.",1,Emergency,Medicaid / Vulnerable\n"Spanish interpreter was not provided during discharge instructions.",2,Women's Health,Non-English Primary Speaker\n"Doctor was rushed and spent only 3 minutes in the room.",2,Primary Care,Geriatric Chronic Care\n"Telehealth video link worked smoothly and prescription arrived promptly.",5,Primary Care,Tech-Savvy Adult`;

    const blob = new Blob([sampleCSV], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'sample_patient_feedback.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Upload Patient Feedback Dataset
              </h3>
              <p className="text-xs text-slate-400">
                Upload CSV or JSON dataset for immediate executive dashboard recalculation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drag and drop box */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            dragActive
              ? 'border-cyan-400 bg-cyan-950/30 ring-2 ring-cyan-500/30'
              : 'border-slate-700 hover:border-slate-500 bg-slate-950/60'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.json"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="w-12 h-12 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-cyan-400 mb-3">
            <FileSpreadsheet className="w-6 h-6" />
          </div>

          <h4 className="text-sm font-semibold text-white mb-1">
            Drag and drop your dataset here, or <span className="text-cyan-400 underline">browse</span>
          </h4>
          <p className="text-xs text-slate-400">
            Supports .CSV and .JSON formats with patient comments and satisfaction ratings
          </p>

          {fileName && (
            <div className="mt-4 inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Loaded {fileName} ({parsedCount} records)</span>
            </div>
          )}
        </div>

        {errorMsg && (
          <div className="mt-3 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {isProcessing && (
          <div className="mt-3 text-center text-xs text-cyan-400 flex items-center justify-center space-x-2">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>Running automated NLP keyword extraction and equity classification...</span>
          </div>
        )}

        {/* Footer with Sample CSV Download */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
          <button
            onClick={handleDownloadSampleCSV}
            className="text-cyan-400 hover:text-cyan-300 flex items-center space-x-1.5 font-medium transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Sample CSV Template</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
