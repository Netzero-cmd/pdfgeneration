function generateReliancePolicyHTML(policyData) {
    // Helper function to render a table row for premium details
    const renderPremiumRow = (label, value) => `
        <tr>
            <td style="padding: 5px 8px; width: 70%;">${label}</td>
            <td style="padding: 5px 8px; width: 30%; text-align: right;">${value}</td>
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
                .policy-box { max-width: 900px; margin: auto; padding: 20px; border: 1px solid #0056b3; background-color: #f7f7f7; }
                .header { text-align: center; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 3px solid #0056b3; }
                .header h1 { font-size: 16pt; margin: 0; color: #0056b3; }
                .header p { font-size: 11pt; margin: 5px 0; }
                .section-title { font-size: 12pt; font-weight: bold; margin-top: 25px; margin-bottom: 10px; padding: 5px 0; border-bottom: 2px solid #ccc; color: #0056b3; }
                .detail-table, .vehicle-table, .premium-table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
                .detail-table td, .vehicle-table td { padding: 5px 0; vertical-align: top; border: none; }
                .detail-table td:first-child, .vehicle-table td:first-child { font-weight: bold; width: 30%; }
                .premium-table th, .premium-table td { border: 1px solid #ccc; padding: 6px 10px; text-align: left; }
                .premium-table th { background-color: #e6f0ff; font-weight: bold; }
                .total-row td { background-color: #cceeff; font-weight: bold; border-top: 2px solid #0056b3; }
                .idv-box { border: 2px solid #000; padding: 15px; text-align: center; background-color: #fff; margin-top: 15px; }
                .idv-box h3 { margin: 0; font-size: 14pt; color: #000; }
                .idv-box p { font-size: 20pt; font-weight: bold; color: #0056b3; margin-top: 5px; }
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


                <div class="section-title">Insured Details & Communication</div>
                <table class="detail-table">
                    <tr><td>Insured Name:</td><td>${policyData.insuredName}</td></tr>
                    <tr><td>Communication Address:</td><td>${policyData.address}</td></tr>
                    <tr><td>Mobile No:</td><td>${policyData.contactNo}</td></tr>
                    <tr><td>Email-ID:</td><td>${policyData.email}</td></tr>
                    <tr><td>Place of Supply:</td><td>${policyData.placeOfSupply}</td></tr>
                </table>
                
                <div class="section-title">Period of Insurance</div>
                <table class="premium-table">
                    <thead>
                        <tr><th style="width: 40%;">Cover Type</th><th style="width: 30%;">Valid From</th><th style="width: 30%;">Valid Till</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Own Damage (OD) Cover</td><td>${policyData.odCover.from}</td><td>${policyData.odCover.to}</td></tr>
                        <tr><td>Liability (TP) Cover</td><td>${policyData.tpCover.from}</td><td>${policyData.tpCover.to}</td></tr>
                        <tr><td>Compulsory PA Cover</td><td>${policyData.cpaCover.from}</td><td>${policyData.cpaCover.to}</td></tr>
                    </tbody>
                </table>

                <div class="section-title">Vehicle Details & Insured Declared Value (IDV)</div>
                <table class="vehicle-table" style="width: 60%; float: left;">
                    <tr><td>Registration No:</td><td>${policyData.vehicle.regNo}</td></tr>
                    <tr><td>Make / Model & Variant:</td><td>${policyData.vehicle.makeModel}</td></tr>
                    <tr><td>Mfg. Month & Year:</td><td>${policyData.vehicle.mfgMonthYear}</td></tr>
                    <tr><td>RTO Location:</td><td>${policyData.vehicle.rtoLocation}</td></tr>
                    <tr><td>Engine No. / Chassis No:</td><td>${policyData.vehicle.engineNo} / ${policyData.vehicle.chassisNo}</td></tr>
                    <tr><td>CC / Seating Capacity:</td><td>${policyData.vehicle.cc} / ${policyData.vehicle.seatingCapacity}</td></tr>
                    <tr><td>Hypothecation / Lease:</td><td>${policyData.vehicle.hypothecation}</td></tr>
                </table>
                <div class="idv-box" style="width: 30%; float: right;">
                    <h3>Total Insured Declared Value (IDV)</h3>
                    <p>₹ ${policyData.vehicle.idv}</p>
                </div>
                <div style="clear: both;"></div>
                
                <div class="section-title">Schedule of Premium (₹)</div>
                <table class="premium-table">
                    <tr><td colspan="2" class="bold" style="background-color: #f0f8ff;">SECTION I: Own Damage</td></tr>
                    ${renderPremiumRow('Basic OD Premium (Including Add-on: Nil Depreciation)', policyData.premium.basicOD)}
                    <tr><td colspan="2" class="bold" style="background-color: #f0f8ff;">SECTION II & III: Liability and PA Benefits</td></tr>
                    ${renderPremiumRow('Basic Liability Premium (TPPD ₹1,00,000/-)', policyData.premium.basicTP)}
                    ${renderPremiumRow('Compulsory PA Cover to Owner Driver (CSI ₹15,00,000/-)', policyData.premium.cpaCover)}
                    ${renderPremiumRow('Total Package Premium (Sec I + II + III)', policyData.premium.totalPackage)}
                    <tr><td colspan="2" style="height: 10px;"></td></tr>
                    ${renderPremiumRow(`IGST @ ${policyData.premium.gstRate}`, policyData.premium.gstAmount)}
                    <tr class="total-row">
                        <td class="right-align">TOTAL PREMIUM PAYABLE</td>
                        <td class="right-align">₹ ${policyData.premium.total}</td>
                    </tr>
                </table>
                
                <div class="section-title">Other Key Details</div>
                <table class="detail-table" style="width: 60%; float: left;">
                    <tr><td>Compulsory Deductible:</td><td>₹ ${policyData.other.deductible}</td></tr>
                    <tr><td>NCB on Previous Policy:</td><td>${policyData.other.ncbPercent}%</td></tr>
                </table>
                <table class="detail-table" style="width: 35%; float: right;">
                    <tr><td>PA Nominee Name:</td><td>${policyData.nominee.name}</td></tr>
                    <tr><td>Relationship / Age:</td><td>${policyData.nominee.relationship} / ${policyData.nominee.age}</td></tr>
                </table>
                <div style="clear: both;"></div>

                <div style="margin-top: 30px; border-top: 1px solid #ccc; padding-top: 10px; text-align: center;">
                    <p style="font-size: 9pt; margin: 0;">For Reliance General Insurance Company Ltd.</p>
                    <p class="bold" style="font-size: 9pt; margin: 0;">Digitally Signed by: Reliance General Insurance Company Limited</p>
                    <p style="font-size: 9pt; margin: 0;">Date: ${policyData.invoiceDate}</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

export default generateReliancePolicyHTML;