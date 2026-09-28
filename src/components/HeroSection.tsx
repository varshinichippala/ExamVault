import React from 'react';
import { Search, Download, CheckCircle, Calendar, Sparkles } from 'lucide-react';
import { ExamCategory } from '../types/exam';

interface HeroSectionProps {
  categories: ExamCategory[];
  activeCategory: ExamCategory;
  onSelectCategory: (id: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedYear: number | null;
  onSelectYear: (year: number | null) => void;
  totalPapersCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  selectedYear,
  onSelectYear,
  totalPapersCount,
}) => {
  const commonYears = [2024, 2023, 2022, 2021, 2020];

  return (
    <div className="bg-gradient-to-b from-[#0f2942] to-[#1e3a8a] text-white border-b border-blue-900/40">
      <div className="container mx-auto px-4 py-8 lg:py-10">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/80 border border-blue-400/30 text-blue-200 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            Official Government Exam Question Papers & Solutions Archive
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Previous Year Question Papers Repository
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-normal">
            Download official, authenticated previous year question papers in PDF format.
            Structured year-by-year with detailed solutions, marking schemes, and answer keys.
          </p>

          {/* Search Box */}
          <div className="pt-2 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by exam name, paper code or year (e.g., GATE 2024, UPSC GS-1, SSC CGL)..."
                className="w-full pl-12 pr-10 py-3.5 text-sm sm:text-base bg-white text-slate-900 rounded-lg shadow-md border-0 focus:ring-4 focus:ring-blue-400/40 placeholder-slate-400 outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 font-bold p-1"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Year Quick Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="text-xs text-blue-200 font-medium flex items-center gap-1 mr-1">
              <Calendar className="w-3.5 h-3.5" /> Filter Year:
            </span>
            <button
              onClick={() => onSelectYear(null)}
              className={`text-xs px-3 py-1 rounded-md font-semibold transition ${
                selectedYear === null
                  ? 'bg-white text-[#0f2942] shadow-xs'
                  : 'bg-blue-900/60 text-blue-100 hover:bg-blue-800 border border-blue-700/50'
              }`}
            >
              All Years
            </button>
            {commonYears.map((year) => (
              <button
                key={year}
                onClick={() => onSelectYear(selectedYear === year ? null : year)}
                className={`text-xs px-3 py-1 rounded-md font-semibold transition ${
                  selectedYear === year
                    ? 'bg-white text-[#0f2942] shadow-xs ring-2 ring-white/50'
                    : 'bg-blue-900/60 text-blue-100 hover:bg-blue-800 border border-blue-700/50'
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Mobile Category Horizontal Scroller */}
          <div className="lg:hidden pt-3 overflow-x-auto scrollbar-none flex items-center justify-start sm:justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition border ${
                  activeCategory.id === cat.id
                    ? 'bg-white text-[#0f2942] border-white'
                    : 'bg-blue-950/60 text-blue-100 border-blue-800 hover:bg-blue-900'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Trust Highlights */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-left max-w-3xl mx-auto border-t border-blue-800/60 mt-4">
            <div className="flex items-center gap-2 text-xs text-blue-100">
              <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>Official Answer Keys</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-blue-100">
              <Download className="w-4 h-4 text-blue-300 shrink-0" />
              <span>Instant PDF Download</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-blue-100">
              <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>Year-wise Categorized</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-blue-100">
              <span className="font-bold text-white">{totalPapersCount}+</span>
              <span>Available Papers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
