function generateDigitCarPolicyHTML(policyData) {
    // Helper function to render a table row for premium details
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
                .policy-box { max-width: 900px; margin: auto; padding: 20px; border: 2px solid #0056b3; background-color: #fcfcfc; }
                .header { text-align: center; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 3px solid #f60; }
                .header h1 { font-size: 18pt; margin: 0; color: #f60; }
                .header h2 { font-size: 14pt; margin: 5px 0 10px 0; font-weight: normal; color: #0056b3; }
                .section-title { font-size: 12pt; font-weight: bold; margin-top: 20px; margin-bottom: 10px; padding: 5px 0; border-bottom: 1px solid #ccc; color: #555; }
                .detail-table, .vehicle-table, .premium-table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
                .detail-table td, .vehicle-table td { padding: 5px 0; vertical-align: top; border: none; }
                .detail-table td:first-child, .vehicle-table td:first-child { font-weight: bold; width: 35%; }
                .premium-table th, .premium-table td { border: 1px solid #ddd; padding: 6px 10px; text-align: left; }
                .premium-table th { background-color: #f9f9f9; font-weight: bold; }
                .total-row td { background-color: #ffeadc; font-weight: bold; border-top: 2px solid #f60; }
                .idv-box { text-align: center; padding: 15px; background-color: #e6f7ff; border: 1px dashed #0056b3; margin-top: 10px;}
                .idv-box p { font-size: 20pt; font-weight: bold; color: #c00; margin: 5px 0; }
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

                <div class="section-title">Policy Details</div>
                <table class="detail-table">
                    <tr><td>Name:</td><td>${policyData.insuredName}</td></tr>
                    <tr><td>Address:</td><td>${policyData.address}</td></tr>
                    <tr><td>Mobile No / Email:</td><td>${policyData.contactNo} / ${policyData.email}</td></tr>
                    <tr><td>GSTIN No:</td><td>${policyData.insuredGSTIN}</td></tr>
                </table>

                <div class="section-title">Period of Insurance</div>
                <table class="premium-table">
                    <thead>
                        <tr><th style="width: 33%;">Cover Type</th><th style="width: 33%;">Valid From</th><th style="width: 33%;">Valid Till</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Own Damage (OD) Cover</td><td>${policyData.odCover.from}</td><td>${policyData.odCover.to}</td></tr>
                        <tr><td>Third Party Liability (TP)</td><td>${policyData.tpCover.from}</td><td>${policyData.tpCover.to}</td></tr>
                        <tr><td>PA Cover for Owner-Driver</td><td>${policyData.cpaCover.from}</td><td>${policyData.cpaCover.to}</td></tr>
                    </tbody>
                </table>
                
                <div class="section-title">Your Vehicle Details</div>
                <table class="vehicle-table" style="width: 60%; float: left;">
                    <tr><td>Registration Number:</td><td>${policyData.vehicle.regNo}</td></tr>
                    <tr><td>Make / Model & Variant:</td><td>${policyData.vehicle.makeModel} / ${policyData.vehicle.variant}</td></tr>
                    <tr><td>Cubic Capacity / Seating:</td><td>${policyData.vehicle.cc} / ${policyData.vehicle.seatingCapacity}</td></tr>
                    <tr><td>Engine No. / Chassis No:</td><td>${policyData.vehicle.engineNo} / ${policyData.vehicle.chassisNo}</td></tr>
                    <tr><td>Year of Regn. / Mfg:</td><td>${policyData.vehicle.regYear} / ${policyData.vehicle.mfgYear}</td></tr>
                    <tr><td>RTO Location:</td><td>${policyData.vehicle.rtoLocation}</td></tr>
                    <tr><td>Financier:</td><td>${policyData.vehicle.financier}</td></tr>
                </table>
                <div class="idv-box" style="width: 30%; float: right;">
                    <span style="font-size: 10pt; font-weight: bold; color: #000;">TOTAL INSURED DECLARED VALUE (IDV) (₹)</span>
                    <p>₹ ${policyData.vehicle.idv}</p>
                    <p style="font-size: 12pt; color: #0056b3; font-weight: normal;">PA Owner-Driver CSI: ₹ ${policyData.vehicle.paOwnerDriverCSI}</p>
                </div>
                <div style="clear: both;"></div>

                <div class="section-title">Schedule of Premium (₹)</div>
                <table class="premium-table">
                    <thead><tr><th colspan="2">OWN DAMAGE PREMIUM [A]</th></tr></thead>
                    <tbody>
                        ${renderPremiumRow('Total Basic Own Damage Premium', policyData.premium.basicOD)}
                        ${renderPremiumRow('NCB Discount Amount (Less: 20%)', policyData.premium.ncbDiscount)}
                        ${renderPremiumRow('Others (Loading/Discount/Adjustment)', policyData.premium.others)}
                        ${renderPremiumRow('Add-Ons Premium', policyData.premium.addOns)}
                        <tr style="background-color: #f0f8ff;"><td style="font-weight: bold;">Total OD Premium</td><td class="right-align" style="font-weight: bold;">${policyData.premium.totalOD}</td></tr>
                    </tbody>
                    <thead><tr><th colspan="2">LIABILITY PREMIUM [B] (ACT)</th></tr></thead>
                    <tbody>
                        ${renderPremiumRow('Basic Third-Party Liability', policyData.premium.basicTP)}
                        ${renderPremiumRow('PA cover for Owner-Driver', policyData.premium.cpaCover)}
                        <tr style="background-color: #f0f8ff;"><td style="font-weight: bold;">Total Act Premium (TP + PA)</td><td class="right-align" style="font-weight: bold;">${policyData.premium.totalAct}</td></tr>
                    </tbody>
                    <thead><tr><th colspan="2">FINAL PREMIUM CALCULATION</th></tr></thead>
                    <tbody>
                        ${renderPremiumRow('Net Premium (OD + Act)', policyData.premium.netPremium)}
                        ${renderPremiumRow('CGST + SGST (Total 18%)', policyData.premium.gstAmount)}
                        <tr class="total-row">
                            <td>TOTAL FINAL PREMIUM</td>
                            <td class="right-align">₹ ${policyData.premium.finalPremium}</td>
                        </tr>
                    </tbody>
                </table>
                
                <div class="section-title">Deductible & Nominee Details</div>
                <table class="detail-table" style="width: 50%; float: left;">
                    <tr><td>NCB % (Current):</td><td>${policyData.other.ncbPercent}%</td></tr>
                    <tr><td>Compulsory Deductible:</td><td>₹ ${policyData.other.compulsoryDeductible}</td></tr>
                    <tr><td>Voluntary Deductible:</td><td>₹ ${policyData.other.voluntaryDeductible}</td></tr>
                </table>
                <table class="detail-table" style="width: 45%; float: right;">
                    <tr><td>Nominee Name:</td><td>${policyData.nominee.name}</td></tr>
                    <tr><td>Nominee Relationship:</td><td>${policyData.nominee.relationship}</td></tr>
                    <tr><td>Nominee DOB:</td><td>${policyData.nominee.dob}</td></tr>
                </table>
                <div style="clear: both;"></div>

                <div style="margin-top: 30px; border-top: 1px solid #ccc; padding-top: 10px; text-align: center;">
                    <p style="font-size: 9pt; margin: 0;">For & On Behalf of Go Digit General Insurance Ltd</p>
                    <p style="font-size: 9pt; margin: 0;">Authorized Signatory: Praveen Bhat, Senior Vice President Customer Experience</p>
                    <p style="font-size: 9pt; margin: 0;">Printed, Signed, and Executed at Bengaluru on ${policyData.issueDate}</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

export default generateDigitCarPolicyHTML;