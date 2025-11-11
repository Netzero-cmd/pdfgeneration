import cancellationPdfService from '../services/cancellation.service.js'
export default class cancellationController {
    static refundCancellationPdf(req, res) {
        try {
            const pdf = cancellationPdfService.generaterRefuncPdf(req.body)
            res.set({
                "Content-Type": "application/pdf",
                "Content-Disposition": "attachment; filename=output.pdf",
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
    static requestCancellationPdf(req, res) {
        try {
            const pdf = cancellationPdfService.generaterRequestPdf(req.body);
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