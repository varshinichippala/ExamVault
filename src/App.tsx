import React, { useState, useEffect, useMemo } from 'react';
import { 
  FileText, 
  Calendar, 
  Download, 
  Search, 
  Layers, 
  Sparkles, 
  HelpCircle, 
  Plus, 
  AlertCircle,
  FolderOpen,
  Filter
} from 'lucide-react';
import { ExamCategory, ExamPaper } from './types/exam';
import { DEFAULT_CATEGORIES, DEFAULT_PAPERS } from './data/defaultExams';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryHeader } from './components/CategoryHeader';
import { ExamGuideCard } from './components/ExamGuideCard';
import { PaperCard } from './components/PaperCard';
import { PaperPreviewModal } from './components/PaperPreviewModal';
import { AddExamModal } from './components/AddExamModal';
import { BookmarksModal } from './components/BookmarksModal';
import { Footer } from './components/Footer';
import { ChatbotWidget } from './components/ChatbotWidget';

const STORAGE_KEY_PAPERS = 'examvault_papers_v1';
const STORAGE_KEY_CATEGORIES = 'examvault_categories_v1';
const STORAGE_KEY_BOOKMARKS = 'examvault_bookmarks_v1';

export default function App() {
  // Categories state
  const [categories, setCategories] = useState<ExamCategory[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CATEGORIES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading categories from localStorage', e);
    }
    return DEFAULT_CATEGORIES;
  });

  // Papers state
  const [papers, setPapers] = useState<ExamPaper[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PAPERS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading papers from localStorage', e);
    }
    return DEFAULT_PAPERS;
  });

  // Active Category state
  const [activeCategoryId, setActiveCategoryId] = useState<string>('gate');

  // Search & Filters state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedStream, setSelectedStream] = useState<string>('All Streams');

  // Modals state
  const [previewPaper, setPreviewPaper] = useState<ExamPaper | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);

  // Bookmarks state
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BOOKMARKS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading bookmarks', e);
    }
    return [];
  });

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PAPERS, JSON.stringify(papers));
    } catch (e) {
      console.error('Failed saving papers', e);
    }
  }, [papers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(categories));
    } catch (e) {
      console.error('Failed saving categories', e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.error('Failed saving bookmarks', e);
    }
  }, [bookmarkedIds]);

  // Compute paper counts for each category
  const categoriesWithCounts = useMemo(() => {
    return categories.map((cat) => {
      const count = papers.filter((p) => p.categoryId === cat.id).length;
      return {
        ...cat,
        paperCount: count,
      };
    });
  }, [categories, papers]);

  // Active category object
  const activeCategory = useMemo(() => {
    return categoriesWithCounts.find((c) => c.id === activeCategoryId) || categoriesWithCounts[0];
  }, [categoriesWithCounts, activeCategoryId]);

  // Switch category handler (resets stream filter)
  const handleSelectCategory = (catId: string) => {
    setActiveCategoryId(catId);
    setSelectedStream('All Streams');
  };

  // Toggle bookmark handler
  const handleToggleBookmark = (paperId: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(paperId) ? prev.filter((id) => id !== paperId) : [...prev, paperId]
    );
  };

  // Add new paper & optional new category handler
  const handleAddPaper = (newPaper: ExamPaper, newCat?: ExamCategory) => {
    if (newCat) {
      setCategories((prev) => [...prev, newCat]);
      setActiveCategoryId(newCat.id);
    } else {
      setActiveCategoryId(newPaper.categoryId);
    }
    setPapers((prev) => [newPaper, ...prev]);
  };

  // Reset to default dataset handler
  const handleResetData = () => {
    if (window.confirm('Reset all papers and categories to official initial repository? Any custom-added exams will be refreshed.')) {
      setCategories(DEFAULT_CATEGORIES);
      setPapers(DEFAULT_PAPERS);
      setBookmarkedIds([]);
      localStorage.removeItem(STORAGE_KEY_PAPERS);
      localStorage.removeItem(STORAGE_KEY_CATEGORIES);
      localStorage.removeItem(STORAGE_KEY_BOOKMARKS);
    }
  };

  // Filtered papers logic
  const filteredPapers = useMemo(() => {
    return papers.filter((p) => {
      // If user typed in search query, search globally or within category
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery =
          p.examName.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.streamOrSubject.toLowerCase().includes(q) ||
          p.paperCode.toLowerCase().includes(q) ||
          p.year.toString().includes(q);

        if (!matchesQuery) return false;
      } else {
        // Without global search query, strictly constrain to active category
        if (p.categoryId !== activeCategoryId) return false;
      }

      // Year filter
      if (selectedYear !== null && p.year !== selectedYear) {
        return false;
      }

      // Stream filter
      if (selectedStream !== 'All Streams') {
        if (!p.streamOrSubject.toLowerCase().includes(selectedStream.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  }, [papers, activeCategoryId, searchQuery, selectedYear, selectedStream]);

  // Group papers by Year (e.g. 2024, 2023, 2022, 2021, 2020)
  const papersGroupedByYear = useMemo(() => {
    const map = new Map<number, ExamPaper[]>();
    filteredPapers.forEach((paper) => {
      const year = paper.year;
      if (!map.has(year)) {
        map.set(year, []);
      }
      map.get(year)!.push(paper);
    });

    // Sort years descending (newest first)
    return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
  }, [filteredPapers]);

  // Saved papers list
  const savedPapers = useMemo(() => {
    return papers.filter((p) => bookmarkedIds.includes(p.id));
  }, [papers, bookmarkedIds]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-[Inter,sans-serif]">
      {/* Top Navbar */}
      <Navbar
        categories={categoriesWithCounts}
        activeCategoryId={activeCategoryId}
        onSelectCategory={handleSelectCategory}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        bookmarkCount={bookmarkedIds.length}
        onResetData={handleResetData}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Section */}
      <HeroSection
        categories={categoriesWithCounts}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedYear={selectedYear}
        onSelectYear={setSelectedYear}
        totalPapersCount={papers.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* If Search is NOT active, show official category header & syllabus guide */}
        {!searchQuery && (
          <>
            <CategoryHeader
              category={activeCategory}
              selectedStream={selectedStream}
              onSelectStream={setSelectedStream}
              selectedYear={selectedYear}
              onSelectYear={setSelectedYear}
              availableYears={activeCategory.availableYears || [2024, 2023, 2022, 2021, 2020]}
              paperCount={filteredPapers.length}
            />

            <div className="container mx-auto px-4 pt-6">
              <ExamGuideCard category={activeCategory} />
            </div>
          </>
        )}

        {/* Global Search Results Announcement Banner */}
        {searchQuery && (
          <div className="bg-blue-50 border-b border-blue-200 py-4">
            <div className="container mx-auto px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
                  Search Results
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  Showing results for &ldquo;<span className="text-blue-700">{searchQuery}</span>&rdquo;
                </h2>
                <p className="text-xs text-slate-600">
                  Found {filteredPapers.length} matching question paper{filteredPapers.length === 1 ? '' : 's'} across archives
                </p>
              </div>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-blue-700 hover:text-blue-900 font-semibold underline self-start sm:self-auto"
              >
                Clear Search & Return to {activeCategory.name}
              </button>
            </div>
          </div>
        )}

        {/* Papers Organized by Year Section */}
        <div className="container mx-auto px-4 py-8">
          {papersGroupedByYear.length === 0 ? (
            /* Empty State */
            <div className="bg-white rounded-xl border border-slate-200 p-10 text-center max-w-lg mx-auto shadow-xs space-y-4 my-8">
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <FolderOpen className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-800">No question papers found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No previous year papers match your current selection {selectedYear ? `for year ${selectedYear}` : ''} {selectedStream !== 'All Streams' ? `in stream "${selectedStream}"` : ''}.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {selectedYear && (
                  <button
                    onClick={() => setSelectedYear(null)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-md"
                  >
                    Clear Year Filter
                  </button>
                )}
                {selectedStream !== 'All Streams' && (
                  <button
                    onClick={() => setSelectedStream('All Streams')}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-md"
                  >
                    Reset Stream Filter
                  </button>
                )}
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-3 py-1.5 bg-[#0f2942] hover:bg-[#1e3a8a] text-white text-xs font-medium rounded-md flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add This Paper Now
                </button>
              </div>
            </div>
          ) : (
            /* Year-Grouped Papers List */
            <div className="space-y-10">
              {papersGroupedByYear.map(([year, yearPapers]) => (
                <section key={year} className="space-y-4">
                  {/* Year Header Bar */}
                  <div className="flex items-center justify-between border-b-2 border-slate-200 pb-2">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded bg-[#0f2942] text-white font-bold text-sm">
                        {year}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#0f2942]">
                          Examination Papers of {year}
                        </h3>
                        <p className="text-xs text-slate-500">
                          {yearPapers.length} authenticated question paper{yearPapers.length === 1 ? '' : 's'} available
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                      {yearPapers.length} Paper{yearPapers.length === 1 ? '' : 's'}
                    </span>
                  </div>

                  {/* Responsive Grid of Paper Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {yearPapers.map((paper) => (
                      <PaperCard
                        key={paper.id}
                        paper={paper}
                        onPreview={setPreviewPaper}
                        isBookmarked={bookmarkedIds.includes(paper.id)}
                        onToggleBookmark={handleToggleBookmark}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Online Paper Viewer Modal */}
      <PaperPreviewModal
        paper={previewPaper}
        onClose={() => setPreviewPaper(null)}
      />

      {/* Add New Exam Paper Modal */}
      <AddExamModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        categories={categories}
        onAddPaper={handleAddPaper}
      />

      {/* Bookmarks / Saved Papers Drawer Modal */}
      <BookmarksModal
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        savedPapers={savedPapers}
        onRemoveBookmark={handleToggleBookmark}
        onClearAll={() => setBookmarkedIds([])}
        onPreviewPaper={setPreviewPaper}
      />

      {/* Formal Portal Footer */}
      <Footer onSelectCategory={handleSelectCategory} />

      {/* n8n AI Chatbot Widget */}
      <ChatbotWidget
        currentCategory={activeCategory?.name}
        activeYear={selectedYear}
      />
    </div>
  );
}
