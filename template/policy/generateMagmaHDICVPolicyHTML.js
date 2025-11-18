function generateMagmaHDICVPolicyHTML(policyData) {
    // Helper function to render a table row for premium/detail items
    const renderPremiumRow = (label, value, isTotal = false) => `
        <tr ${isTotal ? 'style="background-color: #fce4e4; font-weight: bold;"' : ''}>
            <td style="padding: 5px 8px; width: 70%;">${label}</td>
            <td style="padding: 5px 8px; width: 30%; text-align: right; color: #333; ${isTotal ? 'color: #8c0000;' : ''}">${value}</td>
        </tr>
    `;

    // Helper to render Add-on rows
    const renderAddOnRow = (name, premium) => `
        <tr>
            <td style="width: 70%; padding: 4px 8px;">${name}</td>
            <td style="width: 30%; padding: 4px 8px; text-align: right;">${premium}</td>
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
                .policy-box { max-width: 900px; margin: auto; padding: 20px; border: 2px solid #004d99; background-color: #f9f9f9; }
                .header { text-align: center; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 3px solid #cc0000; }
                .header h1 { font-size: 16pt; margin: 0; color: #cc0000; }
                .header h2 { font-size: 12pt; margin: 5px 0 10px 0; font-weight: normal; }
                .section-title { font-size: 12pt; font-weight: bold; margin-top: 20px; margin-bottom: 8px; padding: 5px 0; border-bottom: 2px solid #004d99; color: #004d99; }
                .detail-table, .vehicle-table, .premium-table, .addon-table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
                .detail-table td, .vehicle-table td { padding: 4px 0; vertical-align: top; border: none; }
                .detail-table td:first-child, .vehicle-table td:first-child { font-weight: bold; width: 35%; }
                .premium-table th, .addon-table th, .premium-table td, .addon-table td { border: 1px solid #ddd; padding: 6px 10px; text-align: left; }
                .premium-table th, .addon-table th { background-color: #e6f2ff; font-weight: bold; }
                .total-row td { background-color: #cc0000; color: #fff; font-weight: bold; border-top: 2px solid #000; }
                .idv-box { text-align: center; padding: 10px; background-color: #fff; border: 1px solid #cc0000; margin-bottom: 15px;}
                .idv-box p { font-size: 18pt; font-weight: bold; color: #cc0000; margin: 5px 0; }
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
                    <tr><td>Mobile No:</td><td>${policyData.contactNo}</td></tr>
                    <tr><td>Agent/Intermediary:</td><td>${policyData.intermediaryName} (${policyData.intermediaryCode})</td></tr>
                </table>

                <div class="section-title">Period of Insurance</div>
                <table class="detail-table" style="width: 50%;">
                    <tr><td>OD Cover Period:</td><td>${policyData.period.from} to ${policyData.period.to}</td></tr>
                    <tr><td>TP Cover Period:</td><td>${policyData.period.from} to ${policyData.period.to}</td></tr>
                    <tr><td>Geographical Area:</td><td>India</td></tr>
                </table>

                <div class="section-title">Vehicle Details & Insured Declared Value (IDV)</div>
                <table class="vehicle-table" style="width: 65%; float: left;">
                    <tr><td>Registration Number:</td><td>${policyData.vehicle.regNo}</td></tr>
                    <tr><td>Make / Model:</td><td>${policyData.vehicle.makeModel}</td></tr>
                    <tr><td>Chassis No / Engine No:</td><td>${policyData.vehicle.chassisNo} / ${policyData.vehicle.engineNo}</td></tr>
                    <tr><td>Mfg Year / Reg Date:</td><td>${policyData.vehicle.mfgYear} / ${policyData.vehicle.regDate}</td></tr>
                    <tr><td>Fuel / CC / GVW:</td><td>${policyData.vehicle.fuelType} / ${policyData.vehicle.cc} / ${policyData.vehicle.gvw}</td></tr>
                    <tr><td>Carrying Capacity (Excl. Driver):</td><td>${policyData.vehicle.carryingCapacity}</td></tr>
                    <tr><td>Hypothecation/Financer:</td><td>${policyData.vehicle.hypothecation}</td></tr>
                </table>
                <div class="idv-box" style="width: 30%; float: right;">
                    <span style="font-size: 10pt;">Insured Declared Value (IDV) (₹)</span>
                    <p>₹ ${policyData.vehicle.idv}</p>
                    <p style="font-size: 10pt; color: #004d99;">PA Owner-Driver CSI: ₹ ${policyData.vehicle.paOwnerDriverCSI}</p>
                </div>
                <div style="clear: both;"></div>

                <div class="section-title">Schedule of Premium (₹)</div>
                <table class="premium-table">
                    <thead><tr><th colspan="2">OWN DAMAGE PREMIUM (A)</th></tr></thead>
                    <tbody>
                        ${renderPremiumRow('Basic Own Damage Premium (OD)', policyData.premium.basicOD)}
                        ${renderPremiumRow('Discount for NCB (20%)', policyData.premium.ncbDiscount)}
                        ${renderPremiumRow('Premium for Geographical Extension', policyData.premium.geographicalExtension)}
                        <tr style="background-color: #f0f0f0;"><td style="font-weight: bold;">Net OD Premium (A)</td><td class="right-align" style="font-weight: bold;">${policyData.premium.netOD_A}</td></tr>
                    </tbody>
                    <thead><tr><th colspan="2">LIABILITY PREMIUM (B)</th></tr></thead>
                    <tbody>
                        ${renderPremiumRow('Basic Third Party Premium (TP)', policyData.premium.basicTP)}
                        ${renderPremiumRow('PA Cover for Owner Driver (CSI ₹15 Lakhs)', policyData.premium.paOwnerDriver)}
                        ${renderPremiumRow('Legal Liability to Paid Driver (IMT 28)', policyData.premium.paidDriverLiability)}
                        <tr style="background-color: #f0f0f0;"><td style="font-weight: bold;">Total Liability Premium (B)</td><td class="right-align" style="font-weight: bold;">${policyData.premium.totalLiability_B}</td></tr>
                    </tbody>
                    <thead><tr><th colspan="2">ADD-ON COVERS PREMIUM (C)</th></tr></thead>
                    <table class="addon-table">
                        ${policyData.addOns.map(a => renderAddOnRow(a.name, a.premium)).join('')}
                        <tr><td style="background-color: #f0f0f0; font-weight: bold;">Total Add-On Premium (C)</td><td class="right-align" style="background-color: #f0f0f0; font-weight: bold;">${policyData.premium.totalAddOns_C}</td></tr>
                    </table>
                    <thead><tr><th colspan="2">FINAL PREMIUM CALCULATION</th></tr></thead>
                    <tbody>
                        ${renderPremiumRow('Gross Premium (A+B+C)', policyData.premium.grossPremium)}
                        ${renderPremiumRow(`IGST @ ${policyData.premium.gstRate}`, policyData.premium.gstAmount)}
                        <tr class="total-row">
                            <td>TOTAL PREMIUM PAYABLE</td>
                            <td class="right-align">₹ ${policyData.premium.finalPremium}</td>
                        </tr>
                    </tbody>
                </table>

                <div class="section-title">Other Policy Details</div>
                <table class="detail-table" style="width: 100%;">
                    <tr><td style="width: 45%;">Previous Insurer:</td><td>${policyData.other.previousInsurer}</td></tr>
                    <tr><td>Compulsory Deductible:</td><td>₹ ${policyData.other.compulsoryDeductible}</td></tr>
                    <tr><td>Voluntary Deductible:</td><td>₹ ${policyData.other.voluntaryDeductible}</td></tr>
                    <tr><td>Anti-Theft Device:</td><td>${policyData.other.antiTheftDevice}</td></tr>
                </table>

                <div style="margin-top: 30px; border-top: 1px solid #004d99; padding-top: 10px; text-align: center;">
                    <p style="font-size: 9pt; margin: 0;">For Magma HDI General Insurance Company Limited</p>
                    <p style="font-size: 9pt; margin: 0;">This is a computer-generated Policy Schedule cum Certificate of Insurance, hence does not require signature.</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

export default generateMagmaHDICVPolicyHTML;