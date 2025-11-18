import generatePDF from '../generater/pdfgenerationEngine.js';


// template 
import generateCancellationRequestHTML from '../template/Cancellation/generateCancellationRequestHTML.js'
import generateRefundCancellationHTML from '../template/Cancellation/generateRefundCancellationHTML.js'


const cancellationGenerators = {
    'Cancellation Request': [generateCancellationRequestHTML],
    'Refund Document': [generateRefundCancellationHTML]
};
export default class cancellationPdfService {
    static async generaterRefuncPdf(payload) {
        try {
            if (!payload || typeof payload !== 'object') {
                throw new Error("Invalid payload provided.");
            }
            const htmlContent = cancellationGenerators['Refund Document'][0](payload);
            const pdfBuffer = await generatePDF(htmlContent);
            return pdfBuffer;
        } catch (error) {
            console.error("Pay-In Slip PDF generation failed:", error);
            throw new Error(`Failed to generate Pay-In Slip PDF: ${error.message}`);
        }
    }
    static async generaterRequestPdf(payload) {
        try {
            if (!payload || typeof payload !== 'object') {
                throw new Error("Invalid payload provided.");
            }
            const htmlContent = cancellationGenerators['Cancellation Request'][0](payload);
            const pdfBuffer = await generatePDF(htmlContent);
            return pdfBuffer;
        } catch (error) {
            console.error("Pay-In Slip PDF generation failed:", error);
            throw new Error(`Failed to generate Pay-In Slip PDF: ${error.message}`);
        }
    }
}