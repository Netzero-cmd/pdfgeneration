import quotationPdfService from '../services/quotation.service.js'

export default class quotationController {
    static quotationPdf(req, res) {
        try {
            const pdf = quotationPdfService.generaterquotationPdf(req.body);
            const fileName = `document_${new Date().toISOString().replace(/:/g, "-")}.pdf`;
            res.set({
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="${fileName}"`,
                "Content-Length": pdf.length
            });
            res.send(pdf);
        } catch (err) {
            console.error("PDF generation failed:", err);

            res.status(500).json({
                success: false,
                message: "PDF could not be created.",
                error: err.message
            });
        }

    }
}

