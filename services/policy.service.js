import generatePDF from '../generater/pdfgenerationEngine.js';


// template 
import generateBajajAllianzCarPolicyHTML from '../template/policy/generateBajajAllianzCarPolicyHTML.js'
import generateDigitCarPolicyHTML from '../template/policy/generateDigitCarPolicyHTML.js'
import generateLibertyCommercialPolicyHTML from '../template/policy/generateLibertyCommercialPolicyHTML.js'
import generateMagmaHDICVPolicyHTML from '../template/policy/generateMagmaHDICVPolicyHTML.js'
import generateNewIndiaTwoWheelerPolicyHTML from '../template/policy/generateNewIndiaTwoWheelerPolicyHTML.js'
import generateReliancePolicyHTML from '../template/policy/generateReliancePolicyHTML.js'
import generateRoyalSundaramPCVPolicyHTML from '../template/policy/generateRoyalSundaramPCVPolicyHTML.js'
import generateSBIGeneralCommercialPolicyHTML from '../template/policy/generateSBIGeneralCommercialPolicyHTML.js'
import generateShriramGICVPolicyHTML from '../template/policy/generateShriramGICVPolicyHTML.js'
import generatePolicyForTataHTML from '../template/policy/generateTataPolicyHTML.js'
import generateUniversalSompoPolicyHTML from '../template/policy/generateUniversalSompoPolicyHTML.js'
import generateZurichKotakPolicyHTML from '../template/policy/generateZurichKotakPolicyHTML.js'

const policyGenerators = {
    'Bajaj Allianz General Insurance': [generateBajajAllianzCarPolicyHTML],
    'Go Digit General Insurance': [generateDigitCarPolicyHTML],
    'Liberty General Insurance': [generateLibertyCommercialPolicyHTML],
    'Magma HDI General Insurance': [generateMagmaHDICVPolicyHTML],
    'The New India Assurance': [generateNewIndiaTwoWheelerPolicyHTML],
    'Reliance General Insurance': [generateReliancePolicyHTML],
    'Royal Sundaram General Insurance': [generateRoyalSundaramPCVPolicyHTML],
    'SBI General Insurance': [generateSBIGeneralCommercialPolicyHTML],
    'Shriram General Insurance': [generateShriramGICVPolicyHTML],
    'Tata AIG General Insurance': [generatePolicyForTataHTML],
    'Universal Sompo General Insurance': [generateUniversalSompoPolicyHTML],
    'Zurich Kotak General Insurance': [generateZurichKotakPolicyHTML]
};
export default class policyPdfService {
    static async generaterpolicyPdf(payload) {
        if (!payload || typeof payload !== 'object') {
            throw new Error("Invalid payload provided.");
        }
        try {
            const { insurerName, insuredName, policyNo } = payload;
            if (!insurerName || !insuredName || !policyNo) {
                throw new Error("Missing required fields: insurerName, insuredName, or policyNo.");
            }
            if (!policyGenerators[insurerName] || !policyGenerators[insurerName][0]) {
                throw new Error(`No PDF generator found for insurer: ${insurerName}`);
            }
            const htmlContent = policyGenerators[insurerName][0](payload);
            const pdfBuffer = await generatePDF(htmlContent);
            return pdfBuffer;
        } catch (error) {
            console.error("Policy PDF generation failed:", error);
            throw new Error(`Failed to generate policy PDF: ${error.message}`);
        }
    }
}