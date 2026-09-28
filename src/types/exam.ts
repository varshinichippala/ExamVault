export interface QuestionOption {
  key: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface ExamQuestion {
  id: string;
  number: number;
  section: string;
  question: string;
  options: QuestionOption[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  marks: number;
  negativeMarks?: number;
}

export interface ExamPaper {
  id: string;
  categoryId: string; // e.g., 'gate', 'upsc', 'ssc', 'banking', 'railway', 'other'
  categoryName: string;
  examName: string; // e.g. "GATE 2024 Computer Science and Information Technology"
  streamOrSubject: string; // e.g. "Computer Science & IT (CS)", "General Studies (Paper-I)"
  year: number; // e.g. 2024, 2023, 2022, 2021, 2020
  paperCode: string; // e.g. "GATE-CS-24-S1", "UPSC-CSP-23-GS1"
  shift?: string; // e.g. "Shift 1 (Forenoon)", "Shift 2 (Afternoon)"
  durationMinutes: number;
  totalMarks: number;
  totalQuestions: number;
  negativeMarking: string; // e.g. "0.33 mark for 1-mark MCQ, 0.66 for 2-mark"
  downloadCount: number;
  fileSizeBytes: string; // e.g. "2.4 MB"
  difficultyLevel: 'Moderate' | 'Hard' | 'Moderate-Hard' | 'Standard';
  instructions: string[];
  questions: ExamQuestion[];
  isCustomAdded?: boolean;
}

export interface ExamCategory {
  id: string;
  name: string;
  fullName: string;
  badge: string;
  conductingBody: string;
  officialWebsite?: string;
  description: string;
  streams: string[];
  availableYears: number[];
  paperCount?: number;
}
