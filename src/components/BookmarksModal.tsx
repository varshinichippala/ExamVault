import React from 'react';
import { X, Bookmark, Download, Trash2, ArrowRight } from 'lucide-react';
import { ExamPaper } from '../types/exam';
import { generateExamPaperPDF } from '../utils/pdfGenerator';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedPapers: ExamPaper[];
  onRemoveBookmark: (id: string) => void;
  onClearAll: () => void;
  onPreviewPaper: (paper: ExamPaper) => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  isOpen,
  onClose,
  savedPapers,
  onRemoveBookmark,
  onClearAll,
  onPreviewPaper,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white w-full max-w-2xl rounded-xl shadow-2xl border border-slate-300 overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#0f2942] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-blue-300 fill-blue-300" />
            <h2 className="text-base sm:text-lg font-bold">Saved Previous Papers ({savedPapers.length})</h2>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-5 space-y-3 flex-1">
          {savedPapers.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <Bookmark className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">No saved papers yet</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Click the bookmark icon on any exam paper card to save it here for quick revision and offline practice.
              </p>
            </div>
          ) : (
            savedPapers.map((paper) => (
              <div
                key={paper.id}
                className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between gap-3 hover:border-slate-300 transition"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold bg-[#0f2942] text-white px-1.5 py-0.2 rounded">
                      {paper.year}
                    </span>
                    <span className="text-[11px] font-semibold text-blue-800 bg-blue-100 px-1.5 py-0.2 rounded">
                      {paper.categoryName}
                    </span>
                    <span className="text-xs text-slate-500 font-mono truncate">{paper.paperCode}</span>
                  </div>
                  <h4 
                    onClick={() => {
                      onClose();
                      onPreviewPaper(paper);
                    }}
                    className="text-sm font-bold text-slate-900 truncate cursor-pointer hover:text-blue-800"
                  >
                    {paper.examName}
                  </h4>
                  <div className="text-xs text-slate-500">
                    {paper.streamOrSubject} • {paper.durationMinutes} mins • {paper.totalMarks} marks
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => generateExamPaperPDF(paper)}
                    className="p-2 bg-white hover:bg-slate-100 border border-slate-300 rounded text-slate-700 text-xs flex items-center gap-1 font-medium transition"
                    title="Download PDF"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-700" />
                    <span className="hidden sm:inline">PDF</span>
                  </button>
                  <button
                    onClick={() => onRemoveBookmark(paper.id)}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded transition"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {savedPapers.length > 0 && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs text-rose-600 hover:underline font-medium"
            >
              Clear All Saved
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-[#0f2942] hover:bg-[#1e3a8a] text-white rounded text-xs font-semibold"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
