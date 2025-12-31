import { PDFDocument, rgb, StandardFonts, PDFFont, PageSizes } from 'pdf-lib';
import { promises as fs } from 'fs';
// Assuming a central types file for the project structure, e.g., src/types.ts
import { Book } from '../types';

/**
 * A utility class for exporting generated books to various formats.
 * Provides static methods for exporting to JSON and PDF.
 */
export class ExportService {

    /**
     * Exports a book object to a JSON file.
     * This is useful for saving the raw book data for later use, debugging, or processing.
     * @param book The book object to export.
     * @param filePath The full path where the JSON file will be saved (e.g., './output/book.json').
     */
    public static async exportAsJson(book: Book, filePath: string): Promise<void> {
        try {
            // Pretty-print with 2-space indentation for readability
            const jsonContent = JSON.stringify(book, null, 2);
            await fs.writeFile(filePath, jsonContent, 'utf-8');
            console.log(`Successfully exported book to JSON at: ${filePath}`);
        } catch (error) {
            console.error(`Failed to export book to JSON at ${filePath}:`, error);
            throw new Error('JSON export failed.');
        }
    }

    /**
     * Exports a book object to a PDF file.
     * This method formats the book with a title page, chapters, and embedded images.
     * @param book The book object to export.
     * @param filePath The full path where the PDF file will be saved (e.g., './output/book.pdf').
     */
    public static async exportAsPdf(book: Book, filePath: string): Promise<void> {
        try {
            const pdfDoc = await PDFDocument.create();
            const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
            const timesRomanBoldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

            const pageOptions = {
                size: PageSizes.A4,
                margins: {
                    top: 72,    // 1 inch
                    bottom: 72, // 1 inch
                    left: 72,   // 1 inch
                    right: 72,  // 1 inch
                },
            };

            const { width, height } = pageOptions.size;
            const { top, bottom, left, right } = pageOptions.margins;
            const contentWidth = width - left - right;

            // --- Add Title Page ---
            this.createTitlePage(pdfDoc, book, pageOptions.size, timesRomanBoldFont, timesRomanFont);

            // --- Add Chapters ---
            const chapterTitleFontSize = 24;
            const bodyFontSize = 12;
            const lineHeight = bodyFontSize * 1.5;

            for (const chapter of book.chapters) {
                let page = pdfDoc.addPage(pageOptions.size);
                let y = height - top;

                // Draw Chapter Title
                page.drawText(chapter.title, {
                    x: left,
                    y,
                    font: timesRomanBoldFont,
                    size: chapterTitleFontSize,
                    color: rgb(0, 0, 0),
                });
                y -= chapterTitleFontSize * 2;

                // Draw Mermaid Graph Image if it exists
                if (chapter.graphImage) {
                    try {
                        const image = await pdfDoc.embedPng(chapter.graphImage);
                        const imageDims = image.scaleToFit(contentWidth, height / 2); // Scale to fit content width and max half page height

                        // Check if there's enough space for the image
                        if (y - imageDims.height < bottom) {
                            page = pdfDoc.addPage(pageOptions.size);
                            y = height - top;
                        }

                        page.drawImage(image, {
                            x: left + (contentWidth - imageDims.width) / 2, // Center the image
                            y: y - imageDims.height,
                            width: imageDims.width,
                            height: imageDims.height,
                        });
                        y -= imageDims.height + lineHeight;
                    } catch (imgError) {
                        console.error(`Could not embed image for chapter "${chapter.title}":`, imgError);
                        const errorText = '[Error: Could not load chapter image]';
                        page.drawText(errorText, { x: left, y, font: timesRomanFont, size: bodyFontSize, color: rgb(1, 0, 0) });
                        y -= lineHeight;
                    }
                }

                // Draw Chapter Content
                const lines = this.wrapText(chapter.content, timesRomanFont, bodyFontSize, contentWidth);
                for (const line of lines) {
                    if (y < bottom + lineHeight) {
                        page = pdfDoc.addPage(pageOptions.size);
                        y = height - top;
                    }
                    page.drawText(line, {
                        x: left,
                        y,
                        font: timesRomanFont,
                        size: bodyFontSize,
                        color: rgb(0, 0, 0),
                    });
                    y -= lineHeight;
                }
            }

            const pdfBytes = await pdfDoc.save();
            await fs.writeFile(filePath, pdfBytes);
            console.log(`Successfully exported book to PDF at: ${filePath}`);

        } catch (error) {
            console.error(`Failed to export book to PDF at ${filePath}:`, error);
            throw new Error('PDF export failed.');
        }
    }

    /**
     * Creates a title page for the PDF document.
     * @private
     */
    private static createTitlePage(
        pdfDoc: PDFDocument,
        book: Book,
        pageSize: [number, number],
        titleFont: PDFFont,
        authorFont: PDFFont
    ): void {
        const [width, height] = pageSize;
        const titlePage = pdfDoc.addPage(pageSize);
        const titleFontSize = 40;
        const authorFontSize = 20;

        const titleWidth = titleFont.widthOfTextAtSize(book.title, titleFontSize);
        titlePage.drawText(book.title, {
            x: (width - titleWidth) / 2,
            y: height / 2 + 50,
            font: titleFont,
            size: titleFontSize,
            color: rgb(0, 0, 0),
        });

        const authorText = `by ${book.author}`;
        const authorWidth = authorFont.widthOfTextAtSize(authorText, authorFontSize);
        titlePage.drawText(authorText, {
            x: (width - authorWidth) / 2,
            y: height / 2,
            font: authorFont,
            size: authorFontSize,
            color: rgb(0.2, 0.2, 0.2),
        });
    }

    /**
     * A helper method to wrap text to fit within a given width. It respects paragraph breaks.
     * @private
     * @param text The full string of text to wrap.
     * @param font The PDFFont being used.
     * @param fontSize The size of the font.
     * @param maxWidth The maximum width the text can occupy.
     * @returns An array of strings, where each string is a line of wrapped text.
     */
    private static wrapText(text: string, font: PDFFont, fontSize: number, maxWidth: number): string[] {
        const lines: string[] = [];
        const paragraphs = text.split(/\n/);

        for (const paragraph of paragraphs) {
            if (paragraph.trim() === '') {
                lines.push(''); // Preserve empty lines between paragraphs
                continue;
            }

            const words = paragraph.split(' ');
            let currentLine = '';

            for (const word of words) {
                const testLine = currentLine === '' ? word : `${currentLine} ${word}`;
                const width = font.widthOfTextAtSize(testLine, fontSize);

                if (width < maxWidth) {
                    currentLine = testLine;
                } else {
                    lines.push(currentLine);
                    currentLine = word;
                }
            }
            lines.push(currentLine);
        }

        return lines;
    }
}