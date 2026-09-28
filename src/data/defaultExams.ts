import { ExamCategory, ExamPaper } from '../types/exam';

export const DEFAULT_CATEGORIES: ExamCategory[] = [
  {
    id: 'gate',
    name: 'GATE',
    fullName: 'Graduate Aptitude Test in Engineering',
    badge: 'Technical & PSU',
    conductingBody: 'IITs & IISc on behalf of NCB-GATE, MoE',
    officialWebsite: 'https://gate2024.iisc.ac.in',
    description: 'National examination testing comprehensive understanding in undergraduate subjects of Engineering, Technology, Architecture, and Science for M.Tech admissions and PSU recruitment.',
    streams: ['All Streams', 'Computer Science & IT (CS)', 'Mechanical Engineering (ME)', 'Electrical Engineering (EE)', 'Civil Engineering (CE)', 'Electronics & Communication (EC)'],
    availableYears: [2024, 2023, 2022, 2021, 2020],
  },
  {
    id: 'upsc',
    name: 'UPSC',
    fullName: 'Union Public Service Commission',
    badge: 'Civil Services & Defence',
    conductingBody: 'Union Public Service Commission, Government of India',
    officialWebsite: 'https://upsc.gov.in',
    description: 'Premier central recruiting agency for appointments to Civil Services of India (IAS, IPS, IFS, IRS) and Central Civil Services.',
    streams: ['All Streams', 'General Studies (Paper-I)', 'CSAT / Aptitude (Paper-II)', 'Combined Defence Services (CDS)', 'National Defence Academy (NDA)'],
    availableYears: [2024, 2023, 2022, 2021, 2020],
  },
  {
    id: 'ssc',
    name: 'SSC',
    fullName: 'Staff Selection Commission',
    badge: 'Central Ministries',
    conductingBody: 'Staff Selection Commission, Department of Personnel & Training',
    officialWebsite: 'https://ssc.gov.in',
    description: 'Recruitment examination to recruit staff for various posts in ministries, departments, and subordinate offices of the Government of India.',
    streams: ['All Streams', 'CGL Tier-I (Combined Graduate Level)', 'CGL Tier-II (Advanced)', 'CHSL (Combined Higher Secondary)', 'SSC CPO (Sub-Inspector)'],
    availableYears: [2024, 2023, 2022, 2021, 2020],
  },
  {
    id: 'banking',
    name: 'Banking',
    fullName: 'Banking & Financial Institutions',
    badge: 'IBPS / SBI / RBI',
    conductingBody: 'Institute of Banking Personnel Selection & Reserve Bank of India',
    officialWebsite: 'https://ibps.in',
    description: 'Competitive examinations for probationary officers, specialist officers, and clerical cadres across public sector commercial banks and the central bank.',
    streams: ['All Streams', 'SBI PO Prelims', 'SBI PO Mains', 'IBPS PO Prelims', 'IBPS PO Mains', 'RBI Grade B Officer'],
    availableYears: [2024, 2023, 2022, 2021, 2020],
  },
  {
    id: 'railway',
    name: 'Railway',
    fullName: 'Railway Recruitment Boards (RRB)',
    badge: 'Indian Railways',
    conductingBody: 'Ministry of Railways, Government of India',
    officialWebsite: 'https://indianrailways.gov.in',
    description: 'Nationwide recruitment drives for technical, non-technical popular categories (NTPC), Junior Engineers, and Group D track and operation staff.',
    streams: ['All Streams', 'RRB NTPC Stage-1 (CBT-1)', 'RRB NTPC Stage-2 (CBT-2)', 'RRB JE (Junior Engineer)', 'RRB Group D (Level 1)'],
    availableYears: [2024, 2023, 2022, 2021, 2020],
  },
  {
    id: 'other',
    name: 'Other exams',
    fullName: 'State PSC, UGC NET & Teaching',
    badge: 'National & State',
    conductingBody: 'NTA, State Public Service Commissions & Defence Authorities',
    officialWebsite: 'https://nta.ac.in',
    description: 'National and state level examinations including National Eligibility Test (UGC NET), State Civil Services (BPSC, UPPSC, MPPSC), and Central Teacher Eligibility.',
    streams: ['All Streams', 'UGC NET Paper-I (Teaching & Research)', 'State PSC Prelims GS', 'CTET (Central Teacher Eligibility)', 'LIC AAO (Generalist)'],
    availableYears: [2024, 2023, 2022, 2021, 2020],
  },
];

export const DEFAULT_PAPERS: ExamPaper[] = [
  // --- GATE PAPERS ---
  {
    id: 'gate-cs-2024-s1',
    categoryId: 'gate',
    categoryName: 'GATE',
    examName: 'GATE 2024 Computer Science & Information Technology',
    streamOrSubject: 'Computer Science & IT (CS)',
    year: 2024,
    paperCode: 'GATE-CS-2024-SET1',
    shift: 'Forenoon Session (09:30 - 12:30)',
    durationMinutes: 180,
    totalMarks: 100,
    totalQuestions: 65,
    negativeMarking: '1/3 mark deducted for 1-mark MCQs; 2/3 mark deducted for 2-mark MCQs; No negative marking for MSQ and NAT',
    downloadCount: 38420,
    fileSizeBytes: '1.8 MB',
    difficultyLevel: 'Moderate-Hard',
    instructions: [
      'The total duration of the examination is 180 minutes.',
      'The question paper contains 65 questions carrying a total of 100 marks.',
      'Questions 1 to 10 belong to General Aptitude (GA) and carry 15 marks.',
      'Questions 11 to 65 belong to Computer Science and carry 85 marks.',
      'Use of physical calculators is prohibited. Virtual scientific calculator is provided on screen.'
    ],
    questions: [
      {
        id: 'gcs24-1',
        number: 1,
        section: 'General Aptitude (GA)',
        question: 'Select the word that is opposite in meaning to "PRAGMATIC":',
        options: [
          { key: 'A', text: 'Realistic' },
          { key: 'B', text: 'Idealistic' },
          { key: 'C', text: 'Rational' },
          { key: 'D', text: 'Sensible' }
        ],
        correctAnswer: 'B',
        explanation: '"Pragmatic" means dealing with things sensibly and realistically based on practical considerations. Its antonym is "Idealistic" (guided by ideals rather than practical matters).',
        marks: 1,
        negativeMarks: 0.33
      },
      {
        id: 'gcs24-2',
        number: 2,
        section: 'General Aptitude (GA)',
        question: 'If 40% of a number is equal to two-third of another number, what is the ratio of the first number to the second number?',
        options: [
          { key: 'A', text: '2 : 5' },
          { key: 'B', text: '3 : 7' },
          { key: 'C', text: '5 : 3' },
          { key: 'D', text: '7 : 3' }
        ],
        correctAnswer: 'C',
        explanation: 'Let numbers be X and Y. 40% of X = (2/3)Y => (40/100)X = (2/3)Y => (2/5)X = (2/3)Y => X / Y = (2/3) * (5/2) = 5/3 => 5:3.',
        marks: 1,
        negativeMarks: 0.33
      },
      {
        id: 'gcs24-3',
        number: 3,
        section: 'Computer Science Core',
        question: 'Consider a min-heap with n elements. What is the worst-case time complexity to find the maximum element in this min-heap?',
        options: [
          { key: 'A', text: 'O(1)' },
          { key: 'B', text: 'O(log n)' },
          { key: 'C', text: 'O(n)' },
          { key: 'D', text: 'O(n log n)' }
        ],
        correctAnswer: 'C',
        explanation: 'In a min-heap, the maximum element must reside in one of the leaf nodes. There are ceil(n/2) leaf nodes. Finding the maximum requires linear scan through all leaves, hence O(n).',
        marks: 2,
        negativeMarks: 0.66
      },
      {
        id: 'gcs24-4',
        number: 4,
        section: 'Computer Science Core',
        question: 'Which of the following relational algebra expressions is equivalent to the SQL query: SELECT DISTINCT name FROM Student WHERE marks > 80?',
        options: [
          { key: 'A', text: 'π_{name}(σ_{marks > 80}(Student))' },
          { key: 'B', text: 'σ_{name}(π_{marks > 80}(Student))' },
          { key: 'C', text: 'ρ_{name}(σ_{marks > 80}(Student))' },
          { key: 'D', text: 'π_{marks > 80}(σ_{name}(Student))' }
        ],
        correctAnswer: 'A',
        explanation: 'Selection operator σ filters rows where marks > 80. Projection operator π projects the attribute "name" and eliminates duplicates by definition of relational algebra set semantics.',
        marks: 2,
        negativeMarks: 0.66
      }
    ]
  },
  {
    id: 'gate-cs-2023-s1',
    categoryId: 'gate',
    categoryName: 'GATE',
    examName: 'GATE 2023 Computer Science & Information Technology',
    streamOrSubject: 'Computer Science & IT (CS)',
    year: 2023,
    paperCode: 'GATE-CS-2023-SET1',
    shift: 'Forenoon Session (09:30 - 12:30)',
    durationMinutes: 180,
    totalMarks: 100,
    totalQuestions: 65,
    negativeMarking: '1/3 mark for 1-mark MCQ; 2/3 mark for 2-mark MCQ',
    downloadCount: 42100,
    fileSizeBytes: '1.9 MB',
    difficultyLevel: 'Hard',
    instructions: [
      'The exam contains 65 questions totaling 100 marks.',
      'Section 1: General Aptitude (15 marks), Section 2: Technical Subject (85 marks).',
      'Questions consist of MCQs, MSQs (Multiple Select Questions), and NATs (Numerical Answer Type).'
    ],
    questions: [
      {
        id: 'gcs23-1',
        number: 1,
        section: 'General Aptitude (GA)',
        question: 'Fill in the blank with the appropriate preposition: He was acquitted _____ all charges filed against him.',
        options: [
          { key: 'A', text: 'from' },
          { key: 'B', text: 'of' },
          { key: 'C', text: 'with' },
          { key: 'D', text: 'by' }
        ],
        correctAnswer: 'B',
        explanation: 'The verb "acquit" correctly takes the preposition "of" in formal English: "acquitted of all charges".',
        marks: 1,
        negativeMarks: 0.33
      },
      {
        id: 'gcs23-2',
        number: 2,
        section: 'Computer Science Core',
        question: 'Which of the following scheduling algorithms is strictly non-preemptive?',
        options: [
          { key: 'A', text: 'Round Robin' },
          { key: 'B', text: 'First-Come First-Served (FCFS)' },
          { key: 'C', text: 'Shortest Remaining Time First (SRTF)' },
          { key: 'D', text: 'Preemptive Priority Scheduling' }
        ],
        correctAnswer: 'B',
        explanation: 'FCFS allocates CPU to processes in order of arrival and runs each process until completion or I/O request, making it non-preemptive.',
        marks: 1,
        negativeMarks: 0.33
      }
    ]
  },
  {
    id: 'gate-me-2024-s1',
    categoryId: 'gate',
    categoryName: 'GATE',
    examName: 'GATE 2024 Mechanical Engineering',
    streamOrSubject: 'Mechanical Engineering (ME)',
    year: 2024,
    paperCode: 'GATE-ME-2024-SET1',
    shift: 'Afternoon Session (14:30 - 17:30)',
    durationMinutes: 180,
    totalMarks: 100,
    totalQuestions: 65,
    negativeMarking: 'Standard GATE negative marking',
    downloadCount: 29500,
    fileSizeBytes: '2.1 MB',
    difficultyLevel: 'Moderate',
    instructions: [
      'Questions 1 to 65 with total 100 marks.',
      'Thermodynamics, Fluid Mechanics, Strength of Materials, and Manufacturing Engineering.'
    ],
    questions: [
      {
        id: 'gme24-1',
        number: 1,
        section: 'Thermodynamics',
        question: 'The efficiency of an ideal Carnot engine operating between temperatures T1 (source) and T2 (sink) is given by:',
        options: [
          { key: 'A', text: '1 - (T2 / T1)' },
          { key: 'B', text: '1 - (T1 / T2)' },
          { key: 'C', text: '(T1 + T2) / T1' },
          { key: 'D', text: 'T2 / (T1 - T2)' }
        ],
        correctAnswer: 'A',
        explanation: 'Carnot cycle efficiency η = 1 - (TL / TH) = 1 - (T2 / T1) where temperatures are in Kelvin.',
        marks: 1,
        negativeMarks: 0.33
      }
    ]
  },
  {
    id: 'gate-ee-2024-s1',
    categoryId: 'gate',
    categoryName: 'GATE',
    examName: 'GATE 2024 Electrical Engineering',
    streamOrSubject: 'Electrical Engineering (EE)',
    year: 2024,
    paperCode: 'GATE-EE-2024-SET1',
    shift: 'Forenoon Session (09:30 - 12:30)',
    durationMinutes: 180,
    totalMarks: 100,
    totalQuestions: 65,
    negativeMarking: '1/3 mark for 1-mark MCQs',
    downloadCount: 27800,
    fileSizeBytes: '2.0 MB',
    difficultyLevel: 'Moderate-Hard',
    instructions: ['180 minutes duration. Covers Electrical Circuits, Power Systems, Control Systems, and Machines.'],
    questions: [
      {
        id: 'gee24-1',
        number: 1,
        section: 'Network Theory',
        question: 'The maximum power transfer theorem states that maximum power is transferred when load resistance is equal to:',
        options: [
          { key: 'A', text: 'Zero' },
          { key: 'B', text: 'Thevenin equivalent resistance of the source' },
          { key: 'C', text: 'Twice the Thevenin resistance' },
          { key: 'D', text: 'Infinity' }
        ],
        correctAnswer: 'B',
        explanation: 'For maximum power transfer from a linear DC source network to a resistive load, RL must equal the internal source Thevenin resistance Rth.',
        marks: 1,
        negativeMarks: 0.33
      }
    ]
  },
  {
    id: 'gate-cs-2022-s1',
    categoryId: 'gate',
    categoryName: 'GATE',
    examName: 'GATE 2022 Computer Science & Information Technology',
    streamOrSubject: 'Computer Science & IT (CS)',
    year: 2022,
    paperCode: 'GATE-CS-2022-SET1',
    shift: 'Forenoon Session',
    durationMinutes: 180,
    totalMarks: 100,
    totalQuestions: 65,
    negativeMarking: 'Standard 1/3 and 2/3 penalty',
    downloadCount: 39100,
    fileSizeBytes: '1.7 MB',
    difficultyLevel: 'Moderate',
    instructions: ['65 Questions, 100 Marks. Conducted by IIT Kharagpur.'],
    questions: [
      {
        id: 'gcs22-1',
        number: 1,
        section: 'Theory of Computation',
        question: 'Which of the following problems is decidable for context-free languages (CFLs)?',
        options: [
          { key: 'A', text: 'Emptiness problem (Is L = ∅?)' },
          { key: 'B', text: 'Universality problem (Is L = Σ*?)' },
          { key: 'C', text: 'Equivalence problem (Is L1 = L2?)' },
          { key: 'D', text: 'Inclusion problem (Is L1 ⊆ L2?)' }
        ],
        correctAnswer: 'A',
        explanation: 'For Context-Free Languages, the Emptiness problem, Finiteness problem, and Membership problem are decidable. Universality, Equivalence, and Inclusion are undecidable.',
        marks: 2,
        negativeMarks: 0.66
      }
    ]
  },
  {
    id: 'gate-cs-2021-s1',
    categoryId: 'gate',
    categoryName: 'GATE',
    examName: 'GATE 2021 Computer Science & Information Technology',
    streamOrSubject: 'Computer Science & IT (CS)',
    year: 2021,
    paperCode: 'GATE-CS-2021-SET1',
    shift: 'Forenoon Session',
    durationMinutes: 180,
    totalMarks: 100,
    totalQuestions: 65,
    negativeMarking: 'Standard GATE negative marking',
    downloadCount: 36700,
    fileSizeBytes: '1.6 MB',
    difficultyLevel: 'Moderate',
    instructions: ['Conducted by IIT Bombay.'],
    questions: [
      {
        id: 'gcs21-1',
        number: 1,
        section: 'Computer Networks',
        question: 'In TCP, what mechanism is primarily used for flow control?',
        options: [
          { key: 'A', text: 'Congestion Window (cwnd)' },
          { key: 'B', text: 'Receive Window (rwnd)' },
          { key: 'C', text: 'Slow Start Threshold (ssthresh)' },
          { key: 'D', text: 'Checksum verification' }
        ],
        correctAnswer: 'B',
        explanation: 'Receive Window (rwnd) sent in the TCP header advertises available buffer space on the receiver, enforcing end-to-end flow control to prevent buffer overrun.',
        marks: 1,
        negativeMarks: 0.33
      }
    ]
  },
  {
    id: 'gate-cs-2020-s1',
    categoryId: 'gate',
    categoryName: 'GATE',
    examName: 'GATE 2020 Computer Science & Information Technology',
    streamOrSubject: 'Computer Science & IT (CS)',
    year: 2020,
    paperCode: 'GATE-CS-2020-SET1',
    shift: 'Forenoon Session',
    durationMinutes: 180,
    totalMarks: 100,
    totalQuestions: 65,
    negativeMarking: 'Standard GATE marking scheme',
    downloadCount: 34200,
    fileSizeBytes: '1.6 MB',
    difficultyLevel: 'Standard',
    instructions: ['Conducted by IIT Delhi.'],
    questions: [
      {
        id: 'gcs20-1',
        number: 1,
        section: 'Algorithms',
        question: 'What is the tight worst-case asymptotic running time of merge sort algorithm on an array of size n?',
        options: [
          { key: 'A', text: 'O(n)' },
          { key: 'B', text: 'O(n log n)' },
          { key: 'C', text: 'O(n²)' },
          { key: 'D', text: 'O(2^n)' }
        ],
        correctAnswer: 'B',
        explanation: 'Merge sort follows recurrence T(n) = 2T(n/2) + O(n), which solves to Θ(n log n) in all cases (worst, average, and best).',
        marks: 1,
        negativeMarks: 0.33
      }
    ]
  },

  // --- UPSC PAPERS ---
  {
    id: 'upsc-csp-2024-gs1',
    categoryId: 'upsc',
    categoryName: 'UPSC',
    examName: 'UPSC Civil Services (Preliminary) Examination 2024',
    streamOrSubject: 'General Studies (Paper-I)',
    year: 2024,
    paperCode: 'UPSC-CSP-2024-GS1-A',
    shift: 'Morning Session (09:30 - 11:30)',
    durationMinutes: 120,
    totalMarks: 200,
    totalQuestions: 100,
    negativeMarking: '0.66 mark (1/3rd penalty) for each wrong answer',
    downloadCount: 71200,
    fileSizeBytes: '2.5 MB',
    difficultyLevel: 'Hard',
    instructions: [
      'This question paper contains 100 objective type items (questions).',
      'Each question carries 2 marks.',
      'There will be a penalty for wrong answers: one-third (0.66) of the marks assigned to that question will be deducted.',
      'Darken the circles in OMR sheet using black ballpoint pen only.'
    ],
    questions: [
      {
        id: 'upsc24-1',
        number: 1,
        section: 'Indian Polity & Governance',
        question: 'Under the Constitution of India, which one of the following is NOT a Fundamental Right?',
        options: [
          { key: 'A', text: 'Right to Equality (Articles 14-18)' },
          { key: 'B', text: 'Right to Freedom of Speech (Article 19)' },
          { key: 'C', text: 'Right to Property' },
          { key: 'D', text: 'Right against Exploitation (Articles 23-24)' }
        ],
        correctAnswer: 'C',
        explanation: 'Right to Property was deleted from the list of Fundamental Rights by the 44th Constitutional Amendment Act, 1978 and converted into a legal right under Article 300-A in Part XII.',
        marks: 2,
        negativeMarks: 0.66
      },
      {
        id: 'upsc24-2',
        number: 2,
        section: 'Environment & Ecology',
        question: 'The term "Bio-accumulation" refers to:',
        options: [
          { key: 'A', text: 'Increase in concentration of a pollutant across successive trophic levels' },
          { key: 'B', text: 'Gradual buildup of a substance inside the tissues of an organism over its lifetime' },
          { key: 'C', text: 'Decomposition of organic matter by aerobic microorganisms' },
          { key: 'D', text: 'Accumulation of biomass in agricultural crop cycles' }
        ],
        correctAnswer: 'B',
        explanation: 'Bioaccumulation refers to the accumulation of a toxic substance in an organism when intake rate exceeds elimination rate. Biomagnification refers to increase in concentration across the food chain.',
        marks: 2,
        negativeMarks: 0.66
      },
      {
        id: 'upsc24-3',
        number: 3,
        section: 'Indian Economy',
        question: 'Which of the following is the primary objective of the Monetary Policy Committee (MPC) in India?',
        options: [
          { key: 'A', text: 'Maintaining fiscal deficit below 3% of GDP' },
          { key: 'B', text: 'Maintaining price stability while keeping in mind the objective of growth' },
          { key: 'C', text: 'Regulating foreign direct investment limits' },
          { key: 'D', text: 'Direct collection of GST revenues' }
        ],
        correctAnswer: 'B',
        explanation: 'Under Section 45ZB of the amended RBI Act 1934, the primary objective of the monetary policy committee is to maintain price stability (CPI 4% +/- 2%) while supporting growth.',
        marks: 2,
        negativeMarks: 0.66
      }
    ]
  },
  {
    id: 'upsc-csp-2024-csat',
    categoryId: 'upsc',
    categoryName: 'UPSC',
    examName: 'UPSC Civil Services (Preliminary) CSAT 2024',
    streamOrSubject: 'CSAT / Aptitude (Paper-II)',
    year: 2024,
    paperCode: 'UPSC-CSP-2024-CSAT-A',
    shift: 'Afternoon Session (14:30 - 16:30)',
    durationMinutes: 120,
    totalMarks: 200,
    totalQuestions: 80,
    negativeMarking: '0.83 mark (1/3rd penalty) for each wrong answer',
    downloadCount: 58900,
    fileSizeBytes: '2.2 MB',
    difficultyLevel: 'Moderate-Hard',
    instructions: [
      'Paper-II is qualifying in nature with a minimum qualifying mark of 33% (66 marks).',
      '80 questions carrying 2.5 marks each.'
    ],
    questions: [
      {
        id: 'upsc24-csat-1',
        number: 1,
        section: 'Logical Reasoning & Quantitative',
        question: 'What is the remainder when (7^99) is divided by 10?',
        options: [
          { key: 'A', text: '1' },
          { key: 'B', text: '3' },
          { key: 'C', text: '7' },
          { key: 'D', text: '9' }
        ],
        correctAnswer: 'B',
        explanation: 'Cyclicity of units digit of powers of 7 is 4: 7^1=7, 7^2=9, 7^3=3, 7^4=1. 99 mod 4 = 3, so unit digit is 3. Remainder when divided by 10 is 3.',
        marks: 2.5,
        negativeMarks: 0.83
      }
    ]
  },
  {
    id: 'upsc-csp-2023-gs1',
    categoryId: 'upsc',
    categoryName: 'UPSC',
    examName: 'UPSC Civil Services (Preliminary) Examination 2023',
    streamOrSubject: 'General Studies (Paper-I)',
    year: 2023,
    paperCode: 'UPSC-CSP-2023-GS1',
    shift: 'Morning Session',
    durationMinutes: 120,
    totalMarks: 200,
    totalQuestions: 100,
    negativeMarking: '1/3rd mark deduction for incorrect answer',
    downloadCount: 65400,
    fileSizeBytes: '2.4 MB',
    difficultyLevel: 'Hard',
    instructions: ['Official Question Paper GS-I, May 2023.'],
    questions: [
      {
        id: 'upsc23-1',
        number: 1,
        section: 'History & Culture',
        question: 'With reference to Ancient India, the terms "Dhanyakataka" was a prominent Buddhist center under:',
        options: [
          { key: 'A', text: 'Mahasanghikas (Satavahanas)' },
          { key: 'B', text: 'Vakatakas' },
          { key: 'C', text: 'Pallavas' },
          { key: 'D', text: 'Guptas' }
        ],
        correctAnswer: 'A',
        explanation: 'Dhanyakataka (modern Dharanikota / Amaravati in Guntur district, Andhra Pradesh) flourished under the Satavahana dynasty as a major Mahasanghika Buddhist center.',
        marks: 2,
        negativeMarks: 0.66
      }
    ]
  },
  {
    id: 'upsc-csp-2022-gs1',
    categoryId: 'upsc',
    categoryName: 'UPSC',
    examName: 'UPSC Civil Services (Preliminary) Examination 2022',
    streamOrSubject: 'General Studies (Paper-I)',
    year: 2022,
    paperCode: 'UPSC-CSP-2022-GS1',
    shift: 'Morning Session',
    durationMinutes: 120,
    totalMarks: 200,
    totalQuestions: 100,
    negativeMarking: '0.66 mark penalty',
    downloadCount: 52000,
    fileSizeBytes: '2.3 MB',
    difficultyLevel: 'Moderate',
    instructions: ['Official Question Paper GS-I 2022.'],
    questions: [
      {
        id: 'upsc22-1',
        number: 1,
        section: 'Science & Technology',
        question: 'Which one of the following statements best describes the term "Web 3.0"?',
        options: [
          { key: 'A', text: 'A web controlled exclusively by national sovereign entities' },
          { key: 'B', text: 'A decentralized internet ecosystem built on blockchain and distributed ledger technologies' },
          { key: 'C', text: 'An internet standard dedicated only to mobile cellular devices' },
          { key: 'D', text: 'A cloud platform operated by unified global telecom consortiums' }
        ],
        correctAnswer: 'B',
        explanation: 'Web 3.0 represents a vision for a decentralized, user-centric web architecture powered by cryptographic protocols, smart contracts, and decentralized ledgers.',
        marks: 2,
        negativeMarks: 0.66
      }
    ]
  },
  {
    id: 'upsc-csp-2021-gs1',
    categoryId: 'upsc',
    categoryName: 'UPSC',
    examName: 'UPSC Civil Services (Preliminary) Examination 2021',
    streamOrSubject: 'General Studies (Paper-I)',
    year: 2021,
    paperCode: 'UPSC-CSP-2021-GS1',
    shift: 'Morning Session',
    durationMinutes: 120,
    totalMarks: 200,
    totalQuestions: 100,
    negativeMarking: '0.66 mark penalty',
    downloadCount: 48900,
    fileSizeBytes: '2.1 MB',
    difficultyLevel: 'Moderate',
    instructions: ['Civil Services Prelims 2021 Paper.'],
    questions: [
      {
        id: 'upsc21-1',
        number: 1,
        section: 'Polity',
        question: 'Under the Indian Constitution, concentration of wealth violates:',
        options: [
          { key: 'A', text: 'The Right to Equality' },
          { key: 'B', text: 'The Directive Principles of State Policy' },
          { key: 'C', text: 'The Right to Freedom' },
          { key: 'D', text: 'The Concept of Welfare' }
        ],
        correctAnswer: 'B',
        explanation: 'Article 39(c) of Directive Principles of State Policy (Part IV) states that the operation of the economic system must not result in the concentration of wealth and means of production to common detriment.',
        marks: 2,
        negativeMarks: 0.66
      }
    ]
  },
  {
    id: 'upsc-csp-2020-gs1',
    categoryId: 'upsc',
    categoryName: 'UPSC',
    examName: 'UPSC Civil Services (Preliminary) Examination 2020',
    streamOrSubject: 'General Studies (Paper-I)',
    year: 2020,
    paperCode: 'UPSC-CSP-2020-GS1',
    shift: 'Morning Session',
    durationMinutes: 120,
    totalMarks: 200,
    totalQuestions: 100,
    negativeMarking: '0.66 mark penalty',
    downloadCount: 44300,
    fileSizeBytes: '2.0 MB',
    difficultyLevel: 'Standard',
    instructions: ['Civil Services Prelims 2020 Paper.'],
    questions: [
      {
        id: 'upsc20-1',
        number: 1,
        section: 'Polity',
        question: 'A Parliamentary System of Government is one in which:',
        options: [
          { key: 'A', text: 'All political parties in the Parliament are represented in the Government' },
          { key: 'B', text: 'The Government is responsible to the Parliament and can be removed by it' },
          { key: 'C', text: 'The Government is elected by the people and cannot be removed by them' },
          { key: 'D', text: 'The Government is chosen by the Parliament but cannot be removed before tenure' }
        ],
        correctAnswer: 'B',
        explanation: 'In a parliamentary democracy, the executive is derived from and collectively responsible to the legislature (specifically the lower house / Lok Sabha in India).',
        marks: 2,
        negativeMarks: 0.66
      }
    ]
  },

  // --- SSC PAPERS ---
  {
    id: 'ssc-cgl-2024-t1',
    categoryId: 'ssc',
    categoryName: 'SSC',
    examName: 'SSC Combined Graduate Level (CGL) 2024 Tier-I',
    streamOrSubject: 'CGL Tier-I (Combined Graduate Level)',
    year: 2024,
    paperCode: 'SSC-CGL-24-T1-S1',
    shift: 'Shift 1 (09:00 - 10:00 AM)',
    durationMinutes: 60,
    totalMarks: 200,
    totalQuestions: 100,
    negativeMarking: '0.50 mark deducted for each wrong answer',
    downloadCount: 62300,
    fileSizeBytes: '1.7 MB',
    difficultyLevel: 'Moderate',
    instructions: [
      'The test consists of 100 questions of 2 marks each.',
      'Duration is 60 minutes (80 minutes for candidates eligible for scribe).',
      'Four sections: General Intelligence & Reasoning (25), General Awareness (25), Quantitative Aptitude (25), English Comprehension (25).'
    ],
    questions: [
      {
        id: 'ssc24-1',
        number: 1,
        section: 'General Intelligence & Reasoning',
        question: 'Find the odd one out: (A) 125, (B) 343, (C) 512, (D) 729',
        options: [
          { key: 'A', text: '125' },
          { key: 'B', text: '343' },
          { key: 'C', text: '512' },
          { key: 'D', text: '729' }
        ],
        correctAnswer: 'C',
        explanation: '125 = 5³ (odd), 343 = 7³ (odd), 729 = 9³ (odd). Whereas 512 = 8³ (even cube). Alternatively 729 is both 27² and 9³.',
        marks: 2,
        negativeMarks: 0.50
      },
      {
        id: 'ssc24-2',
        number: 2,
        section: 'Quantitative Aptitude',
        question: 'If sin θ + cos θ = √2 cos(90 - θ), then the value of cot θ is:',
        options: [
          { key: 'A', text: '√2 - 1' },
          { key: 'B', text: '√2 + 1' },
          { key: 'C', text: '1 / (√2 + 1)' },
          { key: 'D', text: '√3 - 1' }
        ],
        correctAnswer: 'A',
        explanation: 'cos(90 - θ) = sin θ. So sin θ + cos θ = √2 sin θ => cos θ = (√2 - 1) sin θ => cot θ = cos θ / sin θ = √2 - 1.',
        marks: 2,
        negativeMarks: 0.50
      }
    ]
  },
  {
    id: 'ssc-cgl-2023-t1',
    categoryId: 'ssc',
    categoryName: 'SSC',
    examName: 'SSC Combined Graduate Level (CGL) 2023 Tier-I',
    streamOrSubject: 'CGL Tier-I (Combined Graduate Level)',
    year: 2023,
    paperCode: 'SSC-CGL-23-T1-S2',
    shift: 'Shift 2 (12:30 - 01:30 PM)',
    durationMinutes: 60,
    totalMarks: 200,
    totalQuestions: 100,
    negativeMarking: '0.50 mark deducted for each wrong answer',
    downloadCount: 59800,
    fileSizeBytes: '1.8 MB',
    difficultyLevel: 'Moderate',
    instructions: ['Official Tier-1 Computer Based Test.'],
    questions: [
      {
        id: 'ssc23-1',
        number: 1,
        section: 'General Awareness',
        question: 'Which Article of the Indian Constitution provides for the "Abolition of Untouchability"?',
        options: [
          { key: 'A', text: 'Article 14' },
          { key: 'B', text: 'Article 17' },
          { key: 'C', text: 'Article 19' },
          { key: 'D', text: 'Article 21' }
        ],
        correctAnswer: 'B',
        explanation: 'Article 17 explicitly abolishes untouchability and forbids its practice in any form under Fundamental Rights (Right to Equality).',
        marks: 2,
        negativeMarks: 0.50
      }
    ]
  },
  {
    id: 'ssc-cgl-2022-t1',
    categoryId: 'ssc',
    categoryName: 'SSC',
    examName: 'SSC Combined Graduate Level (CGL) 2022 Tier-I',
    streamOrSubject: 'CGL Tier-I (Combined Graduate Level)',
    year: 2022,
    paperCode: 'SSC-CGL-22-T1',
    shift: 'Shift 1',
    durationMinutes: 60,
    totalMarks: 200,
    totalQuestions: 100,
    negativeMarking: '0.50 mark penalty',
    downloadCount: 51200,
    fileSizeBytes: '1.7 MB',
    difficultyLevel: 'Standard',
    instructions: ['CGL 2022 Tier-1 examination.'],
    questions: [
      {
        id: 'ssc22-1',
        number: 1,
        section: 'English Language',
        question: 'Identify the synonym of the word "TACITURN":',
        options: [
          { key: 'A', text: 'Loquacious' },
          { key: 'B', text: 'Reticent' },
          { key: 'C', text: 'Garrulous' },
          { key: 'D', text: 'Articulate' }
        ],
        correctAnswer: 'B',
        explanation: '"Taciturn" means reserved or uncommunicative in speech; saying little. "Reticent" is its closest synonym.',
        marks: 2,
        negativeMarks: 0.50
      }
    ]
  },
  {
    id: 'ssc-cgl-2021-t1',
    categoryId: 'ssc',
    categoryName: 'SSC',
    examName: 'SSC Combined Graduate Level (CGL) 2021 Tier-I',
    streamOrSubject: 'CGL Tier-I (Combined Graduate Level)',
    year: 2021,
    paperCode: 'SSC-CGL-21-T1',
    shift: 'Shift 1',
    durationMinutes: 60,
    totalMarks: 200,
    totalQuestions: 100,
    negativeMarking: '0.50 mark penalty',
    downloadCount: 47600,
    fileSizeBytes: '1.6 MB',
    difficultyLevel: 'Standard',
    instructions: ['CGL 2021 Tier-1 examination.'],
    questions: [
      {
        id: 'ssc21-1',
        number: 1,
        section: 'Quantitative Aptitude',
        question: 'A shopkeeper marks an article 30% above its cost price and offers a discount of 10%. What is his overall profit percentage?',
        options: [
          { key: 'A', text: '17%' },
          { key: 'B', text: '20%' },
          { key: 'C', text: '15%' },
          { key: 'D', text: '18%' }
        ],
        correctAnswer: 'A',
        explanation: 'Let CP = 100. Marked Price = 130. Discount = 10% of 130 = 13. Selling Price = 130 - 13 = 117. Profit = 117 - 100 = 17%.',
        marks: 2,
        negativeMarks: 0.50
      }
    ]
  },
  {
    id: 'ssc-cgl-2020-t1',
    categoryId: 'ssc',
    categoryName: 'SSC',
    examName: 'SSC Combined Graduate Level (CGL) 2020 Tier-I',
    streamOrSubject: 'CGL Tier-I (Combined Graduate Level)',
    year: 2020,
    paperCode: 'SSC-CGL-20-T1',
    shift: 'Shift 1',
    durationMinutes: 60,
    totalMarks: 200,
    totalQuestions: 100,
    negativeMarking: '0.50 mark penalty',
    downloadCount: 42100,
    fileSizeBytes: '1.5 MB',
    difficultyLevel: 'Standard',
    instructions: ['CGL 2020 Tier-1 question paper.'],
    questions: [
      {
        id: 'ssc20-1',
        number: 1,
        section: 'General Awareness',
        question: 'Who was the founder of the Maurya Empire in ancient India?',
        options: [
          { key: 'A', text: 'Ashoka' },
          { key: 'B', text: 'Bindusara' },
          { key: 'C', text: 'Chandragupta Maurya' },
          { key: 'D', text: 'Brihadratha' }
        ],
        correctAnswer: 'C',
        explanation: 'Chandragupta Maurya founded the Maurya Empire in 322 BCE with guidance from his guru and minister Chanakya (Kautilya).',
        marks: 2,
        negativeMarks: 0.50
      }
    ]
  },

  // --- BANKING PAPERS ---
  {
    id: 'sbi-po-2024-pre',
    categoryId: 'banking',
    categoryName: 'Banking',
    examName: 'State Bank of India (SBI) PO Preliminary 2024',
    streamOrSubject: 'SBI PO Prelims',
    year: 2024,
    paperCode: 'SBI-PO-2024-PRE-S1',
    shift: 'Shift 1 (09:00 - 10:00 AM)',
    durationMinutes: 60,
    totalMarks: 100,
    totalQuestions: 100,
    negativeMarking: '0.25 mark (1/4th penalty) for each incorrect answer',
    downloadCount: 48900,
    fileSizeBytes: '1.9 MB',
    difficultyLevel: 'Moderate-Hard',
    instructions: [
      'The examination comprises 100 objective questions.',
      'English Language: 30 Questions (20 mins)',
      'Quantitative Aptitude: 35 Questions (20 mins)',
      'Reasoning Ability: 35 Questions (20 mins)'
    ],
    questions: [
      {
        id: 'sbipo24-1',
        number: 1,
        section: 'Reasoning Ability',
        question: 'Eight persons A, B, C, D, E, F, G, H sit around a circular table facing center. If A sits opposite to C and B is immediate right of A, who is opposite to B?',
        options: [
          { key: 'A', text: 'D' },
          { key: 'B', text: 'E' },
          { key: 'C', text: 'F' },
          { key: 'D', text: 'Cannot be determined without additional constraints' }
        ],
        correctAnswer: 'D',
        explanation: 'In circular arrangements with 8 persons, determining exact opposite requires further positional constraints for the remaining 5 persons.',
        marks: 1,
        negativeMarks: 0.25
      },
      {
        id: 'sbipo24-2',
        number: 2,
        section: 'Quantitative Aptitude',
        question: 'A sum of money doubles itself at compound interest in 4 years. In how many years will it become 8 times of itself at the same rate?',
        options: [
          { key: 'A', text: '8 years' },
          { key: 'B', text: '12 years' },
          { key: 'C', text: '16 years' },
          { key: 'D', text: '24 years' }
        ],
        correctAnswer: 'B',
        explanation: 'At compound interest, if P becomes 2P in 4 years, then 2P becomes 4P in next 4 years, and 4P becomes 8P in another 4 years. Total time = 4 * 3 = 12 years (since 2³ = 8).',
        marks: 1,
        negativeMarks: 0.25
      }
    ]
  },
  {
    id: 'ibps-po-2023-pre',
    categoryId: 'banking',
    categoryName: 'Banking',
    examName: 'IBPS PO Preliminary Examination 2023',
    streamOrSubject: 'IBPS PO Prelims',
    year: 2023,
    paperCode: 'IBPS-PO-2023-PRE',
    shift: 'Shift 2',
    durationMinutes: 60,
    totalMarks: 100,
    totalQuestions: 100,
    negativeMarking: '0.25 mark penalty',
    downloadCount: 45600,
    fileSizeBytes: '1.8 MB',
    difficultyLevel: 'Moderate',
    instructions: ['IBPS CRP PO/MT-XIII Preliminary Exam.'],
    questions: [
      {
        id: 'ibps23-1',
        number: 1,
        section: 'Banking Awareness & Quantitative',
        question: 'What is the full form of RTGS in interbank fund settlement?',
        options: [
          { key: 'A', text: 'Real Time Gross Settlement' },
          { key: 'B', text: 'Rapid Transfer General System' },
          { key: 'C', text: 'Reserve Transfer Government Scheme' },
          { key: 'D', text: 'Retail Transaction Gross Service' }
        ],
        correctAnswer: 'A',
        explanation: 'RTGS stands for Real Time Gross Settlement, an electronic funds transfer system maintained by the Reserve Bank of India.',
        marks: 1,
        negativeMarks: 0.25
      }
    ]
  },
  {
    id: 'sbi-po-2022-pre',
    categoryId: 'banking',
    categoryName: 'Banking',
    examName: 'State Bank of India (SBI) PO Preliminary 2022',
    streamOrSubject: 'SBI PO Prelims',
    year: 2022,
    paperCode: 'SBI-PO-2022-PRE',
    shift: 'Shift 1',
    durationMinutes: 60,
    totalMarks: 100,
    totalQuestions: 100,
    negativeMarking: '0.25 penalty per wrong answer',
    downloadCount: 39800,
    fileSizeBytes: '1.7 MB',
    difficultyLevel: 'Moderate-Hard',
    instructions: ['Official SBI PO 2022 Prelims Paper.'],
    questions: [
      {
        id: 'sbipo22-1',
        number: 1,
        section: 'Quantitative Aptitude',
        question: 'Two pipes A and B can fill a cistern in 12 hours and 15 hours respectively. If both pipes are opened together, how long will they take to fill the tank?',
        options: [
          { key: 'A', text: '6 hours 40 minutes' },
          { key: 'B', text: '7 hours' },
          { key: 'C', text: '7 hours 15 minutes' },
          { key: 'D', text: '8 hours' }
        ],
        correctAnswer: 'A',
        explanation: '1/12 + 1/15 = (5+4)/60 = 9/60 = 3/20. Total time = 20/3 hours = 6 hours and 40 minutes.',
        marks: 1,
        negativeMarks: 0.25
      }
    ]
  },
  {
    id: 'ibps-po-2021-pre',
    categoryId: 'banking',
    categoryName: 'Banking',
    examName: 'IBPS PO Preliminary Examination 2021',
    streamOrSubject: 'IBPS PO Prelims',
    year: 2021,
    paperCode: 'IBPS-PO-2021-PRE',
    shift: 'Shift 1',
    durationMinutes: 60,
    totalMarks: 100,
    totalQuestions: 100,
    negativeMarking: '0.25 penalty',
    downloadCount: 37400,
    fileSizeBytes: '1.7 MB',
    difficultyLevel: 'Moderate',
    instructions: ['IBPS PO 2021 question paper.'],
    questions: [
      {
        id: 'ibps21-1',
        number: 1,
        section: 'Reasoning Ability',
        question: 'In a code language, if "BANK" is written as "CBOL", how is "LOAN" written in that code?',
        options: [
          { key: 'A', text: 'MPBO' },
          { key: 'B', text: 'MOBP' },
          { key: 'C', text: 'NPBO' },
          { key: 'D', text: 'MQBO' }
        ],
        correctAnswer: 'A',
        explanation: 'Each letter is shifted forward by +1: L->M, O->P, A->B, N->O => MPBO.',
        marks: 1,
        negativeMarks: 0.25
      }
    ]
  },
  {
    id: 'sbi-po-2020-pre',
    categoryId: 'banking',
    categoryName: 'Banking',
    examName: 'State Bank of India (SBI) PO Preliminary 2020',
    streamOrSubject: 'SBI PO Prelims',
    year: 2020,
    paperCode: 'SBI-PO-2020-PRE',
    shift: 'Shift 1',
    durationMinutes: 60,
    totalMarks: 100,
    totalQuestions: 100,
    negativeMarking: '0.25 penalty',
    downloadCount: 35100,
    fileSizeBytes: '1.6 MB',
    difficultyLevel: 'Standard',
    instructions: ['SBI PO 2020 Prelims Paper.'],
    questions: [
      {
        id: 'sbipo20-1',
        number: 1,
        section: 'English Language',
        question: 'Choose the correctly spelt word:',
        options: [
          { key: 'A', text: 'Accomodate' },
          { key: 'B', text: 'Accommodate' },
          { key: 'C', text: 'Acommodate' },
          { key: 'D', text: 'Accommade' }
        ],
        correctAnswer: 'B',
        explanation: 'The correct spelling is "Accommodate" with double c and double m.',
        marks: 1,
        negativeMarks: 0.25
      }
    ]
  },

  // --- RAILWAY PAPERS ---
  {
    id: 'rrb-ntpc-2024-cbt1',
    categoryId: 'railway',
    categoryName: 'Railway',
    examName: 'RRB NTPC (Non-Technical Popular Categories) CBT-1 2024',
    streamOrSubject: 'RRB NTPC Stage-1 (CBT-1)',
    year: 2024,
    paperCode: 'RRB-NTPC-2024-CBT1-S1',
    shift: 'Shift 1 (10:30 AM - 12:00 PM)',
    durationMinutes: 90,
    totalMarks: 100,
    totalQuestions: 100,
    negativeMarking: '1/3rd (0.33) mark deducted for each wrong response',
    downloadCount: 54100,
    fileSizeBytes: '1.9 MB',
    difficultyLevel: 'Moderate',
    instructions: [
      'Total duration is 90 minutes for 100 multiple choice questions.',
      'General Awareness (40 marks), Mathematics (30 marks), General Intelligence & Reasoning (30 marks).'
    ],
    questions: [
      {
        id: 'rrb24-1',
        number: 1,
        section: 'General Awareness',
        question: 'Which is the longest railway platform in India as of current records?',
        options: [
          { key: 'A', text: 'Gorakhpur Railway Station' },
          { key: 'B', text: 'Shree Siddharoodha Swamiji Hubballi Station' },
          { key: 'C', text: 'Kollam Junction' },
          { key: 'D', text: 'Kharagpur Platform' }
        ],
        correctAnswer: 'B',
        explanation: 'Platform No. 8 at Shree Siddharoodha Swamiji Hubballi Junction (Karnataka) holds the Guinness World Record with a length of 1,507 meters.',
        marks: 1,
        negativeMarks: 0.33
      },
      {
        id: 'rrb24-2',
        number: 2,
        section: 'Mathematics',
        question: 'A train 240 m long crosses a platform 360 m long in 30 seconds. What is the speed of the train in km/h?',
        options: [
          { key: 'A', text: '60 km/h' },
          { key: 'B', text: '72 km/h' },
          { key: 'C', text: '80 km/h' },
          { key: 'D', text: '90 km/h' }
        ],
        correctAnswer: 'B',
        explanation: 'Total distance = 240 + 360 = 600 m. Speed = Distance / Time = 600 / 30 = 20 m/s. Speed in km/h = 20 * (18/5) = 72 km/h.',
        marks: 1,
        negativeMarks: 0.33
      }
    ]
  },
  {
    id: 'rrb-group-d-2023',
    categoryId: 'railway',
    categoryName: 'Railway',
    examName: 'RRB Group D (Level-1 Track Maintainer & Pointsman) 2023',
    streamOrSubject: 'RRB Group D (Level 1)',
    year: 2023,
    paperCode: 'RRB-GRPD-2023-S2',
    shift: 'Shift 2 (12:45 - 02:15 PM)',
    durationMinutes: 90,
    totalMarks: 100,
    totalQuestions: 100,
    negativeMarking: '1/3 mark penalty',
    downloadCount: 47200,
    fileSizeBytes: '1.8 MB',
    difficultyLevel: 'Moderate',
    instructions: ['RRB Group D Level 1 CBT Paper.'],
    questions: [
      {
        id: 'rrb23-1',
        number: 1,
        section: 'General Science',
        question: 'What is the SI unit of electric potential difference (Voltage)?',
        options: [
          { key: 'A', text: 'Ampere' },
          { key: 'B', text: 'Ohm' },
          { key: 'C', text: 'Volt' },
          { key: 'D', text: 'Watt' }
        ],
        correctAnswer: 'C',
        explanation: 'The SI unit of electric potential and potential difference is the Volt (V), named after Alessandro Volta.',
        marks: 1,
        negativeMarks: 0.33
      }
    ]
  },
  {
    id: 'rrb-ntpc-2022-cbt2',
    categoryId: 'railway',
    categoryName: 'Railway',
    examName: 'RRB NTPC CBT-2 (Level 6 & 4) 2022',
    streamOrSubject: 'RRB NTPC Stage-2 (CBT-2)',
    year: 2022,
    paperCode: 'RRB-NTPC-22-CBT2-L6',
    shift: 'Shift 1',
    durationMinutes: 90,
    totalMarks: 120,
    totalQuestions: 120,
    negativeMarking: '1/3 mark penalty',
    downloadCount: 41800,
    fileSizeBytes: '1.7 MB',
    difficultyLevel: 'Hard',
    instructions: ['RRB NTPC CBT-2 official paper.'],
    questions: [
      {
        id: 'rrb22-1',
        number: 1,
        section: 'General Awareness',
        question: 'The famous "Bhilai Steel Plant" was established with technical collaboration from which country?',
        options: [
          { key: 'A', text: 'United Kingdom' },
          { key: 'B', text: 'Soviet Union (USSR)' },
          { key: 'C', text: 'West Germany' },
          { key: 'D', text: 'United States' }
        ],
        correctAnswer: 'B',
        explanation: 'Bhilai Steel Plant in Chhattisgarh was set up with assistance from the USSR in 1955 under the Second Five-Year Plan.',
        marks: 1,
        negativeMarks: 0.33
      }
    ]
  },
  {
    id: 'rrb-ntpc-2021-cbt1',
    categoryId: 'railway',
    categoryName: 'Railway',
    examName: 'RRB NTPC Phase 5 CBT-1 2021',
    streamOrSubject: 'RRB NTPC Stage-1 (CBT-1)',
    year: 2021,
    paperCode: 'RRB-NTPC-21-CBT1',
    shift: 'Shift 1',
    durationMinutes: 90,
    totalMarks: 100,
    totalQuestions: 100,
    negativeMarking: '1/3 mark penalty',
    downloadCount: 39500,
    fileSizeBytes: '1.6 MB',
    difficultyLevel: 'Standard',
    instructions: ['RRB NTPC 2021 Paper.'],
    questions: [
      {
        id: 'rrb21-1',
        number: 1,
        section: 'General Awareness',
        question: 'Which planet is known as the "Red Planet" in our solar system?',
        options: [
          { key: 'A', text: 'Venus' },
          { key: 'B', text: 'Mars' },
          { key: 'C', text: 'Jupiter' },
          { key: 'D', text: 'Saturn' }
        ],
        correctAnswer: 'B',
        explanation: 'Mars is known as the Red Planet due to the abundant presence of iron oxide (rust) on its surface.',
        marks: 1,
        negativeMarks: 0.33
      }
    ]
  },
  {
    id: 'rrb-ntpc-2020-cbt1',
    categoryId: 'railway',
    categoryName: 'Railway',
    examName: 'RRB NTPC Phase 1 CBT-1 2020',
    streamOrSubject: 'RRB NTPC Stage-1 (CBT-1)',
    year: 2020,
    paperCode: 'RRB-NTPC-20-CBT1',
    shift: 'Shift 1',
    durationMinutes: 90,
    totalMarks: 100,
    totalQuestions: 100,
    negativeMarking: '1/3 mark penalty',
    downloadCount: 36200,
    fileSizeBytes: '1.6 MB',
    difficultyLevel: 'Standard',
    instructions: ['RRB NTPC 2020 CBT-1.'],
    questions: [
      {
        id: 'rrb20-1',
        number: 1,
        section: 'General Awareness',
        question: 'Who is regarded as the "Father of the Indian Constitution"?',
        options: [
          { key: 'A', text: 'Mahatma Gandhi' },
          { key: 'B', text: 'Dr. B. R. Ambedkar' },
          { key: 'C', text: 'Jawaharlal Nehru' },
          { key: 'D', text: 'Dr. Rajendra Prasad' }
        ],
        correctAnswer: 'B',
        explanation: 'Dr. Bhimrao Ramji Ambedkar, Chairman of the Drafting Committee, is recognized as the chief architect of the Constitution of India.',
        marks: 1,
        negativeMarks: 0.33
      }
    ]
  },

  // --- OTHER EXAMS ---
  {
    id: 'ugc-net-2024-p1',
    categoryId: 'other',
    categoryName: 'Other exams',
    examName: 'UGC NET June 2024 General Paper on Teaching & Research Aptitude',
    streamOrSubject: 'UGC NET Paper-I (Teaching & Research)',
    year: 2024,
    paperCode: 'UGC-NET-2024-P1',
    shift: 'Shift 1 (09:00 AM - 12:00 PM)',
    durationMinutes: 60,
    totalMarks: 100,
    totalQuestions: 50,
    negativeMarking: 'No negative marking',
    downloadCount: 33400,
    fileSizeBytes: '1.5 MB',
    difficultyLevel: 'Moderate',
    instructions: [
      'Paper-I consists of 50 objective questions of 2 marks each.',
      'Tests teaching aptitude, research methodology, communication, ICT, and higher education governance.',
      'There is no negative marking for incorrect responses in UGC NET.'
    ],
    questions: [
      {
        id: 'ugc24-1',
        number: 1,
        section: 'Teaching Aptitude',
        question: 'Which of the following is the highest level of cognitive domain in Bloom’s Revised Taxonomy?',
        options: [
          { key: 'A', text: 'Analyzing' },
          { key: 'B', text: 'Evaluating' },
          { key: 'C', text: 'Creating' },
          { key: 'D', text: 'Remembering' }
        ],
        correctAnswer: 'C',
        explanation: 'In Anderson & Krathwohl’s 2001 revised Bloom’s taxonomy, "Creating" (putting elements together to form a coherent whole) is at the pinnacle of cognitive skills.',
        marks: 2,
        negativeMarks: 0
      },
      {
        id: 'ugc24-2',
        number: 2,
        section: 'Research Methodology',
        question: 'A research approach where findings are primarily derived from qualitative observational data and contextual interpretation is known as:',
        options: [
          { key: 'A', text: 'Positivist paradigm' },
          { key: 'B', text: 'Post-positivist / Interpretivist paradigm' },
          { key: 'C', text: 'Strict Experimental trial' },
          { key: 'D', text: 'Quantitative Survey' }
        ],
        correctAnswer: 'B',
        explanation: 'The interpretivist paradigm views reality as socially constructed and emphasizes qualitative, descriptive, and empathetic understanding of subjective experiences.',
        marks: 2,
        negativeMarks: 0
      }
    ]
  },
  {
    id: 'cds-2024-gk',
    categoryId: 'other',
    categoryName: 'Other exams',
    examName: 'Combined Defence Services (CDS I) 2024 General Knowledge',
    streamOrSubject: 'CDS / Defence',
    year: 2024,
    paperCode: 'CDS-2024-I-GK',
    shift: 'Shift 2 (12:00 - 02:00 PM)',
    durationMinutes: 120,
    totalMarks: 100,
    totalQuestions: 120,
    negativeMarking: '1/3rd (0.27) mark penalty',
    downloadCount: 28900,
    fileSizeBytes: '1.8 MB',
    difficultyLevel: 'Moderate-Hard',
    instructions: ['120 Questions testing National and International Affairs, Defence Systems, and General Sciences.'],
    questions: [
      {
        id: 'cds24-1',
        number: 1,
        section: 'Defence & Security',
        question: 'Which Indian naval aircraft carrier was commissioned in September 2022 as India’s first indigenous aircraft carrier (IAC-1)?',
        options: [
          { key: 'A', text: 'INS Vikramaditya' },
          { key: 'B', text: 'INS Vikrant' },
          { key: 'C', text: 'INS Viraat' },
          { key: 'D', text: 'INS Vishal' }
        ],
        correctAnswer: 'B',
        explanation: 'INS Vikrant is India’s first indigenously designed and constructed aircraft carrier, built by Cochin Shipyard Limited.',
        marks: 0.83,
        negativeMarks: 0.27
      }
    ]
  },
  {
    id: 'ugc-net-2023-p1',
    categoryId: 'other',
    categoryName: 'Other exams',
    examName: 'UGC NET December 2023 General Paper-I',
    streamOrSubject: 'UGC NET Paper-I (Teaching & Research)',
    year: 2023,
    paperCode: 'UGC-NET-2023-DEC-P1',
    shift: 'Shift 1',
    durationMinutes: 60,
    totalMarks: 100,
    totalQuestions: 50,
    negativeMarking: 'No negative marking',
    downloadCount: 29800,
    fileSizeBytes: '1.5 MB',
    difficultyLevel: 'Moderate',
    instructions: ['UGC NET 2023 Paper 1.'],
    questions: [
      {
        id: 'ugc23-1',
        number: 1,
        section: 'Higher Education System',
        question: 'The National Education Policy (NEP) 2020 proposes to replace the 10+2 curricular structure with:',
        options: [
          { key: 'A', text: '5+3+3+4' },
          { key: 'B', text: '5+4+3+2' },
          { key: 'C', text: '3+3+3+5' },
          { key: 'D', text: '4+4+3+3' }
        ],
        correctAnswer: 'A',
        explanation: 'NEP 2020 restructured school education into a 5+3+3+4 design covering Foundational (5 yrs), Preparatory (3 yrs), Middle (3 yrs), and Secondary (4 yrs).',
        marks: 2,
        negativeMarks: 0
      }
    ]
  },
  {
    id: 'spsc-2022-gs',
    categoryId: 'other',
    categoryName: 'Other exams',
    examName: 'State Combined Civil Services Preliminary Examination 2022',
    streamOrSubject: 'State PSC Prelims GS',
    year: 2022,
    paperCode: 'SPSC-2022-GS1',
    shift: 'Shift 1',
    durationMinutes: 120,
    totalMarks: 150,
    totalQuestions: 150,
    negativeMarking: '1/3rd penalty',
    downloadCount: 24700,
    fileSizeBytes: '1.7 MB',
    difficultyLevel: 'Moderate',
    instructions: ['State PSC General Studies Paper 2022.'],
    questions: [
      {
        id: 'spsc22-1',
        number: 1,
        section: 'Geography',
        question: 'Which river in India is known as the "Sorrow of Bihar"?',
        options: [
          { key: 'A', text: 'Gandak' },
          { key: 'B', text: 'Kosi' },
          { key: 'C', text: 'Son' },
          { key: 'D', text: 'Ghaghara' }
        ],
        correctAnswer: 'B',
        explanation: 'The Kosi River is known as the Sorrow of Bihar because its unpredictable seasonal floods and course-shifting cause immense devastation.',
        marks: 1,
        negativeMarks: 0.33
      }
    ]
  },
  {
    id: 'ugc-net-2021-p1',
    categoryId: 'other',
    categoryName: 'Other exams',
    examName: 'UGC NET 2021 General Paper-I',
    streamOrSubject: 'UGC NET Paper-I (Teaching & Research)',
    year: 2021,
    paperCode: 'UGC-NET-2021-P1',
    shift: 'Shift 1',
    durationMinutes: 60,
    totalMarks: 100,
    totalQuestions: 50,
    negativeMarking: 'No negative marking',
    downloadCount: 22100,
    fileSizeBytes: '1.4 MB',
    difficultyLevel: 'Standard',
    instructions: ['UGC NET 2021 Paper 1.'],
    questions: [
      {
        id: 'ugc21-1',
        number: 1,
        section: 'Information and Communication Technology (ICT)',
        question: 'Which protocol is used for securely transmitting web pages over the internet?',
        options: [
          { key: 'A', text: 'HTTP' },
          { key: 'B', text: 'HTTPS' },
          { key: 'C', text: 'FTP' },
          { key: 'D', text: 'SMTP' }
        ],
        correctAnswer: 'B',
        explanation: 'HTTPS (Hypertext Transfer Protocol Secure) encrypts communication over computer networks using Transport Layer Security (TLS).',
        marks: 2,
        negativeMarks: 0
      }
    ]
  },
  {
    id: 'ugc-net-2020-p1',
    categoryId: 'other',
    categoryName: 'Other exams',
    examName: 'UGC NET 2020 General Paper-I',
    streamOrSubject: 'UGC NET Paper-I (Teaching & Research)',
    year: 2020,
    paperCode: 'UGC-NET-2020-P1',
    shift: 'Shift 1',
    durationMinutes: 60,
    totalMarks: 100,
    totalQuestions: 50,
    negativeMarking: 'No negative marking',
    downloadCount: 20800,
    fileSizeBytes: '1.4 MB',
    difficultyLevel: 'Standard',
    instructions: ['UGC NET 2020 Paper 1.'],
    questions: [
      {
        id: 'ugc20-1',
        number: 1,
        section: 'Communication',
        question: 'Which type of communication occurs within an individual, including self-reflection and inner dialogue?',
        options: [
          { key: 'A', text: 'Interpersonal communication' },
          { key: 'B', text: 'Intrapersonal communication' },
          { key: 'C', text: 'Mass communication' },
          { key: 'D', text: 'Group communication' }
        ],
        correctAnswer: 'B',
        explanation: 'Intrapersonal communication is communication within oneself, encompassing thinking, daydreaming, solving problems internally, and self-evaluation.',
        marks: 2,
        negativeMarks: 0
      }
    ]
  }
];
