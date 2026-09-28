import { jsPDF } from 'jspdf';
import { ExamPaper } from '../types/exam';

export function generateExamPaperPDF(paper: ExamPaper): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let currentY = margin;

  // Colors
  const navyColor = [15, 41, 66]; // #0f2942
  const blueColor = [30, 64, 175]; // #1e40af
  const slateText = [51, 65, 85]; // #334155
  const slateLight = [100, 116, 139]; // #64748b
  const bgSoft = [241, 245, 249]; // #f1f5f9
  const borderLight = [203, 213, 225]; // #cbd5e1

  const checkPageBreak = (neededHeight: number) => {
    if (currentY + neededHeight > pageHeight - margin - 12) {
      doc.addPage();
      currentY = margin;
      drawHeaderFooter();
    }
  };

  const drawHeaderFooter = () => {
    const pageNum = doc.getNumberOfPages();
    // Header mini text
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(slateLight[0], slateLight[1], slateLight[2]);
    doc.text(`${paper.examName} (${paper.year}) — Paper Code: ${paper.paperCode}`, margin, 10);
    doc.text('OFFICIAL ARCHIVE COPY', pageWidth - margin, 10, { align: 'right' });
    doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
    doc.line(margin, 12, pageWidth - margin, 12);

    // Footer
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);
    doc.text('Government Exam Preparation Portal — Authorized Candidate Practice Copy', margin, pageHeight - 7);
    doc.text(`Page ${pageNum}`, pageWidth - margin, pageHeight - 7, { align: 'right' });
  };

  // --- PAGE 1: COVER & HEADER ---
  // Top Banner
  doc.setFillColor(navyColor[0], navyColor[1], navyColor[2]);
  doc.rect(margin, currentY, contentWidth, 24, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('GOVERNMENT OF INDIA • NATIONAL EXAMINATION PORTAL', pageWidth / 2, currentY + 7, { align: 'center' });

  doc.setFontSize(13);
  doc.text(`${paper.categoryName.toUpperCase()} EXAMINATION ARCHIVE — ${paper.year}`, pageWidth / 2, currentY + 14, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('PREVIOUS YEAR QUESTION PAPER & OFFICIAL ANSWER SCHEME', pageWidth / 2, currentY + 20, { align: 'center' });

  currentY += 28;

  // Title Box
  doc.setFillColor(bgSoft[0], bgSoft[1], bgSoft[2]);
  doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
  doc.roundedRect(margin, currentY, contentWidth, 22, 2, 2, 'FD');

  doc.setTextColor(navyColor[0], navyColor[1], navyColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  const examTitleLines = doc.splitTextToSize(paper.examName, contentWidth - 8);
  doc.text(examTitleLines, margin + 4, currentY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  doc.text(`Discipline / Stream: ${paper.streamOrSubject}`, margin + 4, currentY + 16);
  if (paper.shift) {
    doc.text(`Session: ${paper.shift}`, pageWidth - margin - 4, currentY + 16, { align: 'right' });
  }

  currentY += 26;

  // Key Metadata Table Box
  doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
  doc.setFillColor(255, 255, 255);
  doc.rect(margin, currentY, contentWidth, 20, 'D');

  const colW = contentWidth / 4;
  // Divider lines
  doc.line(margin + colW, currentY, margin + colW, currentY + 20);
  doc.line(margin + colW * 2, currentY, margin + colW * 2, currentY + 20);
  doc.line(margin + colW * 3, currentY, margin + colW * 3, currentY + 20);

  // Metadata items
  const metaItems = [
    { label: 'Time Allowed', value: `${paper.durationMinutes} Minutes` },
    { label: 'Maximum Marks', value: `${paper.totalMarks} Marks` },
    { label: 'Total Questions', value: `${paper.totalQuestions} Questions` },
    { label: 'Paper Code', value: paper.paperCode },
  ];

  metaItems.forEach((item, idx) => {
    const xPos = margin + colW * idx + colW / 2;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(slateLight[0], slateLight[1], slateLight[2]);
    doc.text(item.label.toUpperCase(), xPos, currentY + 6, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(navyColor[0], navyColor[1], navyColor[2]);
    doc.text(item.value, xPos, currentY + 14, { align: 'center' });
  });

  currentY += 24;

  // Candidate Roll No box (Realistic exam format)
  doc.setFillColor(bgSoft[0], bgSoft[1], bgSoft[2]);
  doc.rect(margin, currentY, contentWidth, 12, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  doc.text('CANDIDATE ROLL NUMBER:', margin + 4, currentY + 7);

  // 10 little roll number boxes
  const boxStartX = margin + 50;
  for (let b = 0; b < 10; b++) {
    doc.rect(boxStartX + b * 7, currentY + 2.5, 6, 7);
  }

  doc.text(`EXAM YEAR: ${paper.year}`, pageWidth - margin - 4, currentY + 7, { align: 'right' });
  currentY += 16;

  // Instructions Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(navyColor[0], navyColor[1], navyColor[2]);
  doc.text('INSTRUCTIONS TO CANDIDATES', margin, currentY);
  currentY += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);

  paper.instructions.forEach((instr, idx) => {
    const textLines = doc.splitTextToSize(`${idx + 1}. ${instr}`, contentWidth - 4);
    doc.text(textLines, margin + 2, currentY);
    currentY += textLines.length * 4.2;
  });

  if (paper.negativeMarking) {
    const negLines = doc.splitTextToSize(`• Negative Marking: ${paper.negativeMarking}`, contentWidth - 4);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(185, 28, 28); // red-700
    doc.text(negLines, margin + 2, currentY);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(slateText[0], slateText[1], slateText[2]);
    currentY += negLines.length * 4.2;
  }

  currentY += 6;
  doc.setDrawColor(navyColor[0], navyColor[1], navyColor[2]);
  doc.setLineWidth(0.5);
  doc.line(margin, currentY, pageWidth - margin, currentY);
  doc.setLineWidth(0.2);
  currentY += 8;

  // --- SECTION QUESTIONS ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(navyColor[0], navyColor[1], navyColor[2]);
  doc.text('PART A: QUESTIONS & ANSWER OPTIONS', margin, currentY);
  currentY += 6;

  let currentSection = '';

  paper.questions.forEach((q) => {
    // Check if new section header
    if (q.section && q.section !== currentSection) {
      currentSection = q.section;
      checkPageBreak(16);
      doc.setFillColor(bgSoft[0], bgSoft[1], bgSoft[2]);
      doc.rect(margin, currentY, contentWidth, 7, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(blueColor[0], blueColor[1], blueColor[2]);
      doc.text(`SECTION: ${currentSection.toUpperCase()}`, margin + 3, currentY + 5);
      currentY += 10;
    }

    // Estimate height needed for question
    const qTextLines = doc.splitTextToSize(`Q.${q.number}  ${q.question}`, contentWidth - 6);
    const optionsHeight = q.options.length * 6;
    const totalQHeight = qTextLines.length * 4.5 + optionsHeight + 8;

    checkPageBreak(totalQHeight);

    // Question Number & Marks badge
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(navyColor[0], navyColor[1], navyColor[2]);
    doc.text(qTextLines, margin + 2, currentY);

    // Marks info aligned right on first line
    const marksText = `[Marks: +${q.marks}${q.negativeMarks ? ` / -${q.negativeMarks}` : ''}]`;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(slateLight[0], slateLight[1], slateLight[2]);
    doc.text(marksText, pageWidth - margin - 2, currentY, { align: 'right' });

    currentY += qTextLines.length * 4.5 + 2;

    // Options (A, B, C, D)
    q.options.forEach((opt) => {
      const optLines = doc.splitTextToSize(`(${opt.key})  ${opt.text}`, contentWidth - 12);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(slateText[0], slateText[1], slateText[2]);
      doc.text(optLines, margin + 6, currentY);
      currentY += optLines.length * 4.5 + 1.5;
    });

    currentY += 3;
    doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
    doc.line(margin + 4, currentY, pageWidth - margin - 4, currentY);
    currentY += 5;
  });

  // --- SECTION: OFFICIAL ANSWER KEY & DETAILED EXPLANATIONS ---
  checkPageBreak(35);
  currentY += 4;
  doc.setFillColor(navyColor[0], navyColor[1], navyColor[2]);
  doc.rect(margin, currentY, contentWidth, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('PART B: OFFICIAL ANSWER KEY & DETAILED EXPLANATIONS', pageWidth / 2, currentY + 5.5, { align: 'center' });
  currentY += 12;

  // Quick Answer Matrix Table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(navyColor[0], navyColor[1], navyColor[2]);
  doc.text('OFFICIAL KEY SUMMARY', margin, currentY);
  currentY += 4;

  const keyCellWidth = 14;
  let keyX = margin;
  paper.questions.forEach((q) => {
    if (keyX + keyCellWidth > pageWidth - margin) {
      keyX = margin;
      currentY += 10;
    }
    // Box for Q number
    doc.setFillColor(bgSoft[0], bgSoft[1], bgSoft[2]);
    doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
    doc.rect(keyX, currentY, keyCellWidth, 5, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(slateText[0], slateText[1], slateText[2]);
    doc.text(`Q${q.number}`, keyX + keyCellWidth / 2, currentY + 3.5, { align: 'center' });

    // Box for Answer
    doc.setFillColor(255, 255, 255);
    doc.rect(keyX, currentY + 5, keyCellWidth, 5, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(blueColor[0], blueColor[1], blueColor[2]);
    doc.text(q.correctAnswer, keyX + keyCellWidth / 2, currentY + 8.5, { align: 'center' });

    keyX += keyCellWidth;
  });

  currentY += 16;

  // Detailed Step-by-Step Explanations
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(navyColor[0], navyColor[1], navyColor[2]);
  doc.text('STEP-BY-STEP EXPLANATORY NOTES', margin, currentY);
  currentY += 6;

  paper.questions.forEach((q) => {
    const expLines = doc.splitTextToSize(
      `Q.${q.number} [Correct: ${q.correctAnswer}]: ${q.explanation}`,
      contentWidth - 6
    );
    const expHeight = expLines.length * 4.2 + 6;

    checkPageBreak(expHeight);

    doc.setFillColor(bgSoft[0], bgSoft[1], bgSoft[2]);
    doc.roundedRect(margin, currentY, contentWidth, expLines.length * 4.2 + 4, 1.5, 1.5, 'F');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(slateText[0], slateText[1], slateText[2]);
    doc.text(expLines, margin + 3, currentY + 4);

    currentY += expLines.length * 4.2 + 7;
  });

  // Draw headers/footers across all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    // Draw header/footer on each page
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(slateLight[0], slateLight[1], slateLight[2]);
    doc.text(`${paper.examName} (${paper.year}) — Paper Code: ${paper.paperCode}`, margin, 8);
    doc.text('OFFICIAL ARCHIVE COPY', pageWidth - margin, 8, { align: 'right' });
    doc.setDrawColor(borderLight[0], borderLight[1], borderLight[2]);
    doc.line(margin, 10, pageWidth - margin, 10);

    // Footer
    doc.line(margin, pageHeight - 10, pageWidth - margin, pageHeight - 10);
    doc.text('ExamVault Government Exam Portal — Official Candidate Practice Archive', margin, pageHeight - 5);
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - 5, { align: 'right' });
  }

  // Trigger download with sanitized filename
  const cleanFilename = `${paper.paperCode || paper.examName.replace(/[^a-zA-Z0-9_-]/g, '_')}_${paper.year}.pdf`;
  doc.save(cleanFilename);
}
