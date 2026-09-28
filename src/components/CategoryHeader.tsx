import React from 'react';
import { 
  Building2, 
  ExternalLink, 
  BookOpen, 
  Calendar, 
  Filter, 
  GraduationCap, 
  SlidersHorizontal 
} from 'lucide-react';
import { ExamCategory } from '../types/exam';

interface CategoryHeaderProps {
  category: ExamCategory;
  selectedStream: string;
  onSelectStream: (stream: string) => void;
  selectedYear: number | null;
  onSelectYear: (year: number | null) => void;
  availableYears: number[];
  paperCount: number;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  category,
  selectedStream,
  onSelectStream,
  selectedYear,
  onSelectYear,
  availableYears,
  paperCount,
}) => {
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-2">
          <span>Home</span>
          <span>/</span>
          <span>Exam Archives</span>
          <span>/</span>
          <span className="font-semibold text-slate-800">{category.name}</span>
        </div>

        {/* Main Category Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f2942] tracking-tight">
                {category.name} Previous Year Question Papers
              </h2>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                {category.badge}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
              {category.fullName} — {category.description}
            </p>
          </div>

          {/* Conducting Body Pill */}
          <div className="shrink-0 bg-slate-50 p-3 rounded-lg border border-slate-200 flex flex-col gap-1 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Building2 className="w-3.5 h-3.5 text-blue-700" />
              <span>Conducting Authority</span>
            </div>
            <div className="text-slate-600 font-medium">{category.conductingBody}</div>
            {category.officialWebsite && (
              <a
                href={category.officialWebsite}
                target="_blank"
                rel="noreferrer"
                className="text-blue-700 hover:text-blue-900 flex items-center gap-1 mt-0.5 font-semibold text-[11px]"
              >
                <span>Official Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Stream / Subject Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-700" />
              Stream / Subject:
            </span>
            <select
              value={selectedStream}
              onChange={(e) => onSelectStream(e.target.value)}
              className="text-xs font-medium px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-md text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {category.streams.map((stream) => (
                <option key={stream} value={stream}>
                  {stream}
                </option>
              ))}
            </select>
          </div>

          {/* Year selector pills for this category */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-xs font-semibold text-slate-600 mr-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-blue-700" />
              Year:
            </span>
            <button
              onClick={() => onSelectYear(null)}
              className={`text-xs px-3 py-1 rounded-md font-semibold transition ${
                selectedYear === null
                  ? 'bg-[#0f2942] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              All Years
            </button>
            {availableYears.map((y) => (
              <button
                key={y}
                onClick={() => onSelectYear(selectedYear === y ? null : y)}
                className={`text-xs px-2.5 py-1 rounded-md font-semibold transition ${
                  selectedYear === y
                    ? 'bg-[#0f2942] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
