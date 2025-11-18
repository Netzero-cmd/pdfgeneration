import generatePDF from '../generater/pdfgenerationEngine.js';

// template 
import generateInvoiceHTML from '../template/invoice/invoice.js'

const invoiceGenerators = {
    'General Invoice': [generateInvoiceHTML]
};
export default class invoicePdfService {
    static async generaterinvoicePdf(payload) {
        try {
            if (!payload || typeof payload !== 'object') {
                throw new Error("Invalid payload provided.");
            }
            const htmlContent = invoiceGenerators['General Invoice'][0](payload);
            const pdfBuffer = await generatePDF(htmlContent);
            return pdfBuffer;
        } catch (error) {
            console.error("Pay-In Slip PDF generation failed:", error);
            throw new Error(`Failed to generate Pay-In Slip PDF: ${error.message}`);
        }

    }
}