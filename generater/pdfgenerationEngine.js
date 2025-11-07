import puppeteer from "puppeteer";

async function generatePDF(htmlContent, outputFile = "output.pdf") {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: "networkidle0" });
        // generate PDF from page content
        const pdf = await page.pdf({ path: outputFile, format: "A4" });
        await browser.close();
        console.log(`pdf created at: ${outputFile}`);
        return pdf;
    }
    catch (err) {
        throw new Error(`PDF generation error: ${err.message}`);
    }
}

export default generatePDF;
