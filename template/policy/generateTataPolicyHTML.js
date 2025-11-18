function generatePolicyForTataHTML(policyData) {
    const renderPremiumRow = (label, value) => `
        <tr>
            <td style="padding: 5px 8px;">${label}</td>
            <td style="padding: 5px 8px; text-align: right;">${value}</td>
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
                .policy-box { max-width: 900px; margin: auto; padding: 20px; border: 1px solid #ccc; }
                .header { text-align: center; margin-bottom: 20px; }
                .header h1 { font-size: 16pt; margin: 0; color: #c00; }
                .header h2 { font-size: 12pt; margin: 5px 0 15px 0; font-weight: normal; }
                .section-title { font-size: 12pt; font-weight: bold; margin-top: 20px; margin-bottom: 10px; padding: 5px 0; border-bottom: 2px solid #333; }
                .detail-table, .vehicle-table, .premium-table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
                .detail-table td, .vehicle-table td { padding: 5px 0; vertical-align: top; border: none; }
                .premium-table th, .premium-table td { border: 1px solid #000; padding: 5px 8px; text-align: left; }
                .premium-table th { background-color: #f2f2f2; }
                .bold { font-weight: bold; }
                .right-align { text-align: right; }
                .total-row td { background-color: #fee; font-weight: bold; }
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
                    <tr>
                        <td style="width: 25%;"><span class="bold">Insured Name:</span></td>
                        <td style="width: 75%;">${policyData.insuredName}</td>
                    </tr>
                    <tr>
                        <td><span class="bold">Address:</span></td>
                        <td>
                            ${policyData.addressLine1},<br>
                            ${policyData.addressLine2},<br>
                            ${policyData.addressLine3},<br>
                            ${policyData.addressCityZip}
                        </td>
                    </tr>
                    <tr>
                        <td><span class="bold">Contact/Email:</span></td>
                        <td>${policyData.contactNo} | ${policyData.email}</td>
                    </tr>
                </table>

                <div class="section-title">Period of Insurance</div>
                <table class="premium-table" style="text-align: center;">
                    <thead>
                        <tr>
                            <th style="width: 33%;">Cover Type</th>
                            <th style="width: 33%;">Valid From</th>
                            <th style="width: 33%;">Valid Till</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Own Damage (OD) Cover Period</td>
                            <td>${policyData.odCover.from}</td>
                            <td>${policyData.odCover.to}</td>
                        </tr>
                        <tr>
                            <td>Third Party (TP) Cover Period</td>
                            <td>${policyData.tpCover.from}</td>
                            <td>${policyData.tpCover.to}</td>
                        </tr>
                        <tr>
                            <td>CPA Cover for Owner Driver</td>
                            <td>${policyData.cpaCover.from}</td>
                            <td>${policyData.cpaCover.to}</td>
                        </tr>
                    </tbody>
                </table>

                <div class="section-title">Vehicle Details & Insured Declared Value (IDV)</div>
                <table class="vehicle-table" style="width: 50%; float: left;">
                    <tr><td class="bold" style="width: 50%;">Registration No:</td><td style="width: 50%;">${policyData.vehicle.regNo}</td></tr>
                    <tr><td class="bold">Make/Model:</td><td>${policyData.vehicle.makeModel}</td></tr>
                    <tr><td class="bold">Registration Date:</td><td>${policyData.vehicle.regDate}</td></tr>
                    <tr><td class="bold">Engine Number:</td><td>${policyData.vehicle.engineNo}</td></tr>
                    <tr><td class="bold">Chassis Number:</td><td>${policyData.vehicle.chassisNo}</td></tr>
                    <tr><td class="bold">Hypothecation:</td><td>${policyData.vehicle.hypothecation}</td></tr>
                </table>
                <table class="vehicle-table" style="width: 45%; float: right; border: 1px solid #000;">
                    <tr>
                        <td class="bold" style="background-color: #f9f9f9; padding: 8px;">Total IDV (₹)</td>
                    </tr>
                    <tr>
                        <td style="font-size: 14pt; font-weight: bold; text-align: center; padding: 10px;">
                            ₹ ${policyData.vehicle.idv}
                        </td>
                    </tr>
                </table>
                <div style="clear: both;"></div>

                <div class="section-title">Schedule of Premium</div>
                <table class="premium-table">
                    <thead>
                        <tr>
                            <th style="width: 70%;">Description</th>
                            <th style="width: 30%;" class="right-align">Amount (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td colspan="2" class="bold" style="background-color: #f9f9f9;">SECTION I: Own Damage (A)</td></tr>
                        ${renderPremiumRow('Basic Own Damage Premium', policyData.premium.basicOD)}
                        ${renderPremiumRow('Add-On: Depreciation Allowance (TA 16)', policyData.premium.addOn)}
                        <tr><td colspan="2" class="bold" style="background-color: #f9f9f9;">SECTION II: Liability (B)</td></tr>
                        ${renderPremiumRow('Basic TP Premium', policyData.premium.basicTP)}
                        ${renderPremiumRow('One Year Compulsory PA Cover for Owner Driver (₹15,00,000 CSI)', policyData.premium.cpaCover)}
                        <tr><td colspan="2" style="background-color: #fff; font-weight: bold; text-align: right;">Net Premium (A+B+C)</td></tr>
                        ${renderPremiumRow('Net Premium (A+B+C)', policyData.premium.netPremium)}
                        ${renderPremiumRow(`IGST @${policyData.premium.gstRate}`, policyData.premium.gstAmount)}
                        <tr class="total-row">
                            <td class="right-align">TOTAL POLICY PREMIUM</td>
                            <td class="right-align">₹ ${policyData.premium.total}</td>
                        </tr>
                    </tbody>
                </table>
                
                <div class="section-title">Nominee Details (Under Section III: PA to Owner Driver CSI: 1,500,000.00)</div>
                <table class="detail-table" style="width: 50%;">
                    <tr><td class="bold" style="width: 30%;">Name of the Nominee:</td><td>${policyData.nominee.name}</td></tr>
                    <tr><td class="bold">Relationship:</td><td>${policyData.nominee.relationship}</td></tr>
                    <tr><td class="bold">Nominee Age:</td><td>${policyData.nominee.age}</td></tr>
                </table>
                
                <div style="margin-top: 30px; border-top: 1px solid #333; padding-top: 10px; text-align: center;">
                    <p style="font-size: 9pt; margin: 0;">For & On Behalf of Tata AIG General Insurance Company Ltd.</p>
                    <p class="bold" style="font-size: 9pt; margin: 0;">Digitally Signed by: Malpa Devi Maharana</p>
                    <p style="font-size: 9pt; margin: 0;">Date: ${policyData.issueDate} | Location: Mumbai</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

export default generatePolicyForTataHTML;