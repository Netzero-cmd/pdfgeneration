import puppeteer from "puppeteer";

function generateDatedFileName(prefix = "pdf", ext = "pdf") {
    const now = new Date();
    const datePart = now
        .toISOString()
        .replace(/:/g, "-")
        .split(".")[0];
    return `${prefix}_${datePart}.${ext}`;
}

async function generatePDF(htmlContent, outputFile, options = {}) {
    if (!htmlContent) throw new Error("HTML content is required.");
    // auto-generate filename if not provided
    const finalFileName = outputFile || generateDatedFileName("downloaded");

    const defaultPdfOptions = {
        path: finalFileName,
        format: "A4",
        printBackground: true,
        preferCSSPageSize: true,
        ...options
    };

    let browser;

    try {
        browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });

        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });

        await page.setContent(htmlContent, {
            waitUntil: ["load", "domcontentloaded", "networkidle0"]
        });

        const pdfBuffer = await page.pdf(defaultPdfOptions);

        console.log(`PDF created at: ${finalFileName}`);
        return pdfBuffer;
    } finally {
        if (browser) await browser.close();
    }
}

export default generatePDF;
