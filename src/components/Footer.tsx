import React from 'react';
import { ShieldCheck, GraduationCap, FileText, Heart } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  return (
    <footer className="bg-[#0f2942] text-slate-300 text-xs border-t border-slate-700 mt-16">
      {/* Top Banner Info */}
      <div className="border-b border-slate-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Identity */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded bg-blue-600 text-white flex items-center justify-center font-bold">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold tracking-tight text-white">ExamVault</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-xs">
                A non-profit open preparation archive dedicated to aspirants appearing for Indian Civil Services, Engineering, Banking, Staff Selection, and Railway competitive examinations.
              </p>
              <div className="flex items-center gap-1.5 text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Free & Authenticated PDF Archives</span>
              </div>
            </div>

            {/* Quick Links Categories */}
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
                Key Exam Categories
              </h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => onSelectCategory('gate')} className="hover:text-white transition">
                    GATE (Graduate Aptitude Test in Engineering)
                  </button>
                </li>
                <li>
                  <button onClick={() => onSelectCategory('upsc')} className="hover:text-white transition">
                    UPSC (Civil Services & Defence)
                  </button>
                </li>
                <li>
                  <button onClick={() => onSelectCategory('ssc')} className="hover:text-white transition">
                    SSC (CGL, CHSL, CPO)
                  </button>
                </li>
                <li>
                  <button onClick={() => onSelectCategory('banking')} className="hover:text-white transition">
                    Banking (SBI PO, IBPS, RBI Grade B)
                  </button>
                </li>
                <li>
                  <button onClick={() => onSelectCategory('railway')} className="hover:text-white transition">
                    Railway (RRB NTPC, Group D, JE)
                  </button>
                </li>
                <li>
                  <button onClick={() => onSelectCategory('other')} className="hover:text-white transition">
                    Other Exams (UGC NET, State PSC)
                  </button>
                </li>
              </ul>
            </div>

            {/* Official Authorities */}
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
                Official Examination Authorities
              </h4>
              <ul className="space-y-2 text-slate-400">
                <li>• Union Public Service Commission (upsc.gov.in)</li>
                <li>• National Coordination Board - GATE (IITs)</li>
                <li>• Staff Selection Commission (ssc.gov.in)</li>
                <li>• Institute of Banking Personnel Selection (ibps.in)</li>
                <li>• Ministry of Railways, Govt of India (rrbcdg.gov.in)</li>
                <li>• National Testing Agency (nta.ac.in)</li>
              </ul>
            </div>

            {/* Preparation Advice */}
            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
                Preparation Guidelines
              </h4>
              <p className="text-slate-400 leading-relaxed">
                Consistent practice with previous year question papers simulates real examination conditions, clarifies recurring concepts, and improves time management.
              </p>
              <div className="pt-2 text-slate-400">
                <span className="font-semibold text-slate-300">Format:</span> Vector-rendered PDF with answer matrices and explanatory notes.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-bar */}
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-400 text-[11px]">
        <div>
          © {new Date().getFullYear()} ExamVault • National Government Examination Archive. All papers are archived for educational and fair-use preparation.
        </div>
        <div className="flex items-center space-x-4">
          <span>Terms of Use</span>
          <span>•</span>
          <span>Privacy Policy</span>
          <span>•</span>
          <span>Open Education Initiative</span>
        </div>
      </div>
    </footer>
  );
};
