import React, { useState } from 'react';
import { 
  X, 
  Download, 
  CheckCircle2, 
  HelpCircle, 
  Clock, 
  Award, 
  AlertCircle, 
  FileText, 
  Eye, 
  EyeOff,
  Printer
} from 'lucide-react';
import { ExamPaper } from '../types/exam';
import { generateExamPaperPDF } from '../utils/pdfGenerator';

interface PaperPreviewModalProps {
  paper: ExamPaper | null;
  onClose: () => void;
}

export const PaperPreviewModal: React.FC<PaperPreviewModalProps> = ({ paper, onClose }) => {
  const [showAllExplanations, setShowAllExplanations] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [revealedQuestions, setRevealedQuestions] = useState<Record<string, boolean>>({});

  if (!paper) return null;

  const handleSelectOption = (questionId: string, optionKey: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionKey }));
  };

  const toggleReveal = (questionId: string) => {
    setRevealedQuestions(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleDownload = () => {
    generateExamPaperPDF(paper);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white w-full max-w-4xl rounded-xl shadow-2xl border border-slate-300 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0f2942] text-white px-5 py-4 flex items-center justify-between border-b border-blue-900">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded bg-blue-800 text-blue-200 flex items-center justify-center font-bold text-sm">
              PDF
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-semibold text-blue-300">
                  {paper.categoryName} Archive • {paper.year}
                </span>
                <span className="text-[11px] bg-blue-900/80 px-2 py-0.2 rounded border border-blue-400/30 text-white">
                  {paper.paperCode}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white line-clamp-1">
                {paper.examName}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold px-3 py-1.5 rounded shadow-xs transition"
            >
              <Download className="w-4 h-4 text-blue-200" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Sub-Bar / Exam Specs */}
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-2.5 text-xs text-slate-700 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-700" />
              <strong>Duration:</strong> {paper.durationMinutes} Minutes
            </span>
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-blue-700" />
              <strong>Maximum Marks:</strong> {paper.totalMarks}
            </span>
            <span className="flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-blue-700" />
              <strong>Questions:</strong> {paper.totalQuestions}
            </span>
            {paper.shift && (
              <span className="text-slate-500">
                <strong>Shift:</strong> {paper.shift}
              </span>
            )}
          </div>

          {/* Toggle answers control */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAllExplanations(!showAllExplanations)}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 transition"
            >
              {showAllExplanations ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                  <span>Hide Solutions</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-blue-700" />
                  <span>Reveal All Solutions</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6 flex-1 text-slate-800">
          {/* Instructions Box */}
          <div className="bg-blue-50/60 border border-blue-200 rounded-lg p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-2 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-700" />
              General Candidate Instructions
            </h4>
            <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
              {paper.instructions.map((instr, idx) => (
                <li key={idx}>{instr}</li>
              ))}
              <li className="font-semibold text-rose-700">
                Negative Marking Scheme: {paper.negativeMarking}
              </li>
            </ul>
          </div>

          {/* Question List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                Questions & Interactive Self-Assessment
              </h3>
              <span className="text-xs text-slate-500">
                Click an option to test your answer
              </span>
            </div>

            {paper.questions.map((q) => {
              const userAns = selectedAnswers[q.id];
              const isRevealed = showAllExplanations || revealedQuestions[q.id];
              const isCorrect = userAns === q.correctAnswer;

              return (
                <div 
                  key={q.id}
                  className="p-4 rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition"
                >
                  {/* Question header */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-[#0f2942] text-white">
                        Q.{q.number}
                      </span>
                      <span className="text-xs font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {q.section}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">
                      +{q.marks} Mark{q.marks > 1 ? 's' : ''} {q.negativeMarks ? `| -${q.negativeMarks}` : ''}
                    </span>
                  </div>

                  {/* Question text */}
                  <p className="text-sm sm:text-base font-medium text-slate-900 mb-4 whitespace-pre-line leading-relaxed">
                    {q.question}
                  </p>

                  {/* Options */}
                  <div className="space-y-2 mb-4">
                    {q.options.map((opt) => {
                      const isSelected = userAns === opt.key;
                      let optionStyle = 'border-slate-200 hover:bg-slate-50 text-slate-800';

                      if (isRevealed) {
                        if (opt.key === q.correctAnswer) {
                          optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-500';
                        } else if (isSelected && !isCorrect) {
                          optionStyle = 'border-rose-400 bg-rose-50 text-rose-950 line-through';
                        }
                      } else if (isSelected) {
                        optionStyle = 'border-blue-600 bg-blue-50/70 text-blue-900 font-semibold ring-1 ring-blue-600';
                      }

                      return (
                        <div
                          key={opt.key}
                          onClick={() => handleSelectOption(q.id, opt.key)}
                          className={`flex items-start gap-3 p-3 rounded-md border text-sm cursor-pointer transition ${optionStyle}`}
                        >
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                            isRevealed && opt.key === q.correctAnswer
                              ? 'bg-emerald-600 text-white'
                              : isSelected
                              ? 'bg-blue-700 text-white'
                              : 'bg-slate-200 text-slate-700'
                          }`}>
                            {opt.key}
                          </span>
                          <span className="pt-0.5">{opt.text}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom reveal / result bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                    <div>
                      {userAns && !isRevealed && (
                        <span className="text-xs text-slate-500">
                          Selected Option: <strong>({userAns})</strong>
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => toggleReveal(q.id)}
                      className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 underline underline-offset-2"
                    >
                      {isRevealed ? 'Hide Explanation' : 'View Answer & Detailed Solution'}
                    </button>
                  </div>

                  {/* Detailed explanation box */}
                  {isRevealed && (
                    <div className="mt-3 p-3.5 bg-slate-50 rounded-md border border-slate-200 text-xs text-slate-700 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Correct Answer: Option ({q.correctAnswer})</span>
                      </div>
                      <p className="text-slate-600 pt-1 leading-relaxed">
                        <strong>Explanation:</strong> {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 py-3 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Formatted according to official {paper.categoryName} exam standards.
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-md transition"
            >
              Close Preview
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#0f2942] hover:bg-[#1e3a8a] rounded-md shadow-xs transition"
            >
              <Download className="w-4 h-4 text-blue-200" />
              <span>Download Official PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
