import express from "express";
import puppeteer from "puppeteer";
const app = express();


app.use(express.json())

// invoice setup 

import invoiceDataFromDoc from './models/Invoice_data/invoiceDataFromDoc.js'
import generateInvoiceHTML from './template/invoice/invoice.js'


// policy setup 
import bajajAllianzPolicyData from './models/Policy_data/bajajAllianzPolicyData.js'
import digitCarPolicyData from './models/Policy_data/digitCarPolicyData.js';
import libertyCommercialPolicyData from './models/Policy_data/libertyCommercialPolicyData.js'
import magmaHDICVPolicyData from './models/Policy_data/magmaHDICVPolicyData.js'
import newIndiaPolicyData from './models/Policy_data/newIndiaPolicyData.js'
import reliancePolicyData from './models/Policy_data/reliancePolicyData.js'
import royalSundaramPolicyData from './models/Policy_data/royalSundaramPolicyData.js'
import sbiGeneralPolicyData from './models/Policy_data/sbiGeneralPolicyData.js'
import shriramGICVPolicyData from './models/Policy_data/shriramGICVPolicyData.js'
import tataAgipolicyData from './models/Policy_data/tataAgipolicydata.js'
import universalSompoPolicyData from './models/Policy_data/universalSompoPolicyData.js'
import zurichKotakPolicyData from './models/Policy_data/zurichKotakPolicyData.js'



import generateBajajAllianzCarPolicyHTML from './template/policy/generateBajajAllianzCarPolicyHTML.js';
import generateDigitCarPolicyHTML from './template/policy/generateDigitCarPolicyHTML.js'
import generateLibertyCommercialPolicyHTML from './template/policy/generateLibertyCommercialPolicyHTML.js'
import generateMagmaHDICVPolicyHTML from './template/policy/generateMagmaHDICVPolicyHTML.js'
import generateNewIndiaTwoWheelerPolicyHTML from './template/policy/generateNewIndiaTwoWheelerPolicyHTML.js'
import generateReliancePolicyHTML from './template/policy/generateReliancePolicyHTML.js'
import generateRoyalSundaramPCVPolicyHTML from './template/policy/generateRoyalSundaramPCVPolicyHTML.js'
import generateSBIGeneralCommercialPolicyHTML from './template/policy/generateSBIGeneralCommercialPolicyHTML.js'
import generateShriramGICVPolicyHTML from './template/policy/generateShriramGICVPolicyHTML.js'
import generatePolicyForTataHTML from './template/policy/generateTataPolicyHTML.js'
import generateUniversalSompoPolicyHTML from './template/policy/generateUniversalSompoPolicyHTML.js'
import generateZurichKotakPolicyHTML from './template/policy/generateZurichKotakPolicyHTML.js'



const policyGenerators = {
    'Bajaj Allianz General Insurance': [generateBajajAllianzCarPolicyHTML, bajajAllianzPolicyData],
    'Go Digit General Insurance': [generateDigitCarPolicyHTML, digitCarPolicyData],
    'Liberty General Insurance': [generateLibertyCommercialPolicyHTML, libertyCommercialPolicyData],
    'Magma HDI General Insurance': [generateMagmaHDICVPolicyHTML, magmaHDICVPolicyData],
    'The New India Assurance': [generateNewIndiaTwoWheelerPolicyHTML, newIndiaPolicyData],
    'Reliance General Insurance': [generateReliancePolicyHTML, reliancePolicyData],
    'Royal Sundaram General Insurance': [generateRoyalSundaramPCVPolicyHTML, royalSundaramPolicyData],
    'SBI General Insurance': [generateSBIGeneralCommercialPolicyHTML, sbiGeneralPolicyData],
    'Shriram General Insurance': [generateShriramGICVPolicyHTML, shriramGICVPolicyData],
    'Tata AIG General Insurance': [generatePolicyForTataHTML, tataAgipolicyData],
    'Universal Sompo General Insurance': [generateUniversalSompoPolicyHTML, universalSompoPolicyData],
    'Zurich Kotak General Insurance': [generateZurichKotakPolicyHTML, zurichKotakPolicyData]
};

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

app.get("/generate-pdf", async (req, res) => {
    const { policyNo, insuredName, invoiceDate, invoiceNumber } = req.body
    if (invoiceDate && invoiceNumber) {
        try {
            const htmlContent = generateInvoiceHTML(invoiceDataFromDoc);
            const pdfBuffer = await generatePDF(htmlContent);
            res.set({
                "Content-Type": "application/pdf",
                "Content-Disposition": "attachment; filename=output.pdf",
                "Content-Length": pdfBuffer.length
            });
            res.send(pdfBuffer);
        } catch (err) {
            console.error("Error generating PDF:", err);
            res.status(500).send("Error generating PDF");
        }
    }
    else if (policyNo && insuredName) {
        try {
            const htmlContent = policyGenerators[insuredName][0](policyGenerators[insuredName][1])
            const pdfBuffer = await generatePDF(htmlContent);
            res.set({
                "Content-Type": "application/pdf",
                "Content-Disposition": "attachment; filename=output.pdf",
                "Content-Length": pdfBuffer.length
            });
            res.send(pdfBuffer);
        } catch (err) {
            console.error("Error generating PDF:", err);
            res.status(500).send("Error generating PDF");
        }
    }
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
