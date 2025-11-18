function generateZurichKotakPolicyHTML(policyData) {
    const renderPremiumRow = (label, value) => `
        <tr>
            <td style="padding: 5px 8px; width: 70%;">${label}</td>
            <td style="padding: 5px 8px; width: 30%; text-align: right; font-weight: bold;">${value}</td>
        </tr>
    `;
    const renderAddOnRow = (name, premium, sumInsured = 'NA', remarks = '') => `
        <tr>
            <td style="width: 35%; padding: 4px 8px;">${name}</td>
            <td style="width: 25%; padding: 4px 8px; text-align: right;">${sumInsured}</td>
            <td style="width: 25%; padding: 4px 8px; text-align: right;">${premium}</td>
            <td style="width: 15%; padding: 4px 8px; font-size: 9pt;">${remarks}</td>
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
                .policy-box { max-width: 950px; margin: auto; padding: 20px; border: 2px solid #0056b3; background-color: #f7f7f7; }
                .header { text-align: center; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 3px solid #ff6600; }
                .header h1 { font-size: 16pt; margin: 0; color: #0056b3; }
                .header h2 { font-size: 11pt; margin: 5px 0 10px 0; font-weight: normal; }
                .section-title { font-size: 12pt; font-weight: bold; margin-top: 20px; margin-bottom: 8px; padding: 5px 0; border-bottom: 2px solid #ccc; color: #ff6600; }
                .detail-table, .vehicle-table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
                .detail-table td, .vehicle-table td { padding: 4px 0; vertical-align: top; border: none; }
                .detail-table td:first-child, .vehicle-table td:first-child { font-weight: bold; width: 30%; }
                .premium-table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
                .premium-table th, .premium-table td { border: 1px solid #ddd; padding: 6px 10px; text-align: left; }
                .premium-table th { background-color: #e6f7ff; font-weight: bold; }
                .premium-section-header { background-color: #ffeace; font-weight: bold; }
                .total-row td { background-color: #ffcc99; font-weight: bold; border-top: 2px solid #ff6600; }
                .idv-box { text-align: center; padding: 10px; background-color: #fff; border: 1px solid #000; margin-top: 10px;}
                .idv-box p { font-size: 16pt; font-weight: bold; color: #0056b3; margin: 5px 0; }
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


                <div class="section-title">Insured & Policy Details</div>
                <table class="detail-table" style="width: 50%; float: left;">
                    <tr><td>Name:</td><td>${policyData.insuredName}</td></tr>
                    <tr><td>Address:</td><td>${policyData.address}</td></tr>
                    <tr><td>Contact/Email:</td><td>${policyData.contactNo} / ${policyData.email}</td></tr>
                    <tr><td>Hypothecated to:</td><td>${policyData.hypothecation}</td></tr>
                </table>
                <table class="detail-table" style="width: 45%; float: right;">
                    <tr><td>Intermediary Name:</td><td>${policyData.intermediaryName}</td></tr>
                    <tr><td>Period of Insurance:</td><td><span style="font-weight: bold;">From: ${policyData.period.from}</span></td></tr>
                    <tr><td></td><td><span style="font-weight: bold;">To: ${policyData.period.to}</span></td></tr>
                </table>
                <div style="clear: both;"></div>

                <div class="section-title">Vehicle Details & Insured Declared Value (IDV)</div>
                <table class="vehicle-table" style="width: 65%; float: left;">
                    <tr><td>Registration Number:</td><td>${policyData.vehicle.regNo}</td></tr>
                    <tr><td>Manufacturer / Model / Variant:</td><td>${policyData.vehicle.manufacturer} / ${policyData.vehicle.model} / ${policyData.vehicle.variant}</td></tr>
                    <tr><td>Engine / Chassis Number:</td><td>${policyData.vehicle.engineNo} / ${policyData.vehicle.chassisNo}</td></tr>
                    <tr><td>Mfg Year / Fuel Type / Seating:</td><td>${policyData.vehicle.mfgYear} / ${policyData.vehicle.fuelType} / ${policyData.vehicle.seating}</td></tr>
                    <tr><td>RTO Location:</td><td>${policyData.vehicle.rtoLocation}</td></tr>
                </table>
                <div class="idv-box" style="width: 30%; float: right;">
                    <span style="font-size: 10pt;">TOTAL INSURED DECLARED VALUE (IDV) (₹)</span>
                    <p>₹ ${policyData.vehicle.idv}</p>
                    <p style="font-size: 10pt; color: #555;">PA Owner-Driver CSI: ₹ ${policyData.vehicle.paOwnerDriverCSI}</p>
                </div>
                <div style="clear: both;"></div>

                <div class="section-title">Premium Computation Table (₹)</div>
                <table class="premium-table">
                    <thead><tr><th colspan="2" class="premium-section-header">SECTION I: Own Damage (OD)</th></tr></thead>
                    <tbody>
                        ${renderPremiumRow('Basic Own Damage Premium', policyData.premium.basicOD)}
                        ${renderPremiumRow('Add: Add-on Covers Total Premium', policyData.premium.addOns)}
                        ${renderPremiumRow(`Less: No Claim Bonus (${policyData.premium.ncbPercent})`, policyData.premium.ncbDiscount)}
                        <tr style="background-color: #fff9f0;"><td style="font-weight: bold;">Total Own Damage Premium (A)</td><td class="right-align" style="font-weight: bold;">${policyData.premium.totalOD}</td></tr>
                    </tbody>
                    <thead><tr><th colspan="2" class="premium-section-header">SECTION II & III: Liability and Personal Accident</th></tr></thead>
                    <tbody>
                        ${renderPremiumRow('Basic TP Including TPPD Premium', policyData.premium.basicTP)}
                        ${renderPremiumRow('Legal Liability to Paid Driver (IMT 28)', policyData.premium.paidDriverLiability)}
                        ${renderPremiumRow('Total Personal Accident Premium (C) (CSI ₹0)', policyData.premium.totalPA)}
                        <tr style="background-color: #fff9f0;"><td style="font-weight: bold;">Total Liability Premium (B+C)</td><td class="right-align" style="font-weight: bold;">${policyData.premium.totalLiability}</td></tr>
                    </tbody>
                    <thead><tr><th colspan="2" class="premium-section-header">FINAL PREMIUM CALCULATION</th></tr></thead>
                    <tbody>
                        ${renderPremiumRow('Taxable value of Services (A+B+C)', policyData.premium.taxableValue)}
                        ${renderPremiumRow(`IGST @ ${policyData.premium.gstRate}`, policyData.premium.gstAmount)}
                        <tr class="total-row">
                            <td>TOTAL PREMIUM PAYABLE</td>
                            <td class="right-align">₹ ${policyData.premium.finalPremium}</td>
                        </tr>
                    </tbody>
                </table>
                
                <div class="section-title">Deductibles</div>
                <table class="detail-table" style="width: 50%;">
                    <tr><td>Compulsory Deductible:</td><td>₹ ${policyData.other.compulsoryDeductible}</td></tr>
                    <tr><td>Voluntary Deductible:</td><td>₹ ${policyData.other.voluntaryDeductible}</td></tr>
                    <tr><td>Total Deductible:</td><td>₹ ${policyData.other.totalDeductible}</td></tr>
                </table>

                <div class="section-title">Add-On Cover Details</div>
                <table class="premium-table">
                    <thead>
                        <tr>
                            <th style="width: 35%;">Add-On Cover</th>
                            <th style="width: 25%;">Sum Insured (₹)</th>
                            <th style="width: 25%;">Premium (₹)</th>
                            <th style="width: 15%;">Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${policyData.addOnCovers.map(a => renderAddOnRow(a.name, a.premium, a.sumInsured, a.remarks)).join('')}
                    </tbody>
                </table>

                <div style="margin-top: 30px; border-top: 1px solid #ccc; padding-top: 10px; text-align: center;">
                    <p style="font-size: 9pt; margin: 0;">For Zurich Kotak General Insurance Company (India) Limited</p>
                    <p style="font-size: 9pt; margin: 0;">This document is digitally signed, hence counter signature / stamp is not required. Date: ${policyData.issueDate}</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

export default generateZurichKotakPolicyHTML;