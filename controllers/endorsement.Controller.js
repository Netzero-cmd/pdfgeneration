import endorsementPdfService from '../services/endorsement.service.js'
export default class endorsementController {
    static endorsementPdf(req, res) {
        try {
            const pdf = endorsementPdfService.generaterendorsementPdf(req.body);
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