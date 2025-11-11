import generatePDF from '../generater/pdfgenerationEngine.js';



// template 
import generateUniversalSompoQuoteHTML from '../template/quotations/generateQuoteHTMLUniversalSpmpo.js'
import generateQuoteHTMLGoDigit from '../template/quotations/generateQuoteHTMLGoDigit.js'
import generateZurichKotakQuoteHTML from '../template/quotations/generateQuoteHTMLKotak.js'
import generateMagmaQuoteHTML from '../template/quotations/generateQuoteHTMLMagma.js'
import generateTataAIGQuoteHTML from '../template/quotations/generateQuoteHTMLTataAIG.js';

const quoteGenerators = {
    'Go Digit General Insurance': [generateQuoteHTMLGoDigit],
    'Magma HDI General Insurance': [generateMagmaQuoteHTML],
    'Tata AIG General Insurance': [generateTataAIGQuoteHTML],
    'Universal Sompo General Insurance': [generateUniversalSompoQuoteHTML],
    'Zurich Kotak General Insurance': [generateZurichKotakQuoteHTML]
};

export default class quotationPdfService {
    static async generaterquotationPdf(payload) {
        if (!payload || typeof payload !== 'object') {
            throw new Error("Invalid payload provided.");
        }
        try {
            const { insurerName } = payload;
            if (!insurerName) {
                throw new Error("Missing required fields: insurerName");
            }
            if (!quoteGenerators[insurerName] || !quoteGenerators[insurerName][0]) {
                throw new Error(`No PDF generator found for insurer: ${insurerName}`);
            }
            const htmlContent = quoteGenerators[insurerName][0](payload);
            const pdfBuffer = await generatePDF(htmlContent);
            return pdfBuffer;
        } catch (error) {
            console.error("Quotation PDF generation failed:", error);
            throw new Error(`Failed to generate Quotation PDF: ${error.message}`);
        }
    }
}