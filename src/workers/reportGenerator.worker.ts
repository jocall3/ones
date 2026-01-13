// src/workers/reportGenerator.worker.ts

// This worker generates reports in the background, preventing the main thread from blocking.
// It can handle large datasets and complex formatting.

// Example: Generating a CSV report

interface ReportData {
  headers: string[];
  rows: any[][];
  type: 'csv' | 'pdf' | 'json'; // Add more types as needed
  filename: string;
  options?: any; // Optional parameters for specific report types
}

addEventListener('message', async (event: MessageEvent<ReportData>) => {
  const { data } = event;

  try {
    switch (data.type) {
      case 'csv':
        const csvData = generateCsv(data.headers, data.rows);
        postMessage({
          type: 'csv',
          data: csvData,
          filename: data.filename,
        });
        break;
      case 'json':
        const jsonData = generateJson(data.rows);
        postMessage({
          type: 'json',
          data: jsonData,
          filename: data.filename,
        });
        break;
      // case 'pdf': // Example: PDF generation (requires a PDF library)
      //   const pdfData = await generatePdf(data.headers, data.rows, data.options);
      //   postMessage({
      //     type: 'pdf',
      //     data: pdfData,
      //     filename: data.filename,
      //   });
      //   break;
      default:
        postMessage({ error: 'Unsupported report type' });
    }
  } catch (error: any) {
    postMessage({ error: error.message });
  }
});

function generateCsv(headers: string[], rows: any[][]): string {
  const headerString = headers.join(',') + '\n';
  const rowStrings = rows.map((row) => row.map(escapeCsvField).join(',')).join('\n');
  return headerString + rowStrings;
}

function generateJson(rows: any[][]): string {
  return JSON.stringify(rows, null, 2);
}

function escapeCsvField(field: any): string {
  if (field == null) {
    return '';
  }
  let str = String(field);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    str = '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

// Example PDF generation (requires a PDF library like jsPDF)
// async function generatePdf(headers: string[], rows: any[][], options: any): Promise<Uint8Array> {
//   // Import jsPDF dynamically to avoid errors if not used
//   const { jsPDF } = await import('jspdf');

//   const doc = new jsPDF();

//   // Add headers
//   doc.setFontSize(12);
//   let x = 10;
//   headers.forEach((header) => {
//     doc.text(header, x, 10);
//     x += 30; // Adjust spacing as needed
//   });

//   // Add rows
//   let y = 20;
//   rows.forEach((row) => {
//     x = 10;
//     row.forEach((cell) => {
//       doc.text(String(cell), x, y);
//       x += 30;
//     });
//     y += 10;
//   });

//   return doc.output('arraybuffer');
// }