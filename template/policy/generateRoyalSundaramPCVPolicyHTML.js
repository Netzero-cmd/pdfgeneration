function generateRoyalSundaramPCVPolicyHTML(policyData) {
    // Helper function to render a table row for premium/detail items
    const renderPremiumRow = (label, value) => `
        <tr>
            <td style="padding: 5px 8px; width: 70%;">${label}</td>
            <td style="padding: 5px 8px; width: 30%; text-align: right; color: #333;">${value}</td>
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
                .policy-box { max-width: 900px; margin: auto; padding: 20px; border: 2px solid #ed1c24; background-color: #fffafa; }
                .header { text-align: center; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 3px solid #0056b3; }
                .header h1 { font-size: 16pt; margin: 0; color: #0056b3; }
                .header h2 { font-size: 12pt; margin: 5px 0 10px 0; font-weight: normal; color: #ed1c24;}
                .section-title { font-size: 12pt; font-weight: bold; margin-top: 20px; margin-bottom: 8px; padding: 5px 0; border-bottom: 2px solid #ed1c24; color: #ed1c24; }
                .detail-table, .vehicle-table, .premium-table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
                .detail-table td, .vehicle-table td { padding: 4px 0; vertical-align: top; border: none; }
                .detail-table td:first-child, .vehicle-table td:first-child { font-weight: bold; width: 35%; }
                .premium-table th, .premium-table td { border: 1px solid #ddd; padding: 6px 10px; text-align: left; }
                .premium-table th { background-color: #e6f7ff; font-weight: bold; }
                .total-row td { background-color: #0056b3; color: #fff; font-weight: bold; border-top: 2px solid #000; }
                .idv-box { text-align: center; padding: 10px; background-color: #fff; border: 1px solid #ed1c24; margin-bottom: 15px;}
                .idv-box p { font-size: 18pt; font-weight: bold; color: #0056b3; margin: 5px 0; }
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
                    <tr><td>Mobile No / Email ID:</td><td>${policyData.contactNo} / ${policyData.emailId}</td></tr>
                    <tr><td>Service Branch:</td><td>${policyData.serviceBranch}</td></tr>
                </table>

                <div class="section-title">Period of Insurance</div>
                <table class="premium-table">
                    <thead>
                        <tr><th style="width: 33%;">Cover Type</th><th style="width: 33%;">Valid From</th><th style="width: 33%;">Valid Till</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Policy Period</td><td>${policyData.coveragePeriod.from}</td><td>${policyData.coveragePeriod.to}</td></tr>
                        <tr><td>Geographical Area:</td><td colspan="2">${policyData.geographicalArea}</td></tr>
                    </tbody>
                </table>
                
                <div class="section-title">Vehicle Details & Insured Declared Value (IDV)</div>
                <table class="vehicle-table" style="width: 65%; float: left;">
                    <tr><td>Registration Number:</td><td>${policyData.vehicle.regNo}</td></tr>
                    <tr><td>Make / Model:</td><td>${policyData.vehicle.make} / ${policyData.vehicle.modelDescription}</td></tr>
                    <tr><td>Chassis No. / Engine No.:</td><td>${policyData.vehicle.chassisNo} / ${policyData.vehicle.engineNo}</td></tr>
                    <tr><td>Mfg Year / Fuel Type:</td><td>${policyData.vehicle.mfgYear} / ${policyData.vehicle.fuelType}</td></tr>
                    <tr><td>Seating Capacity (Excl. Driver):</td><td>${policyData.vehicle.seatingCapacity}</td></tr>
                    <tr><td>Hypothecation/Financer:</td><td>${policyData.vehicle.hypothecation}</td></tr>
                </table>
                <div class="idv-box" style="width: 30%; float: right;">
                    <span style="font-size: 10pt;">Insured Declared Value (IDV) (₹)</span>
                    <p>₹ ${policyData.vehicle.idv}</p>
                    <p style="font-size: 10pt; color: #ed1c24;">NCB Entitlement: ${policyData.other.ncbPercent}%</p>
                </div>
                <div style="clear: both;"></div>

                <div class="section-title">Schedule of Premium (₹)</div>
                <table class="premium-table">
                    <thead><tr><th colspan="2">PREMIUM BREAKDOWN</th></tr></thead>
                    <tbody>
                        ${renderPremiumRow('Basic Own Damage (OD) Premium', policyData.premium.basicOD)}
                        ${renderPremiumRow('Less: NCB Discount (50%)', policyData.premium.ncbDiscount)}
                        ${policyData.addOns.map(a => renderPremiumRow(`Add-on: ${a.name}`, a.premium)).join('')}
                        <tr style="background-color: #f0f0f0;"><td style="font-weight: bold;">Net Own Damage Premium</td><td class="right-align" style="font-weight: bold;">${policyData.premium.netOD}</td></tr>
                        
                        ${renderPremiumRow('Basic Third Party (TP) Liability Premium', policyData.premium.basicTP)}
                        ${renderPremiumRow('PA Cover for Owner-Driver (CSI ₹15 Lakhs)', policyData.premium.paOwnerDriver)}
                        <tr style="background-color: #f0f0f0;"><td style="font-weight: bold;">Total Liability Premium</td><td class="right-align" style="font-weight: bold;">${policyData.premium.totalLiability}</td></tr>

                        ${renderPremiumRow('Net Taxable Premium', policyData.premium.taxablePremium)}
                        ${renderPremiumRow(`Add: IGST @ ${policyData.premium.gstRate}`, policyData.premium.gstAmount)}
                        <tr class="total-row">
                            <td>TOTAL PREMIUM PAYABLE</td>
                            <td class="right-align">₹ ${policyData.premium.finalPremium}</td>
                        </tr>
                    </tbody>
                </table>
                
                <div class="section-title">Other Policy Details</div>
                <table class="detail-table" style="width: 100%;">
                    <tr><td style="width: 45%;">Compulsory Deductible:</td><td>₹ ${policyData.other.compulsoryDeductible}</td></tr>
                    <tr><td>Previous Policy No / Insurer:</td><td>${policyData.other.previousPolicyNo} / ${policyData.other.previousInsurer}</td></tr>
                    <tr><td>IMT Endorsement Nos:</td><td>${policyData.other.imtEndorsements}</td></tr>
                </table>

                <div style="margin-top: 30px; border-top: 1px solid #ccc; padding-top: 10px; text-align: center;">
                    <p style="font-size: 9pt; margin: 0;">For Royal Sundaram General Insurance Co. Limited</p>
                    <p style="font-size: 9pt; margin: 0;">This is a computer-generated document.</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

export default generateRoyalSundaramPCVPolicyHTML;