import React, { useState } from 'react';
import { 
  Download, 
  FileText, 
  Clock, 
  Award, 
  HelpCircle, 
  Eye, 
  Bookmark, 
  Check, 
  AlertCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { ExamPaper } from '../types/exam';
import { generateExamPaperPDF } from '../utils/pdfGenerator';

interface PaperCardProps {
  paper: ExamPaper;
  onPreview: (paper: ExamPaper) => void;
  isBookmarked: boolean;
  onToggleBookmark: (paperId: string) => void;
}

export const PaperCard: React.FC<PaperCardProps> = ({
  paper,
  onPreview,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloading(true);
    try {
      generateExamPaperPDF(paper);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('PDF Generation failed:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between group">
      {/* Top Header Row */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Year Badge */}
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-[#0f2942] text-white">
              {paper.year}
            </span>
            {/* Stream / Subject Badge */}
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
              {paper.streamOrSubject}
            </span>
            {/* Shift info if any */}
            {paper.shift && (
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[11px] font-normal text-slate-500 bg-slate-50 border border-slate-200">
                {paper.shift}
              </span>
            )}
            {paper.isCustomAdded && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                Custom Added
              </span>
            )}
          </div>

          {/* Bookmark Button */}
          <button
            onClick={() => onToggleBookmark(paper.id)}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark this paper'}
            className={`p-1.5 rounded-md transition ${
              isBookmarked 
                ? 'text-blue-700 bg-blue-50' 
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-blue-700' : ''}`} />
          </button>
        </div>

        {/* Paper Title */}
        <h3 
          onClick={() => onPreview(paper)}
          className="text-base font-bold text-slate-900 group-hover:text-blue-900 cursor-pointer transition-colors leading-snug mb-1"
        >
          {paper.examName}
        </h3>

        {/* Paper Code and Details */}
        <div className="text-xs text-slate-500 flex items-center gap-2 mb-3">
          <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
            {paper.paperCode}
          </span>
          <span>•</span>
          <span>{paper.fileSizeBytes} PDF</span>
          <span>•</span>
          <span className="text-slate-500">{paper.downloadCount.toLocaleString()} downloads</span>
        </div>

        {/* Key Examination Specs Grid */}
        <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-slate-50 rounded-md border border-slate-100 text-xs text-slate-700 mb-4">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-700 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-600 uppercase font-semibold">Duration</div>
              <div className="font-semibold text-slate-800">{paper.durationMinutes} mins</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 border-x border-slate-200 px-2">
            <Award className="w-3.5 h-3.5 text-blue-700 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-600 uppercase font-semibold">Total Marks</div>
              <div className="font-semibold text-slate-800">{paper.totalMarks} Marks</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 pl-1">
            <HelpCircle className="w-3.5 h-3.5 text-blue-700 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-600 uppercase font-semibold">Questions</div>
              <div className="font-semibold text-slate-800">{paper.totalQuestions} Qs</div>
            </div>
          </div>
        </div>

        {/* Negative marking clause */}
        <div className="text-[11px] text-slate-600 flex items-start gap-1.5 mb-4 line-clamp-1">
          <AlertCircle className="w-3 h-3 text-amber-600 shrink-0 mt-0.5" />
          <span>Marking: {paper.negativeMarking}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
        {/* Primary Download PDF Button */}
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-md text-white bg-[#0f2942] hover:bg-[#1e3a8a] transition shadow-xs disabled:opacity-75"
        >
          {downloading ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Generating PDF...</span>
            </>
          ) : downloadSuccess ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Downloaded!</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5 text-blue-200" />
              <span>Download PDF</span>
            </>
          )}
        </button>

        {/* Preview / Read Online Button */}
        <button
          onClick={() => onPreview(paper)}
          className="flex items-center justify-center gap-1 py-2 px-3 text-xs font-semibold rounded-md text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition"
          title="Preview questions and solutions online"
        >
          <Eye className="w-3.5 h-3.5 text-slate-600" />
          <span className="hidden sm:inline">Preview</span>
        </button>
      </div>
    </div>
  );
};
