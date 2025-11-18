import generatePDF from '../generater/pdfgenerationEngine.js';
import generatePayInSlipHTML from '../template/PayInSlip/generatePayInSlipHTML.js';

const payInSlipGenerators = {
    "Standard Pay-In Slip": generatePayInSlipHTML
};

export default class payInSlipPdfservice {
    static async generaterpayInSlipPdf(payload) {
        try {
            if (!payload || typeof payload !== 'object') {
                throw new Error("Invalid payload provided.");
            }
            const htmlContent = payInSlipGenerators["Standard Pay-In Slip"](payload);
            const pdfBuffer = await generatePDF(htmlContent);
            return pdfBuffer;
        } catch (error) {
            console.error("Pay-In Slip PDF generation failed:", error);
            throw new Error(`Failed to generate Pay-In Slip PDF: ${error.message}`);
        }
    }
}
