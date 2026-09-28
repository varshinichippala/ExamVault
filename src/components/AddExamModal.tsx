import React, { useState } from 'react';
import { X, Plus, AlertCircle, CheckCircle, FileText } from 'lucide-react';
import { ExamCategory, ExamPaper, ExamQuestion } from '../types/exam';

interface AddExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: ExamCategory[];
  onAddPaper: (newPaper: ExamPaper, newCategory?: ExamCategory) => void;
}

export const AddExamModal: React.FC<AddExamModalProps> = ({
  isOpen,
  onClose,
  categories,
  onAddPaper,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]?.id || 'gate');
  const [isCreatingNewCategory, setIsCreatingNewCategory] = useState(false);
  
  // New category fields
  const [newCatName, setNewCatName] = useState('');
  const [newCatFullName, setNewCatFullName] = useState('');
  const [newCatBody, setNewCatBody] = useState('');

  // Paper fields
  const [examName, setExamName] = useState('');
  const [streamOrSubject, setStreamOrSubject] = useState('');
  const [year, setYear] = useState<number>(2024);
  const [paperCode, setPaperCode] = useState('');
  const [shift, setShift] = useState('Forenoon Session (09:30 - 12:30)');
  const [durationMinutes, setDurationMinutes] = useState<number>(180);
  const [totalMarks, setTotalMarks] = useState<number>(100);
  const [totalQuestions, setTotalQuestions] = useState<number>(65);
  const [negativeMarking, setNegativeMarking] = useState('1/3rd mark deduction for incorrect MCQ response');
  
  // Sample Question
  const [sampleQText, setSampleQText] = useState('Sample Question: Which principle guarantees consistency in distributed transactions?');
  const [sampleSection, setSampleSection] = useState('Core Subject');
  const [optA, setOptA] = useState('CAP Theorem');
  const [optB, setOptB] = useState('ACID Properties');
  const [optC, setOptC] = useState('Two-Phase Commit');
  const [optD, setOptD] = useState('BASE Semantics');
  const [correctOption, setCorrectOption] = useState<'A' | 'B' | 'C' | 'D'>('B');
  const [explanation, setExplanation] = useState('ACID (Atomicity, Consistency, Isolation, Durability) guarantees standard database transaction consistency.');

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!examName.trim()) {
      setError('Please provide the Exam Name.');
      return;
    }
    if (!streamOrSubject.trim()) {
      setError('Please specify the Stream or Subject.');
      return;
    }

    let targetCategoryId = selectedCategory;
    let createdCategory: ExamCategory | undefined;

    if (isCreatingNewCategory) {
      if (!newCatName.trim()) {
        setError('Please provide a name for the new category.');
        return;
      }
      targetCategoryId = newCatName.toLowerCase().replace(/[^a-z0-9]/g, '-');
      createdCategory = {
        id: targetCategoryId,
        name: newCatName.trim(),
        fullName: newCatFullName.trim() || newCatName.trim(),
        badge: 'Custom Category',
        conductingBody: newCatBody.trim() || 'Official Examination Board',
        description: `Previous year question papers for ${newCatName}.`,
        streams: ['All Streams', streamOrSubject.trim()],
        availableYears: [year],
      };
    }

    const generatedPaperCode = paperCode.trim() || `${targetCategoryId.toUpperCase()}-${year}-${Math.floor(100 + Math.random() * 900)}`;

    const questions: ExamQuestion[] = [
      {
        id: `custom-q-${Date.now()}-1`,
        number: 1,
        section: sampleSection || 'General Studies / Aptitude',
        question: sampleQText.trim(),
        options: [
          { key: 'A', text: optA.trim() || 'Option A' },
          { key: 'B', text: optB.trim() || 'Option B' },
          { key: 'C', text: optC.trim() || 'Option C' },
          { key: 'D', text: optD.trim() || 'Option D' },
        ],
        correctAnswer: correctOption,
        explanation: explanation.trim() || 'Official verified answer key option.',
        marks: 1,
        negativeMarks: 0.33,
      },
    ];

    const categoryObj = createdCategory || categories.find(c => c.id === targetCategoryId);

    const newPaper: ExamPaper = {
      id: `custom-paper-${Date.now()}`,
      categoryId: targetCategoryId,
      categoryName: categoryObj?.name || 'Custom Exam',
      examName: examName.trim(),
      streamOrSubject: streamOrSubject.trim(),
      year: Number(year),
      paperCode: generatedPaperCode,
      shift: shift.trim() || undefined,
      durationMinutes: Number(durationMinutes),
      totalMarks: Number(totalMarks),
      totalQuestions: Number(totalQuestions),
      negativeMarking: negativeMarking.trim(),
      downloadCount: 1,
      fileSizeBytes: '1.5 MB',
      difficultyLevel: 'Moderate',
      instructions: [
        `Duration of the examination is ${durationMinutes} minutes.`,
        `The question paper carries a total of ${totalMarks} marks across ${totalQuestions} questions.`,
        negativeMarking.trim(),
        'Candidates must follow official examination hall instructions.',
      ],
      questions,
      isCustomAdded: true,
    };

    onAddPaper(newPaper, createdCategory);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white w-full max-w-2xl rounded-xl shadow-2xl border border-slate-300 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0f2942] text-white px-5 py-4 flex items-center justify-between border-b border-blue-900">
          <div className="flex items-center space-x-2">
            <Plus className="w-5 h-5 text-blue-300" />
            <div>
              <h2 className="text-base sm:text-lg font-bold">Add New Exam Paper</h2>
              <p className="text-xs text-slate-300">
                Easily expand repository with new previous year papers or categories
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-md transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-6 space-y-5 text-sm text-slate-700">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-md flex items-center gap-2 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md flex items-center gap-2 text-xs">
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Exam Paper added successfully! Refreshing list...</span>
            </div>
          )}

          {/* Category selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Exam Category
              </label>
              <button
                type="button"
                onClick={() => setIsCreatingNewCategory(!isCreatingNewCategory)}
                className="text-xs text-blue-700 hover:underline font-semibold"
              >
                {isCreatingNewCategory ? '← Choose Existing Category' : '+ Create New Category'}
              </button>
            </div>

            {!isCreatingNewCategory ? (
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} — {c.fullName}
                  </option>
                ))}
              </select>
            ) : (
              <div className="p-3 bg-blue-50/50 border border-blue-200 rounded-md space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    New Category Short Name (e.g. CDS, NDA, State PSC, Defence)
                  </label>
                  <input
                    type="text"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="e.g. State PSC"
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Description / Conducting Body
                  </label>
                  <input
                    type="text"
                    value={newCatFullName}
                    onChange={(e) => setNewCatFullName(e.target.value)}
                    placeholder="e.g. State Public Service Commission"
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Exam Title & Subject */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Exam Title *
              </label>
              <input
                type="text"
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                placeholder="e.g. GATE 2025 Data Science & AI"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-xs sm:text-sm focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Stream / Subject *
              </label>
              <input
                type="text"
                value={streamOrSubject}
                onChange={(e) => setStreamOrSubject(e.target.value)}
                placeholder="e.g. Data Science & AI (DA)"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-xs sm:text-sm focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
          </div>

          {/* Year & Paper Code & Shift */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Exam Year *
              </label>
              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-xs sm:text-sm"
              >
                {[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019].map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Paper Code
              </label>
              <input
                type="text"
                value={paperCode}
                onChange={(e) => setPaperCode(e.target.value)}
                placeholder="e.g. GATE-DA-25"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Shift / Session
              </label>
              <input
                type="text"
                value={shift}
                onChange={(e) => setShift(e.target.value)}
                placeholder="e.g. Forenoon Shift"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Exam Specs (Duration, Marks, Questions, Negative) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Duration (Minutes)
              </label>
              <input
                type="number"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Total Marks
              </label>
              <input
                type="number"
                value={totalMarks}
                onChange={(e) => setTotalMarks(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Total Questions
              </label>
              <input
                type="number"
                value={totalQuestions}
                onChange={(e) => setTotalQuestions(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-xs sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Negative Marking Rule
            </label>
            <input
              type="text"
              value={negativeMarking}
              onChange={(e) => setNegativeMarking(e.target.value)}
              placeholder="e.g. 1/3rd penalty for wrong answer"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-xs sm:text-sm"
            />
          </div>

          {/* Sample Question Box */}
          <div className="pt-2 border-t border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-700" />
              Primary Sample Question & Answer Key
            </h4>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-md space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  value={sampleSection}
                  onChange={(e) => setSampleSection(e.target.value)}
                  placeholder="Section (e.g. General Aptitude / Core)"
                  className="px-3 py-1.5 bg-white border border-slate-300 rounded text-xs"
                />
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-600">Correct Answer:</span>
                  {(['A', 'B', 'C', 'D'] as const).map((k) => (
                    <label key={k} className="inline-flex items-center gap-1 text-xs cursor-pointer font-bold">
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={correctOption === k}
                        onChange={() => setCorrectOption(k)}
                        className="text-blue-600"
                      />
                      <span>({k})</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <textarea
                  rows={2}
                  value={sampleQText}
                  onChange={(e) => setSampleQText(e.target.value)}
                  placeholder="Enter sample question text..."
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <input
                  type="text"
                  value={optA}
                  onChange={(e) => setOptA(e.target.value)}
                  placeholder="Option (A)"
                  className="px-2.5 py-1.5 bg-white border border-slate-300 rounded"
                />
                <input
                  type="text"
                  value={optB}
                  onChange={(e) => setOptB(e.target.value)}
                  placeholder="Option (B)"
                  className="px-2.5 py-1.5 bg-white border border-slate-300 rounded"
                />
                <input
                  type="text"
                  value={optC}
                  onChange={(e) => setOptC(e.target.value)}
                  placeholder="Option (C)"
                  className="px-2.5 py-1.5 bg-white border border-slate-300 rounded"
                />
                <input
                  type="text"
                  value={optD}
                  onChange={(e) => setOptD(e.target.value)}
                  placeholder="Option (D)"
                  className="px-2.5 py-1.5 bg-white border border-slate-300 rounded"
                />
              </div>

              <div>
                <input
                  type="text"
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="Detailed solution / explanation..."
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs"
                />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-[#0f2942] hover:bg-[#1e3a8a] rounded-md shadow-xs transition"
            >
              Save Exam Paper
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
