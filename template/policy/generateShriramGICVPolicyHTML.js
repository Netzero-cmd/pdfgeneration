function generateShriramGICVPolicyHTML(policyData) {
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
                .policy-box { max-width: 900px; margin: auto; padding: 20px; border: 2px solid #0056b3; background-color: #f0f8ff; }
                .header { text-align: center; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 3px solid #cc0000; }
                .header h1 { font-size: 16pt; margin: 0; color: #cc0000; }
                .header h2 { font-size: 12pt; margin: 5px 0 10px 0; font-weight: normal; }
                .section-title { font-size: 12pt; font-weight: bold; margin-top: 20px; margin-bottom: 8px; padding: 5px 0; border-bottom: 2px solid #0056b3; color: #0056b3; }
                .detail-table, .vehicle-table, .premium-table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
                .detail-table td, .vehicle-table td { padding: 4px 0; vertical-align: top; border: none; }
                .detail-table td:first-child, .vehicle-table td:first-child { font-weight: bold; width: 35%; }
                .premium-table th, .premium-table td { border: 1px solid #ddd; padding: 6px 10px; text-align: left; }
                .premium-table th { background-color: #e6f7ff; font-weight: bold; }
                .total-row td { background-color: #cc0000; color: #fff; font-weight: bold; border-top: 2px solid #000; }
                .idv-box { text-align: center; padding: 10px; background-color: #fff; border: 1px solid #0056b3; margin-bottom: 15px;}
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
                    <tr><td>Contact Details:</td><td>${policyData.contactNo}</td></tr>
                    <tr><td>GSTIN:</td><td>${policyData.gstin}</td></tr>
                </table>

                <div class="section-title">Period of Insurance</div>
                <table class="premium-table">
                    <thead>
                        <tr><th style="width: 33%;">Policy Type</th><th style="width: 33%;">Valid From</th><th style="width: 33%;">Valid Till</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Package Policy</td><td>${policyData.coveragePeriod.from}</td><td>${policyData.coveragePeriod.to}</td></tr>
                        <tr><td>Geographical Area:</td><td colspan="2">${policyData.geographicalArea}</td></tr>
                    </tbody>
                </table>
                
                <div class="section-title">Insured Vehicle Details & IDV</div>
                <table class="vehicle-table" style="width: 65%; float: left;">
                    <tr><td>Registration Number:</td><td>${policyData.vehicle.regNo}</td></tr>
                    <tr><td>Make / Model & Variant:</td><td>${policyData.vehicle.makeModelVariant}</td></tr>
                    <tr><td>Engine No. / Chassis No:</td><td>${policyData.vehicle.engineNo} / ${policyData.vehicle.chassisNo}</td></tr>
                    <tr><td>Mfg Year / Reg Date:</td><td>${policyData.vehicle.mfgYear} / ${policyData.vehicle.firstRegDate}</td></tr>
                    <tr><td>Fuel / CC / GVW:</td><td>${policyData.vehicle.fuel} / ${policyData.vehicle.cc} / ${policyData.vehicle.gvw}</td></tr>
                    <tr><td>Seating / Passenger Carrying Capacity:</td><td>${policyData.vehicle.seatingCapacity} / ${policyData.vehicle.passengerCapacity}</td></tr>
                    <tr><td>Hypothecation/Financer:</td><td>${policyData.vehicle.hypothecation}</td></tr>
                </table>
                <div class="idv-box" style="width: 30%; float: right;">
                    <span style="font-size: 10pt;">Insured Declared Value (IDV) (₹)</span>
                    <p>₹ ${policyData.vehicle.idv}</p>
                    <p style="font-size: 10pt; color: #cc0000;">Deductible: ₹ ${policyData.other.compulsoryDeductible}</p>
                </div>
                <div style="clear: both;"></div>

                <div class="section-title">Schedule of Premium (₹)</div>
                <table class="premium-table">
                    <thead><tr><th colspan="2">OWN DAMAGE PREMIUM [A]</th></tr></thead>
                    <tbody>
                        ${renderPremiumRow('Basic Own Damage Premium', policyData.premium.basicOD)}
                        ${renderPremiumRow('Less: NCB Discount (35%)', policyData.premium.ncbDiscount)}
                        ${renderPremiumRow('Less: Special Discount', policyData.premium.specialDiscount)}
                        <tr style="background-color: #f0f0f0;"><td style="font-weight: bold;">Net Own Damage Premium (A)</td><td class="right-align" style="font-weight: bold;">${policyData.premium.netOD_A}</td></tr>
                    </tbody>
                    <thead><tr><th colspan="2">THIRD PARTY / LIABILITY PREMIUM [B]</th></tr></thead>
                    <tbody>
                        ${renderPremiumRow('Basic TP Premium (As per Tariff)', policyData.premium.basicTP)}
                        ${renderPremiumRow('PA Cover for Owner-Driver (CSI ₹15 Lakhs)', policyData.premium.paOwnerDriver)}
                        ${renderPremiumRow('Legal Liability to Paid Driver (LL to Driver)', policyData.premium.llPaidDriver)}
                        ${renderPremiumRow('Legal Liability to Unnamed Passengers (5 Nos.)', policyData.premium.llUnnamedPassengers)}
                        <tr style="background-color: #f0f0f0;"><td style="font-weight: bold;">Total Liability Premium (B)</td><td class="right-align" style="font-weight: bold;">${policyData.premium.totalLiability_B}</td></tr>
                    </tbody>
                    <thead><tr><th colspan="2">FINAL PREMIUM CALCULATION</th></tr></thead>
                    <tbody>
                        ${renderPremiumRow('Gross Premium (A+B)', policyData.premium.grossPremium)}
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
                    <tr><td>Previous Policy No:</td><td>${policyData.other.previousPolicyNo}</td></tr>
                    <tr><td>NCB in Previous Policy:</td><td>${policyData.other.ncbPercent}%</td></tr>
                </table>

                <div style="margin-top: 30px; border-top: 1px solid #ccc; padding-top: 10px; text-align: center;">
                    <p style="font-size: 9pt; margin: 0;">For Shriram General Insurance Company Limited</p>
                    <p style="font-size: 9pt; margin: 0;">This is a computer-generated document and does not require a signature.</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

export default generateShriramGICVPolicyHTML;