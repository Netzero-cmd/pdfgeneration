function generateLibertyCommercialPolicyHTML(policyData) {
    // Helper function to render a table row for premium details
    const renderPremiumRow = (label, value, isTotal = false) => `
        <tr ${isTotal ? 'style="background-color: #ffeadc; font-weight: bold;"' : 'style="background-color: #f7f7f7;"'}>
            <td style="padding: 5px 8px; width: 70%; ${isTotal ? 'font-size: 11pt; color: #cc3300;' : ''}">${label}</td>
            <td style="padding: 5px 8px; width: 30%; text-align: right; color: #333; ${isTotal ? 'font-size: 11pt; color: #cc3300;' : ''}">₹ ${value}</td>
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
                .policy-box { max-width: 950px; margin: auto; padding: 20px; border: 3px solid #0056b3; background-color: #fcfcfc; }
                .header { text-align: center; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 3px solid #ff9900; }
                .header h1 { font-size: 16pt; margin: 0; color: #0056b3; }
                .header h2 { font-size: 12pt; margin: 5px 0 10px 0; font-weight: normal; color: #555; }
                .section-title { font-size: 12pt; font-weight: bold; margin-top: 20px; margin-bottom: 10px; padding: 5px 0; border-bottom: 1px solid #ff9900; color: #ff9900; }
                .detail-table, .vehicle-table, .premium-table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
                .detail-table td, .vehicle-table td { padding: 4px 0; vertical-align: top; border: none; }
                .detail-table td:first-child, .vehicle-table td:first-child { font-weight: bold; width: 30%; }
                .premium-table th, .premium-table td { border: 1px solid #ddd; padding: 6px 10px; text-align: left; }
                .premium-table th { background-color: #e6f7ff; font-weight: bold; }
                .idv-box { text-align: center; padding: 15px; background-color: #f0f0f0; border: 1px solid #ccc; margin-top: 10px;}
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
                    <tr><td>Contact Number:</td><td>${policyData.contactNo}</td></tr>
                    <tr><td>Customer GSTIN:</td><td>${policyData.insuredGSTIN}</td></tr>
                    <tr><td>Hypothecated with:</td><td>${policyData.other.financier}</td></tr>
                </table>

                <div class="section-title">Period of Insurance</div>
                <table class="detail-table" style="width: 50%;">
                    <tr><td>From:</td><td><span style="font-weight: bold;">${policyData.period.from}</span></td></tr>
                    <tr><td>To:</td><td><span style="font-weight: bold;">${policyData.period.to}</span></td></tr>
                    <tr><td>Geographical Area:</td><td>India</td></tr>
                </table>

                <div class="section-title">Insured Motor Vehicle Details</div>
                <table class="vehicle-table" style="width: 65%; float: left;">
                    <tr><td>Registration Number:</td><td>${policyData.vehicle.regNo}</td></tr>
                    <tr><td>RTO Location:</td><td>${policyData.vehicle.rtoLocation}</td></tr>
                    <tr><td>Make / Model:</td><td>${policyData.vehicle.makeModel}</td></tr>
                    <tr><td>Vehicle Sub Class:</td><td>${policyData.vehicle.subClass}</td></tr>
                    <tr><td>Year of Manufacture/Regn:</td><td>${policyData.vehicle.mfgYear} / ${policyData.vehicle.regDate}</td></tr>
                    <tr><td>Engine No. / Chassis No:</td><td>${policyData.vehicle.engineNo} / ${policyData.vehicle.chassisNo}</td></tr>
                    <tr><td>CC / Body Type:</td><td>${policyData.vehicle.cc} / ${policyData.vehicle.bodyType}</td></tr>
                    <tr><td>Carrying Capacity (Inc. Driver):</td><td>${policyData.vehicle.carryingCapacity}</td></tr>
                </table>
                <div class="idv-box" style="width: 30%; float: right;">
                    <span style="font-size: 10pt; font-weight: bold; color: #000;">TOTAL INSURED DECLARED VALUE (IDV) (₹)</span>
                    <p>₹ ${policyData.vehicle.idv}</p>
                    <p style="font-size: 10pt; color: #555;">PA Owner-Driver CSI: ₹ ${policyData.vehicle.paOwnerDriverCSI}</p>
                </div>
                <div style="clear: both;"></div>

                <div class="section-title">Premium Computation (₹)</div>
                <table class="premium-table">
                    <thead><tr><th colspan="2">SECTION I: OWN DAMAGE PREMIUM [A]</th></tr></thead>
                    <tbody>
                        ${renderPremiumRow('Own Damage Premium on Vehicle and accessories (Basic Cover)', policyData.premium.basicOD)}
                        ${renderPremiumRow('Cover for Lamps/Tyres/Tubes/Mudguards (IMT 23) (Extension)', policyData.premium.odExtension)}
                        ${renderPremiumRow(`No Claim Bonus Discount (${policyData.premium.ncbDiscount})`, "-" + policyData.premium.ncbDiscount)} ${renderPremiumRow('TOTAL OWN-DAMAGE PREMIUM (A)', policyData.premium.totalOD_A, true)}
                    </tbody>
                    <thead><tr><th colspan="2">SECTION I: ADD ON COVERS PREMIUM [C]</th></tr></thead>
                    <tbody>
                        ${policyData.addOns.map(a => renderPremiumRow(a.name, 'N/A (Included in Total C)')).join('')}
                        ${renderPremiumRow('TOTAL ADD-ON COVER PREMIUM (C)', policyData.premium.addOnCovers_C, true)}
                    </tbody>
                    <thead><tr><th colspan="2">SECTION II: LIABILITY PREMIUM [B]</th></tr></thead>
                    <tbody>
                        ${renderPremiumRow('Basic Third Party Premium', policyData.premium.basicTP)}
                        ${renderPremiumRow('Legal liability to Driver/Cleaner/Conductor (Extension)', policyData.premium.legalLiability)}
                        ${renderPremiumRow('TOTAL LIABILITY PREMIUM (B)', policyData.premium.totalLiability_B, true)}
                    </tbody>
                    <thead><tr><th colspan="2">FINAL PREMIUM CALCULATION</th></tr></thead>
                    <tbody>
                        ${renderPremiumRow('Net Premium (A+B+C) Taxable Value', policyData.premium.netPremium_TaxableValue)}
                        ${renderPremiumRow('IGST (JHARKHAND)', policyData.premium.igst_jharkhand)}
                        <tr style="background-color: #fff2c4; border-top: 2px solid #ff9900;">
                            <td style="padding: 8px; font-size: 12pt; font-weight: bold; color: #cc3300;">TOTAL POLICY PREMIUM</td>
                            <td style="padding: 8px; font-size: 12pt; font-weight: bold; color: #cc3300; text-align: right;">₹ ${policyData.premium.finalPremium}</td>
                        </tr>
                    </tbody>
                </table>
                
                <div class="section-title">Deductibles & Limits</div>
                <table class="detail-table" style="width: 45%; float: left;">
                    <tr><td>Compulsory Deductible:</td><td>₹ ${policyData.other.compulsoryDeductible}</td></tr>
                    <tr><td>Voluntary Deductible:</td><td>₹ ${policyData.other.voluntaryDeductible}</td></tr>
                </table>
                <table class="detail-table" style="width: 50%; float: right;">
                    <tr><td>Third Party Property Damage Limit:</td><td>₹ ${policyData.other.tpDmgLimit}</td></tr>
                    <tr><td>NCB in Expiring Policy:</td><td>${policyData.other.ncbInExpiringPolicy}%</td></tr>
                </table>
                <div style="clear: both;"></div>

                <div style="margin-top: 30px; border-top: 1px solid #ccc; padding-top: 10px; text-align: center;">
                    <p style="font-size: 9pt; margin: 0;">For Liberty General Insurance Limited</p>
                    <p style="font-size: 9pt; margin: 0;">In witness whereof this Policy has been signed at Mumbai on ${policyData.issueDate}</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

export default generateLibertyCommercialPolicyHTML;