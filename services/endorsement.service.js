import generatePDF from '../generater/pdfgenerationEngine.js';

// template 
import generateEndorsementHTML from '../template/Endorsement/generateEndorsementHTML.js'
const endorsementGenerators = {
    'General Endorsement Document': [generateEndorsementHTML]
};

export default class endorsementPdfService {
    static async generaterendorsementPdf(payload) {
        try {
            if (!payload || typeof payload !== 'object') {
                throw new Error("Invalid payload provided.");
            }
            const htmlContent = endorsementGenerators['General Endorsement Document'][0](payload);
            const pdfBuffer = await generatePDF(htmlContent);
            return pdfBuffer;
        } catch (error) {
            console.error("Pay-In Slip PDF generation failed:", error);
            throw new Error(`Failed to generate Pay-In Slip PDF: ${error.message}`);
        }

    }
}