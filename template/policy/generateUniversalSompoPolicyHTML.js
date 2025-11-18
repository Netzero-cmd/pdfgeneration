function generateUniversalSompoPolicyHTML(policyData) {
    const renderPremiumRow = (label, value) => `
        <tr>
            <td style="padding: 5px 8px; width: 70%;">${label}</td>
            <td style="padding: 5px 8px; width: 30%; text-align: right; font-weight: bold;">${value}</td>
        </tr>
    `;

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>${policyData.insurerName}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 20px; font-size: 10pt; color: #333; }
                .policy-box { max-width: 950px; margin: auto; padding: 20px; border: 1px solid #004c99; background-color: #ffffff; }
                .header { text-align: center; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 3px solid #004c99; }
                .header h1 { font-size: 16pt; margin: 0; color: #004c99; }
                .header h2 { font-size: 12pt; margin: 5px 0 10px 0; font-weight: normal; }
                .section-title { font-size: 12pt; font-weight: bold; margin-top: 20px; margin-bottom: 8px; padding: 5px 0; border-bottom: 2px solid #ccc; color: #555; }
                .detail-table, .vehicle-table, .premium-table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
                .detail-table td, .vehicle-table td { padding: 4px 0; vertical-align: top; border: none; }
                .detail-table td:first-child, .vehicle-table td:first-child { font-weight: bold; width: 30%; }
                .premium-table th, .premium-table td { border: 1px solid #ddd; padding: 6px 10px; text-align: left; }
                .premium-table th { background-color: #e6f7ff; font-weight: bold; }
                .total-row td { background-color: #cceeff; font-weight: bold; border-top: 2px solid #004c99; }
                .idv-box { border: 2px solid #ccc; padding: 10px; text-align: center; background-color: #f9f9f9; margin-bottom: 15px; }
                .idv-box p { font-size: 18pt; font-weight: bold; color: #c00; margin: 5px 0; }
            </style>
        </head>
        <body>
            <div class="policy-box">
               <div class="header">
                      <h1>${policyData.insurerName}</h1>
                  </div>
                  <p style="color:black; margin-top:32px;">
                   Dear Customer, Welcome to ${policyData.insurerName}
                   We are delighted to have you with us. If you have any questions or need assistance with your policy, please feel free to reach out. Visit 
                   <a href=${policyData.websiteDetails}>${policyData.websiteDetails}</a>&nbspfor more details.
                  </P>
                  <p style="margin-top: 10px; font-size: 11pt;">Policy Number: <span style="font-weight: bold;">${policyData.policyNo}</span> | Issue Date: ${policyData.issueDate}</p>


                <div class="section-title">Insured Details</div>
                <table class="detail-table">
                    <tr><td>Insured Name:</td><td>${policyData.insuredName}</td></tr>
                    <tr><td>Address:</td><td>${policyData.address}</td></tr>
                    <tr><td>Contact No/Email:</td><td>${policyData.contactNo} / ${policyData.email}</td></tr>
                    <tr><td>GSTIN No:</td><td>${policyData.insuredGSTIN}</td></tr>
                </table>
                
                <div class="section-title">Vehicle Details & Insured Declared Value (IDV)</div>
                <table class="vehicle-table" style="width: 55%; float: left;">
                    <tr><td>Registration No:</td><td>${policyData.vehicle.regNo}</td></tr>
                    <tr><td>Make / Model:</td><td>${policyData.vehicle.makeModel}</td></tr>
                    <tr><td>Chassis No / Engine No:</td><td>${policyData.vehicle.chassisNo} / ${policyData.vehicle.engineNo}</td></tr>
                    <tr><td>CC / Mfg Year / Reg Date:</td><td>${policyData.vehicle.cc} / ${policyData.vehicle.mfgYear} / ${policyData.vehicle.regDate}</td></tr>
                    <tr><td>RTO Location:</td><td>${policyData.vehicle.rtoLocation}</td></tr>
                    <tr><td>Hypothecation/Financer:</td><td>${policyData.vehicle.hypothecation}</td></tr>
                </table>
                <div class="idv-box" style="width: 35%; float: right;">
                    <span style="font-size: 10pt; font-weight: bold;">TOTAL INSURED DECLARED VALUE (IDV) (₹)</span>
                    <p>₹ ${policyData.vehicle.idv}</p>
                </div>
                <div style="clear: both;"></div>

                <div class="section-title">Period of Insurance</div>
                <table class="premium-table">
                    <thead>
                        <tr><th style="width: 33%;">Cover Type</th><th style="width: 33%;">Valid From</th><th style="width: 33%;">Valid Till</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Own Damage (OD) Cover</td><td>${policyData.odCover.from}</td><td>${policyData.odCover.to}</td></tr>
                        <tr><td>Third Party (TP) Cover</td><td>${policyData.tpCover.from}</td><td>${policyData.tpCover.to}</td></tr>
                        <tr><td>Compulsory PA Cover</td><td>${policyData.cpaCover.from}</td><td>${policyData.cpaCover.to}</td></tr>
                    </tbody>
                </table>
                
                <div class="section-title">Schedule of Premium (Amount in Rs.)</div>
                <table class="premium-table">
                    <tr><td colspan="2" style="background-color: #f0faff; font-weight: bold;">SECTION I: OWN DAMAGE (OD)</td></tr>
                    ${renderPremiumRow('Basic Own Damage Premium', policyData.premium.basicOD)}
                    ${renderPremiumRow('Add: TOTAL ADD-ON PREMIUM (e.g., Nil Depreciation)', policyData.premium.addOn)}
                    ${renderPremiumRow('Less: No Claim Bonus (%)', policyData.premium.ncb)}
                    ${renderPremiumRow('NET OWN DAMAGE PREMIUM (I)', policyData.premium.netOD)}
                    
                    <tr><td colspan="2" style="background-color: #f0faff; font-weight: bold;">SECTION II: THIRD-PARTY LIABILITY (TP)</td></tr>
                    ${renderPremiumRow('Basic TP Premium', policyData.premium.basicTP)}
                    ${renderPremiumRow('Compulsory PA Cover for Owner Driver (CSI: ₹15,00,000/-) Premium', policyData.premium.cpaCover)}
                    ${renderPremiumRow('NET LIABILITY PREMIUM (II)', policyData.premium.netTP)}

                    <tr><td colspan="2" style="height: 10px;"></td></tr>
                    ${renderPremiumRow('TOTAL PACKAGE PREMIUM (I+II)', policyData.premium.totalPackage)}
                    ${renderPremiumRow(`IGST @ ${policyData.premium.gstRate}`, policyData.premium.gstAmount)}
                    <tr class="total-row">
                        <td class="right-align">TOTAL POLICY PREMIUM</td>
                        <td class="right-align">₹ ${policyData.premium.total}</td>
                    </tr>
                </table>
                
                <div class="section-title">Other Policy Details</div>
                <table class="detail-table" style="width: 50%; float: left;">
                    <tr><td>Compulsory Deductible:</td><td>₹ ${policyData.other.compulsoryDeductible}</td></tr>
                    <tr><td>Voluntary Deductible:</td><td>₹ ${policyData.other.voluntaryDeductible}</td></tr>
                </table>
                <table class="detail-table" style="width: 45%; float: right;">
                    <tr><td>Nominee for Owner Driver:</td><td>${policyData.nominee.name}</td></tr>
                    <tr><td>Nominee Relationship:</td><td>${policyData.nominee.relationship}</td></tr>
                </table>
                <div style="clear: both;"></div>

                <div style="margin-top: 30px; border-top: 1px solid #ccc; padding-top: 10px; text-align: center;">
                    <p style="font-size: 9pt; margin: 0;">FOR UNIVERSAL SOMPO GENERAL INSURANCE COMPANY LIMITED</p>
                    <p style="font-size: 9pt; margin: 0;">Digitally Signed by: VARSHA MANISH GUJARATHI</p>
                    <p style="font-size: 9pt; margin: 0;">Date: ${policyData.issueDate}</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

export default generateUniversalSompoPolicyHTML; 