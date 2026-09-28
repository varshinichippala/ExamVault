import React, { useState } from 'react';
import { BookOpen, CheckCircle, ChevronDown, ChevronUp, AlertCircle, Info } from 'lucide-react';
import { ExamCategory } from '../types/exam';

interface ExamGuideCardProps {
  category: ExamCategory;
}

export const ExamGuideCard: React.FC<ExamGuideCardProps> = ({ category }) => {
  const [expanded, setExpanded] = useState(false);

  // Category specific tips and patterns
  const getExamPattern = (id: string) => {
    switch (id) {
      case 'gate':
        return {
          pattern: 'Single-stage Computer Based Test (CBT). Total 65 questions (10 GA + 55 Core) for 100 marks. 3 Hours duration.',
          negative: '1/3 mark for 1-mark MCQ, 2/3 mark for 2-mark MCQ. No negative mark for MSQ and NAT.',
          strategy: 'Focus on core engineering mathematics, aptitude, and previous 10 years question trends. Master NAT speed and accuracy without virtual calculator mistakes.',
          sections: ['General Aptitude (15 Marks)', 'Engineering Mathematics (13-15 Marks)', 'Core Discipline Technical Subject (70-72 Marks)'],
        };
      case 'upsc':
        return {
          pattern: 'Three-stage selection: Preliminary (Objective GS-I + CSAT Paper-II), Mains (9 Descriptive papers), and Personality Interview.',
          negative: '0.66 marks deducted per wrong answer in GS Paper-I (1/3rd penalty). CSAT qualifying with min 33% (66 marks).',
          strategy: 'Integrate Static and Current Affairs. Regular answer writing practice and solving last 10 years prelims papers to spot recurring themes.',
          sections: ['Prelims GS Paper I (200 Marks / 100 Qs)', 'Prelims CSAT Paper II (200 Marks / 80 Qs - Qualifying)', 'Mains Written Examination (1750 Marks)'],
        };
      case 'ssc':
        return {
          pattern: 'Tier-I (CBT with 100 Qs for 200 Marks in 60 mins), followed by Tier-II (Mathematical Abilities, Reasoning, English, General Awareness, Computer Knowledge).',
          negative: '0.50 mark penalty in Tier-I; 1 mark penalty in Tier-II for each incorrect question.',
          strategy: 'Speed and calculation tricks are critical for Quantitative Aptitude and Reasoning. Revise high-frequency vocabulary and daily current affairs.',
          sections: ['General Intelligence & Reasoning (25 Qs)', 'General Awareness (25 Qs)', 'Quantitative Aptitude (25 Qs)', 'English Comprehension (25 Qs)'],
        };
      case 'banking':
        return {
          pattern: 'Prelims (100 Qs / 100 Marks / 60 Mins with sectional timing of 20 mins each), Mains (Objective + Descriptive), followed by Interview/GD.',
          negative: '0.25 mark (1/4th) penalty for each incorrect objective response.',
          strategy: 'Master sectional time management. Prioritize puzzles, seating arrangements, and data interpretation sets with high accuracy.',
          sections: ['English Language (30 Qs / 20 mins)', 'Quantitative Aptitude (35 Qs / 20 mins)', 'Reasoning Ability (35 Qs / 20 mins)'],
        };
      case 'railway':
        return {
          pattern: 'CBT-1 (Screening Test: 100 Qs in 90 Mins), CBT-2 (120 Qs in 90 Mins), CBAT / Typing Skill Test (as applicable), and Document Verification.',
          negative: '1/3rd mark deduction for every incorrect response in CBT-1 and CBT-2.',
          strategy: 'Focus heavily on General Science (Physics, Chemistry, Life Sciences) and basic arithmetic. Revise Indian Railways history and national geography.',
          sections: ['General Awareness (40 Qs)', 'Mathematics (30 Qs)', 'General Intelligence & Reasoning (30 Qs)'],
        };
      default:
        return {
          pattern: 'Objective Multiple Choice CBT / OMR exam format with subject-specific domains.',
          negative: 'Refer to specific paper instructions for negative marking rules.',
          strategy: 'Review syllabus thoroughly and solve previous papers to identify question weightage.',
          sections: ['General Paper / Teaching & Research', 'Subject Specific Specialization'],
        };
    }
  };

  const info = getExamPattern(category.id);

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-5 shadow-xs mb-6">
      <div 
        onClick={() => setExpanded(!expanded)} 
        className="flex items-center justify-between cursor-pointer select-none"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-md bg-blue-50 text-blue-800 flex items-center justify-center">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>{category.name} Exam Pattern & Preparation Blueprint</span>
              <span className="text-[10px] font-semibold uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                Official Scheme
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Exam structure, negative marking scheme, and preparation tips
            </p>
          </div>
        </div>
        <button 
          className="text-slate-400 hover:text-slate-700 p-1"
          aria-label={expanded ? "Collapse guide" : "Expand guide"}
        >
          {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700">
          {/* Pattern Box */}
          <div className="bg-slate-50 p-3 rounded-md border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-blue-700" />
              <span>Exam Pattern</span>
            </div>
            <p className="text-slate-600 leading-relaxed">{info.pattern}</p>
          </div>

          {/* Negative Marking Box */}
          <div className="bg-slate-50 p-3 rounded-md border border-slate-200 space-y-1">
            <div className="font-bold text-rose-800 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
              <span>Negative Marking</span>
            </div>
            <p className="text-slate-600 leading-relaxed">{info.negative}</p>
          </div>

          {/* Strategy Box */}
          <div className="bg-slate-50 p-3 rounded-md border border-slate-200 space-y-1">
            <div className="font-bold text-emerald-800 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Recommended Strategy</span>
            </div>
            <p className="text-slate-600 leading-relaxed">{info.strategy}</p>
          </div>

          {/* Section Breakdown Pills */}
          <div className="md:col-span-3 pt-1">
            <div className="font-bold text-slate-800 mb-1.5">Standard Exam Sections:</div>
            <div className="flex flex-wrap gap-2">
              {info.sections.map((sec, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-blue-50 border border-blue-200 text-blue-900 font-medium text-xs"
                >
                  {sec}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
