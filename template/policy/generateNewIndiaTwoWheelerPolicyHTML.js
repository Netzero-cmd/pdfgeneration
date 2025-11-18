function generateNewIndiaTwoWheelerPolicyHTML(policyData) {
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
                .policy-box { max-width: 900px; margin: auto; padding: 20px; border: 2px solid #a80000; background-color: #fcfcfc; }
                .header { text-align: center; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 3px solid #0056b3; }
                .header h1 { font-size: 16pt; margin: 0; color: #a80000; }
                .header h2 { font-size: 12pt; margin: 5px 0 10px 0; font-weight: normal; }
                .section-title { font-size: 12pt; font-weight: bold; margin-top: 20px; margin-bottom: 8px; padding: 5px 0; border-bottom: 1px solid #0056b3; color: #0056b3; }
                .detail-table, .vehicle-table, .premium-table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
                .detail-table td, .vehicle-table td { padding: 4px 0; vertical-align: top; border: none; }
                .detail-table td:first-child, .vehicle-table td:first-child { font-weight: bold; width: 35%; }
                .premium-table th, .premium-table td { border: 1px solid #ddd; padding: 6px 10px; text-align: left; }
                .premium-table th { background-color: #f0f8ff; font-weight: bold; }
                .total-row td { background-color: #ffcccc; font-weight: bold; border-top: 2px solid #a80000; }
                .idv-box { text-align: center; padding: 10px; background-color: #fff; border: 1px solid #a80000; margin-bottom: 15px;}
                .idv-box p { font-size: 18pt; font-weight: bold; color: #a80000; margin: 5px 0; }
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
                    <tr><td>Business Channel/CPSC User:</td><td>${policyData.channelName}</td></tr>
                </table>

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
                
                <div class="section-title">Vehicle Details & Insured Declared Value (IDV)</div>
                <table class="vehicle-table" style="width: 60%; float: left;">
                    <tr><td>Registration Number:</td><td>${policyData.vehicle.regNo}</td></tr>
                    <tr><td>Make / Model:</td><td>${policyData.vehicle.makeModel}</td></tr>
                    <tr><td>Engine No. / Chassis No:</td><td>${policyData.vehicle.engineNo} / ${policyData.vehicle.chassisNo}</td></tr>
                    <tr><td>CC / Seating:</td><td>${policyData.vehicle.cc} / ${policyData.vehicle.seatingCapacity}</td></tr>
                    <tr><td>Mfg Year / Reg Date:</td><td>${policyData.vehicle.mfgYear} / ${policyData.vehicle.regDate}</td></tr>
                    <tr><td>Hypothecation/Financer:</td><td>${policyData.vehicle.hypothecation}</td></tr>
                </table>
                <div class="idv-box" style="width: 35%; float: right;">
                    <span style="font-size: 10pt; font-weight: bold; color: #000;">Insured Declared Value (IDV) (₹)</span>
                    <p>₹ ${policyData.vehicle.idv}</p>
                    <p style="font-size: 10pt; color: #0056b3;">PA Owner-Driver CSI: ₹ ${policyData.vehicle.paOwnerDriverCSI}</p>
                </div>
                <div style="clear: both;"></div>

                <div class="section-title">Schedule of Premium (₹)</div>
                <table class="premium-table">
                    <thead><tr><th colspan="2">OWN DAMAGE PREMIUM [I]</th></tr></thead>
                    <tbody>
                        ${renderPremiumRow('Basic Own Damage Premium', policyData.premium.basicOD)}
                        ${renderPremiumRow('Less: NCB Discount on OD Premium (45%)', policyData.premium.ncbDiscount)}
                        ${renderPremiumRow('Add: Premium for Add-on Covers', policyData.premium.addOns)}
                        <tr style="background-color: #f5f5f5;"><td style="font-weight: bold;">Net OD Premium (I)</td><td class="right-align" style="font-weight: bold;">${policyData.premium.netOD_I}</td></tr>
                    </tbody>
                    <thead><tr><th colspan="2">LIABILITY PREMIUM [II]</th></tr></thead>
                    <tbody>
                        ${renderPremiumRow('Basic Third Party Premium', policyData.premium.basicTP)}
                        ${renderPremiumRow('Compulsory PA to Owner Driver (₹15,00,000/-)', policyData.premium.cpaCover)}
                        <tr style="background-color: #f5f5f5;"><td style="font-weight: bold;">Net Liability Premium (II)</td><td class="right-align" style="font-weight: bold;">${policyData.premium.netLiability_II}</td></tr>
                    </tbody>
                    <thead><tr><th colspan="2">FINAL PREMIUM CALCULATION</th></tr></thead>
                    <tbody>
                        ${renderPremiumRow('Gross Premium (I+II)', policyData.premium.grossPremium)}
                        ${renderPremiumRow(`Less: Discount on Premium (Additional Discount)`, policyData.premium.additionalDiscount)}
                        ${renderPremiumRow('Sub Total (Taxable Value)', policyData.premium.subTotal)}
                        ${renderPremiumRow(`Add: IGST/CGST/SGST @ ${policyData.premium.gstRate}`, policyData.premium.gstAmount)}
                        <tr class="total-row">
                            <td>TOTAL POLICY PREMIUM</td>
                            <td class="right-align">₹ ${policyData.premium.finalPremium}</td>
                        </tr>
                    </tbody>
                </table>
                
                <div class="section-title">Other Policy Details</div>
                <table class="detail-table" style="width: 50%;">
                    <tr><td>Compulsory Deductible:</td><td>₹ ${policyData.other.compulsoryDeductible}</td></tr>
                    <tr><td>NCB % in Expiring Policy:</td><td>${policyData.other.ncbPercentExpiring}%</td></tr>
                    <tr><td>Theft Alarm/Anti-Theft Devices:</td><td>${policyData.other.antiTheftDevice}</td></tr>
                </table>

                <div style="margin-top: 30px; border-top: 1px solid #ccc; padding-top: 10px; text-align: center;">
                    <p style="font-size: 9pt; margin: 0;">For The New India Assurance Co. Ltd.</p>
                    <p style="font-size: 9pt; margin: 0;">Document generated by QR RENEWAL. at 2025/10/14 18:38:04.</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

export default generateNewIndiaTwoWheelerPolicyHTML;