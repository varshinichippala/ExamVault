import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  PlusCircle, 
  Bookmark, 
  Menu, 
  X, 
  GraduationCap, 
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { ExamCategory } from '../types/exam';

interface NavbarProps {
  categories: ExamCategory[];
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
  onOpenAddModal: () => void;
  onOpenBookmarks: () => void;
  bookmarkCount: number;
  onResetData: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  categories,
  activeCategoryId,
  onSelectCategory,
  onOpenAddModal,
  onOpenBookmarks,
  bookmarkCount,
  onResetData,
  searchQuery,
  onSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top micro bar for formal authority */}
      <div className="bg-[#0f2942] text-slate-200 text-xs px-4 py-1.5 font-medium flex items-center justify-between">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="tracking-wide">GOVERNMENT OF INDIA • NATIONAL EXAM ARCHIVES & PYQ REPOSITORY</span>
          </div>
          <div className="hidden sm:flex items-center space-x-4 text-slate-300">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
              Verified Official Question Papers & Answer Keys
            </span>
            <span className="text-slate-500">|</span>
            <button 
              onClick={onResetData}
              className="text-slate-300 hover:text-white flex items-center gap-1 transition-colors text-[11px]"
              title="Reset default papers if custom data was added"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Defaults
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Portal Identity */}
          <div 
            onClick={() => onSelectCategory(categories[0]?.id || 'gate')} 
            className="flex items-center space-x-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-lg bg-[#0f2942] text-white flex items-center justify-center font-bold shadow-sm group-hover:bg-[#1e3a8a] transition-colors">
              <GraduationCap className="w-6 h-6 text-blue-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-[#0f2942]">ExamVault</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded border border-blue-200">
                  Govt Exams
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Previous Year Question Papers • Solutions • PDF Downloads
              </p>
            </div>
          </div>

          {/* Quick Header Search on Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search papers by exam, year (e.g. GATE 2024, UPSC GS)..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:bg-white text-slate-800 placeholder-slate-400 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs bg-slate-200 hover:bg-slate-300 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            {/* Search toggle on mobile */}
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="p-2 md:hidden text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md"
              aria-label="Toggle search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Bookmarks / Saved button */}
            <button
              onClick={onOpenBookmarks}
              className="relative flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-md transition"
              title="Saved / Bookmarked Papers"
            >
              <Bookmark className="w-4 h-4 text-blue-700" />
              <span className="hidden sm:inline">Saved</span>
              {bookmarkCount > 0 && (
                <span className="bg-blue-700 text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full">
                  {bookmarkCount}
                </span>
              )}
            </button>

            {/* Add Exam Paper button */}
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-white bg-[#0f2942] hover:bg-[#1e3a8a] rounded-md shadow-xs transition"
            >
              <PlusCircle className="w-4 h-4 text-blue-300" />
              <span>Add Exam</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden text-slate-700 hover:bg-slate-100 rounded-md"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Dropdown */}
        {mobileSearchOpen && (
          <div className="mt-3 md:hidden">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search papers by exam or year..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                autoFocus
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e40af] text-slate-800"
              />
            </div>
          </div>
        )}
      </div>

      {/* Primary Category Navigation Bar */}
      <nav className="bg-slate-100 border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="hidden lg:flex items-center space-x-1 overflow-x-auto py-1 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategoryId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-4 py-2.5 text-sm font-semibold rounded-t-md transition-all whitespace-nowrap flex items-center gap-2 border-b-2 ${
                    isActive
                      ? 'bg-white text-[#0f2942] border-[#0f2942] shadow-xs'
                      : 'text-slate-600 border-transparent hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <FileText className={`w-3.5 h-3.5 ${isActive ? 'text-blue-700' : 'text-slate-400'}`} />
                  <span>{cat.name}</span>
                  <span className={`text-[11px] px-1.5 py-0.5 rounded font-medium ${
                    isActive ? 'bg-blue-100 text-blue-800' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {cat.paperCount ?? 0}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mobile Categories Collapsible */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-2 space-y-1 border-t border-slate-200">
              <div className="text-[11px] uppercase font-bold text-slate-500 px-3 py-1">
                Select Exam Category
              </div>
              {categories.map((cat) => {
                const isActive = activeCategoryId === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm font-medium rounded flex items-center justify-between ${
                      isActive ? 'bg-[#0f2942] text-white font-bold' : 'text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <FileText className={`w-4 h-4 ${isActive ? 'text-blue-300' : 'text-slate-400'}`} />
                      {cat.name} — <span className="text-xs font-normal opacity-80">{cat.fullName}</span>
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      isActive ? 'bg-blue-900 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {cat.paperCount ?? 0}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
