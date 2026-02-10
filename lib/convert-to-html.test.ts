
import { describe, it } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Markdown to HTML Converter', () => {
  it('converts CALCULATION_REPORT.md to HTML', () => {
    const mdPath = path.join(process.cwd(), 'CALCULATION_REPORT.md');
    const htmlPath = path.join(process.cwd(), 'CALCULATION_REPORT.html');
    
    if (!fs.existsSync(mdPath)) {
      throw new Error(`File not found: ${mdPath}`);
    }

    const mdContent = fs.readFileSync(mdPath, 'utf-8');
    const lines = mdContent.split('\n');
    
    let htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BEHVA Calculation Report</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }
        h1, h2, h3 { border-bottom: 1px solid #eaeaea; padding-bottom: 0.3em; }
        h1 { color: #2563eb; }
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 1rem 0;
            font-size: 0.9rem;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px 12px;
            text-align: left;
            vertical-align: top;
        }
        th {
            background-color: #f8f9fa;
            font-weight: 600;
        }
        tr:nth-child(even) { background-color: #f9f9f9; }
        tr:hover { background-color: #f1f1f1; }
        ul { padding-left: 20px; }
        code {
            background-color: #f1f1f1;
            padding: 2px 4px;
            border-radius: 4px;
            font-family: monospace;
        }
    </style>
</head>
<body>
`;

    let inTable = false;
    let inList = false;

    lines.forEach((line, index) => {
        // Handle headers
        if (line.startsWith('# ')) {
            htmlContent += `<h1>${line.substring(2)}</h1>\n`;
            return;
        }
        if (line.startsWith('## ')) {
            htmlContent += `<h2>${line.substring(3)}</h2>\n`;
            return;
        }
        if (line.startsWith('### ')) {
            htmlContent += `<h3>${line.substring(4)}</h3>\n`;
            return;
        }
        if (line.startsWith('#### ')) {
            htmlContent += `<h4>${line.substring(5)}</h4>\n`;
            return;
        }

        // Handle Lists
        if (line.trim().startsWith('- ')) {
            if (!inList) {
                htmlContent += '<ul>\n';
                inList = true;
            }
            // Parse Bold in list items
            let content = line.trim().substring(2);
            content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            htmlContent += `<li>${content}</li>\n`;
            return;
        } else if (inList) {
            htmlContent += '</ul>\n';
            inList = false;
        }

        // Handle Tables
        if (line.trim().startsWith('|')) {
            const cells = line.split('|').filter(c => c.trim() !== '').map(c => c.trim());
            
            if (line.includes('---')) {
                // Separator line, ignore
                return;
            }

            if (!inTable) {
                htmlContent += '<table>\n<thead>\n<tr>\n';
                cells.forEach(cell => {
                    htmlContent += `<th>${cell}</th>\n`;
                });
                htmlContent += '</tr>\n</thead>\n<tbody>\n';
                inTable = true;
            } else {
                htmlContent += '<tr>\n';
                cells.forEach(cell => {
                    // Parse Bold in table cells
                    let content = cell.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                    // Handle <br> which is already HTML
                    htmlContent += `<td>${content}</td>\n`;
                });
                htmlContent += '</tr>\n';
            }
            return;
        } else if (inTable) {
            htmlContent += '</tbody>\n</table>\n';
            inTable = false;
        }

        // Handle Paragraphs (simple lines that are not empty)
        if (line.trim().length > 0) {
            let content = line;
            content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            htmlContent += `<p>${content}</p>\n`;
        }
    });

    // Close tags if still open at end of file
    if (inList) htmlContent += '</ul>\n';
    if (inTable) htmlContent += '</tbody>\n</table>\n';

    htmlContent += `
</body>
</html>`;

    fs.writeFileSync(htmlPath, htmlContent);
    console.log("HTML Report generated at CALCULATION_REPORT.html");
  });
});
