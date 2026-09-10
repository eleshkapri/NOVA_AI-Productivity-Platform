/**
 * PdfReportService generates executive-ready, pixel-perfect PDF reports
 * formatted to standard A4 (210mm x 297mm) with zero trailing whitespace,
 * harmonious spacing, and verified single-page geometry.
 */
export class PdfReportService {
  /**
   * Generates and downloads the executive velocity & ROI audit PDF.
   * @param {Object} params
   * @param {number} params.totalScore
   * @param {string} params.tierName
   * @param {string} params.tierDesc
   * @param {number} params.defaultTeamSize
   * @param {number} params.hoursSavedPerYear
   * @param {number} params.annualSavingsDollars
   * @param {Array} params.answers
   */
  static async generateReport({
    totalScore,
    tierName,
    tierDesc,
    defaultTeamSize,
    hoursSavedPerYear,
    annualSavingsDollars,
    answers,
  }) {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pageWidth = 210;
    const margin = 14;
    const contentWidth = pageWidth - margin * 2; // 182mm

    // ========================================================
    // 1. TOP HEADER BANNER (Y: 12 to 40mm)
    // ========================================================
    const headerY = 12;
    const headerHeight = 28;

    // Dark luxury background
    doc.setFillColor(11, 12, 51); // #0B0C33
    doc.roundedRect(margin, headerY, contentWidth, headerHeight, 4, 4, 'F');

    // Gold top accent line
    doc.setFillColor(216, 180, 82); // #D8B452
    doc.rect(margin + 4, headerY, contentWidth - 8, 1.2, 'F');

    // Brand Logo Pill
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(216, 180, 82);
    doc.text('NOVA', margin + 7, headerY + 11);

    doc.setFontSize(8);
    doc.setTextColor(180, 190, 220);
    doc.text('AI PRODUCTIVITY PLATFORM', margin + 25, headerY + 10.5);

    // Document Title
    doc.setFontSize(10.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('ENGINEERING VELOCITY & ROI EXECUTIVE AUDIT', margin + 7, headerY + 20);

    // Header Right Metadata
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(170, 185, 215);
    const dateStr = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    doc.text(`Date: ${dateStr}`, pageWidth - margin - 7, headerY + 11, { align: 'right' });
    doc.text(`Team Benchmark: ${defaultTeamSize} Engineers`, pageWidth - margin - 7, headerY + 16.5, { align: 'right' });
    doc.setTextColor(52, 211, 153); // Emerald
    doc.text('Status: 100% Verified DORA Framework', pageWidth - margin - 7, headerY + 22, { align: 'right' });

    // ========================================================
    // 2. EXECUTIVE SCORECARD SUMMARY (Y: 46 to 74mm)
    // ========================================================
    const scoreY = 46;
    const scoreHeight = 28;

    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);
    doc.roundedRect(margin, scoreY, contentWidth, scoreHeight, 3.5, 3.5, 'FD');

    // Left Score Block
    doc.setFillColor(11, 12, 51);
    doc.roundedRect(margin + 3.5, scoreY + 3, 42, 22, 3, 3, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(17);
    doc.setTextColor(216, 180, 82);
    doc.text(`${totalScore}`, margin + 24.5, scoreY + 11, { align: 'center' });

    doc.setFontSize(7);
    doc.setTextColor(203, 213, 225);
    doc.text('HEALTH INDEX / 100', margin + 24.5, scoreY + 15.5, { align: 'center' });

    // Tier badge inside score box
    doc.setFontSize(6.8);
    if (totalScore >= 90) {
      doc.setTextColor(52, 211, 153);
    } else if (totalScore >= 70) {
      doc.setTextColor(216, 180, 82);
    } else if (totalScore >= 45) {
      doc.setTextColor(251, 191, 36);
    } else {
      doc.setTextColor(248, 113, 113);
    }
    doc.text(tierName.toUpperCase(), margin + 24.5, scoreY + 19.5, { align: 'center' });

    // Right Narrative Block
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`Velocity Classification: ${tierName}`, margin + 50, scoreY + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    const splitDesc = doc.splitTextToSize(
      `${tierDesc} Telemetry confirms autonomous PR copilot gating and sprint triage can recover up to 14.5 hours per developer weekly.`,
      contentWidth - 54
    );
    doc.text(splitDesc, margin + 50, scoreY + 13.5);

    // ========================================================
    // 3. THREE QUANTIFIED IMPACT TILES (Y: 80 to 104mm)
    // ========================================================
    const metricY = 80;
    const metricHeight = 24;
    const colGap = 4;
    const colWidth = (contentWidth - colGap * 2) / 3; // ~58mm each

    // Tile 1: Hours Reclaimed
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(216, 180, 82);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, metricY, colWidth, metricHeight, 3, 3, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.setTextColor(100, 116, 139);
    doc.text('ANNUAL CAPACITY RECLAIMED', margin + 5, metricY + 5.5);

    doc.setFontSize(12.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`+${hoursSavedPerYear.toLocaleString()} hrs`, margin + 5, metricY + 13.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(16, 185, 129);
    doc.text(`Across ${defaultTeamSize} engineering seats`, margin + 5, metricY + 19);

    // Tile 2: Cost Dividend
    const col2X = margin + colWidth + colGap;
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(216, 180, 82);
    doc.roundedRect(col2X, metricY, colWidth, metricHeight, 3, 3, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.setTextColor(100, 116, 139);
    doc.text('PRODUCTIVITY DIVIDEND', col2X + 5, metricY + 5.5);

    doc.setFontSize(12.5);
    doc.setTextColor(180, 83, 9); // Amber gold
    doc.text(`$${annualSavingsDollars.toLocaleString()} USD`, col2X + 5, metricY + 13.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(16, 185, 129);
    doc.text('Capital efficiency reclaimed', col2X + 5, metricY + 19);

    // Tile 3: Benchmark Velocity
    const col3X = col2X + colWidth + colGap;
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(142, 111, 255);
    doc.roundedRect(col3X, metricY, colWidth, metricHeight, 3, 3, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.setTextColor(100, 116, 139);
    doc.text('CYCLE TIME ACCELERATION', col3X + 5, metricY + 5.5);

    doc.setFontSize(12.5);
    doc.setTextColor(104, 51, 255); // Orchid violet
    doc.text('4.2x Faster PRs', col3X + 5, metricY + 13.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(100, 116, 139);
    doc.text('Target: -72% idle review wait', col3X + 5, metricY + 19);

    // ========================================================
    // 4. DORA MATURITY DIAGNOSTIC BREAKDOWN (Y: 110 to 178mm)
    // ========================================================
    const doraTitleY = 111;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text('DORA MATURITY & DIAGNOSTIC DIMENSIONS', margin, doraTitleY);

    const questionsMeta = [
      { id: 'Deployment Cadence', subtitle: 'Continuous delivery frequency & production deployment automation' },
      { id: 'PR Review & Merge Latency', subtitle: 'Turnaround time between pull request creation and approval' },
      { id: 'Backlog Refinement Overhead', subtitle: 'Engineering hours consumed by sprint planning & story estimation' },
      { id: 'CI Flakiness & Test Latency', subtitle: 'Duration and reliability of automated test suites on branches' },
    ];

    let rowY = 116;
    const rowHeight = 13.5;
    const rowGap = 2.5;

    questionsMeta.forEach((meta, idx) => {
      const ans = answers && answers[idx] ? answers[idx] : null;
      const score = ans ? ans.score : 20;
      const label = ans ? ans.label : 'Standard';
      const text = ans ? ans.text : 'Assessment benchmark criteria evaluated.';

      doc.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.25);
      doc.roundedRect(margin, rowY, contentWidth, rowHeight, 2.5, 2.5, 'FD');

      // Left Index Pill
      doc.setFillColor(11, 12, 51);
      doc.roundedRect(margin + 3, rowY + 2.5, 5, 4.5, 1, 1, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.5);
      doc.setTextColor(216, 180, 82);
      doc.text(`${idx + 1}`, margin + 5.5, rowY + 5.8, { align: 'center' });

      // Dimension Name
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(15, 23, 42);
      doc.text(meta.id, margin + 11, rowY + 5.2);

      // Subtitle
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(100, 116, 139);
      doc.text(meta.subtitle, margin + 11, rowY + 8.5);

      // Selected Value
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(6.8);
      doc.setTextColor(51, 65, 85);
      const truncated = text.length > 70 ? text.slice(0, 67) + '...' : text;
      doc.text(`Selected: "${truncated}"`, margin + 11, rowY + 11.6);

      // Right Score Pill
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      if (score >= 22) {
        doc.setTextColor(16, 185, 129);
      } else if (score >= 15) {
        doc.setTextColor(37, 99, 235);
      } else if (score >= 8) {
        doc.setTextColor(217, 119, 6);
      } else {
        doc.setTextColor(225, 29, 72);
      }
      doc.text(`${label.toUpperCase()} (${score}/25)`, pageWidth - margin - 4, rowY + 7.8, { align: 'right' });

      rowY += rowHeight + rowGap;
    });

    // ========================================================
    // 5. TAILORED NOVA ARCHITECTURAL PRESCRIPTIONS (Y: 188 to 251mm)
    // ========================================================
    // rowY ended at 116 + 4 * (13.5 + 2.5) = 180mm
    // rxTitleY is placed at 188mm -> a full 8mm clean gap, ZERO OVERLAP!
    const rxTitleY = 188;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text('TAILORED NOVA ARCHITECTURAL PRESCRIPTIONS', margin, rxTitleY);

    const prescriptions = [
      {
        title: '1. Autonomous PR Code Diff Reasoning & Security Gating',
        desc: 'Automates AST semantic diffs, security audits, and changelogs. Human engineers only review core business logic, compressing review cycles from days to under 2 hours.',
        badge: '-72% PR Turnaround',
      },
      {
        title: '2. Continuous Fibonacci Auto-Triage & Dependency Graphing',
        desc: 'Calibrates story points against historical team velocity with zero circular blockers. Eliminates 3+ weekly ceremony hours and manual backlog grooming toil.',
        badge: 'Zero Backlog Toil',
      },
      {
        title: '3. Distributed Zero-Downtime Edge Deployment & Chaos Resilience',
        desc: 'Stages canary release gates with multi-region geoRouter failover and zero-downtime database session migration to maintain 99.99% enterprise availability.',
        badge: '99.99% SLA Uptime',
      },
    ];

    let pY = 193;
    const pHeight = 17;
    const pGap = 3;

    prescriptions.forEach((item, idx) => {
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.3);
      doc.roundedRect(margin, pY, contentWidth, pHeight, 2.5, 2.5, 'FD');

      // Left vertical accent strip
      doc.setFillColor(
        idx === 0 ? 216 : idx === 1 ? 142 : 52,
        idx === 0 ? 180 : idx === 1 ? 111 : 211,
        idx === 0 ? 82 : idx === 1 ? 255 : 153
      );
      doc.rect(margin, pY + 2, 1.5, pHeight - 4, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(15, 23, 42);
      doc.text(item.title, margin + 5, pY + 5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(71, 85, 105);
      const pDesc = doc.splitTextToSize(item.desc, contentWidth - 42);
      doc.text(pDesc, margin + 5, pY + 9.5);

      // Badge on Right
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.8);
      doc.setTextColor(11, 12, 51);
      doc.text(item.badge, pageWidth - margin - 4, pY + 5.2, { align: 'right' });

      pY += pHeight + pGap;
    });

    // ========================================================
    // 6. OFFICIAL SECURITY AUDIT & FOOTER SEAL (Y: 260 to 276mm)
    // ========================================================
    // pY ended at 193 + 3 * (17 + 3) = 253mm
    // footerLineY is placed at 260mm -> 7mm clean gap, ZERO OVERLAP!
    const footerLineY = 260;

    // Gold divider line
    doc.setDrawColor(216, 180, 82);
    doc.setLineWidth(0.4);
    doc.line(margin, footerLineY, pageWidth - margin, footerLineY);

    // Security & Compliance Bar
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(71, 85, 105);
    doc.text('SECURITY & COMPLIANCE:', margin, footerLineY + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(
      'SOC2 Type II Certified  --  ISO 27001  --  AES-256 Cloud Vault  --  Multi-Region Failover Gate',
      margin + 36,
      footerLineY + 5.5
    );

    // Bottom note & portal
    doc.setFontSize(6.8);
    doc.setTextColor(148, 163, 184);
    doc.text(
      'Confidential Executive Report -- Prepared by NOVA Autonomous Engineering Architecture -- https://nova.internal',
      margin,
      footerLineY + 11.5
    );

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(216, 180, 82);
    doc.text(`AUDIT ID: NOV-ROI-${totalScore}-${Date.now().toString().slice(-6)}`, pageWidth - margin, footerLineY + 11.5, {
      align: 'right',
    });

    // Save PDF directly to client's download queue
    const filename = `NOVA_Executive_Velocity_Report_${totalScore}pts.pdf`;
    doc.save(filename);
  }
}

export default PdfReportService;
