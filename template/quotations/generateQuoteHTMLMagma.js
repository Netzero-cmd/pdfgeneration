const formatCurrency = (amount) => {
    const numericAmount = parseFloat(String(amount).replace(/,/g, ''));
    if (!isNaN(numericAmount)) {
        return `₹ ${numericAmount.toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    }
    return `₹ ${amount}`;
};
function generateMagmaQuoteHTML(data) {
    const { insurerName, quote, vehicle, idv, premium } = data;
    const internalCSS = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
            body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; background-color: #f7f7f7; }
            .quote-container { width: 100%; max-width: 900px; margin: 20px auto; padding: 30px; box-sizing: border-box; background-color: #fff; border: 1px solid #ddd; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .header-magma { border-bottom: 3px solid #cc0000; padding-bottom: 10px; margin-bottom: 20px; }
            .header-magma h1 { color: #cc0000; font-size: 28px; font-weight: 800; margin: 0; }
            .header-magma p { font-size: 14px; color: #666; margin: 5px 0 0 0; }
            .quotation-title { background-color: #cc0000; color: #fff; padding: 10px 15px; font-size: 20px; font-weight: 700; text-align: center; margin-bottom: 20px; border-radius: 4px; }

            .detail-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px 20px; margin-bottom: 20px; border: 1px solid #eee; padding: 15px; border-radius: 4px; }
            .detail-item { font-size: 14px; line-height: 1.4; }
            .detail-label { font-weight: 600; color: #333; display: block; margin-bottom: 2px; }
            .detail-value { color: #1a1a1a; display: block; }
            
            .table-section { margin-top: 30px; }
            .table-title { font-size: 16px; font-weight: 700; color: #cc0000; border-bottom: 1px solid #cc0000; padding-bottom: 5px; margin-bottom: 10px; }
            
            .premium-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .premium-table th, .premium-table td { border: 1px solid #ccc; padding: 10px; text-align: left; font-size: 14px; }
            .premium-table th { background-color: #f0f0f0; font-weight: 700; color: #333; text-transform: uppercase; }
            .premium-table td:last-child { text-align: right; font-weight: 600; width: 150px; }
            .premium-table .section-header th { background-color: #e0e0e0; color: #cc0000; font-size: 15px; }

            .total-row td { background-color: #fff7e6; font-weight: 700 !important; border-top: 2px solid #ff9900; }
            .final-total-row td { background-color: #cc0000; color: #fff; font-size: 18px; font-weight: 800 !important; }

            .note { margin-top: 30px; font-size: 12px; color: #777; padding: 10px; border-left: 3px solid #cc0000; background-color: #ffeeee; }
            .text-center { text-align: center; }
        </style>
    `;

    // --- HTML String Generation using Template Literals ---
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>${insurerName} Policy Quote</title>
    ${internalCSS}
</head>
<body>
    <div class="quote-container">
        <div class="header-magma">
            <h1>MAGMA General Insurance Limited</h1>
            <p>DEVELOPMENT HOUSE, 24 PARK STREET, KOLKATA-700016 | Website: www.magmainsurance.com</p>
        </div>
        
        <div class="quotation-title">Premium Calculation Work Sheet For Commercial Vehicle Package Policy (QUOTATION)</div>

        <div class="detail-grid">
            <div class="detail-item"><span class="detail-label">Quote Number:</span><span class="detail-value">${quote.quoteNumber}</span></div>
            <div class="detail-item"><span class="detail-label">Quotation Date:</span><span class="detail-value">${quote.quotationDate}</span></div>
            <div class="detail-item"><span class="detail-label">Department:</span><span class="detail-value">${quote.department}</span></div>
            
            <div class="detail-item"><span class="detail-label">Vehicle Type:</span><span class="detail-value">${vehicle.vehicleType}</span></div>
            <div class="detail-item"><span class="detail-label">Policy Period:</span><span class="detail-value">${quote.policyPeriodFrom} - ${quote.policyPeriodTo}</span></div>
            <div class="detail-item"><span class="detail-label">Date of Registration:</span><span class="detail-value">${quote.dateOfRegistration}</span></div>

            <div class="detail-item"><span class="detail-label">Make:</span><span class="detail-value">${vehicle.make}</span></div>
            <div class="detail-item"><span class="detail-label">Model:</span><span class="detail-value">${vehicle.model}</span></div>
            <div class="detail-item"><span class="detail-label">Vehicle Zone:</span><span class="detail-value">${vehicle.vehicleZone} (${vehicle.location})</span></div>

            <div class="detail-item"><span class="detail-label">CC/HP/GVW:</span><span class="detail-value">${vehicle.ccHpgvw}</span></div>
            <div class="detail-item"><span class="detail-label">Seating Capacity:</span><span class="detail-value">${vehicle.seatingCapacity}</span></div>
            <div class="detail-item"><span class="detail-label">Agent Name:</span><span class="detail-value">${quote.agentName}</span></div>
        </div>

        <div class="table-section">
            <div class="table-title">Insured Declared Value (IDV) Details</div>
            <table class="premium-table">
                <thead>
                    <tr>
                        <th>Vehicle IDV</th>
                        <th>Trailer IDV</th>
                        <th>Side Car IDV</th>
                        <th>Mount. Machineries</th>
                        <th>Non-Elec. Accessories</th>
                        <th>Elec. Accessories</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${formatCurrency(idv.vehicleIdv)}</td>
                        <td>${formatCurrency(idv.trailerIdv)}</td>
                        <td>${formatCurrency(idv.sideCarIdv)}</td>
                        <td>${formatCurrency(idv.mountMachineries)}</td>
                        <td>${formatCurrency(idv.nonElecAccessories)}</td>
                        <td>${formatCurrency(idv.elecAccessories)}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="table-section">
            <div class="table-title">Premium Computation (₹)</div>
            <table class="premium-table">
                <thead>
                    <tr class="section-header"><th colspan="2">OWN DAMAGE (A)</th><th colspan="2">LIABILITY (B)</th></tr>
                </thead>
                <tbody>
                    <!-- OD PREMIUM DETAILS -->
                    <tr>
                        <td>Basic OD</td>
                        <td>${formatCurrency(premium.basicOd)}</td>
                        <td>Basic - TP</td>
                        <td>${formatCurrency(premium.basicTp)}</td>
                    </tr>
                    <tr>
                        <td>Loss/damage to lamps/tyres/mud guards etc. IMT-23</td>
                        <td>${formatCurrency(premium.imt23)}</td>
                        <td>Under WC act - Driver/cleaner/employees - IMT 28</td>
                        <td>${formatCurrency(premium.imt28)}</td>
                    </tr>
                    <tr>
                        <td>Zero Depreciation</td>
                        <td>${formatCurrency(premium.zeroDepreciation)}</td>
                        <td class="total-row">Sub Total (B)</td>
                        <td class="total-row">${formatCurrency(premium.subTotalLiability)}</td>
                    </tr>
                    <tr>
                        <td class="total-row">Sub Total (Before Deduction)</td>
                        <td class="total-row">${formatCurrency(premium.subTotalBeforeDeductions)}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    
                    <!-- DEDUCTIONS -->
                    <tr class="section-header"><th colspan="2">Less: Deductions (-)</th><th colspan="2"></th></tr>
                    <tr>
                        <td>No claim bonus ${premium.ncbPercent}</td>
                        <td>${formatCurrency(premium.ncbDiscount)}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Detariff Discount for IMT-23 (${premium.imt23DiscountPercent})</td>
                        <td>${formatCurrency(premium.imt23Discount)}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Detariff Discount On Basic OD (${premium.basicOdDiscountPercent})</td>
                        <td>${formatCurrency(premium.basicOdDiscount)}</td>
                        <td></td>
                        <td></td>
                    </tr>

                    <!-- TOTALS -->
                    <tr class="total-row">
                        <td>Sub-Total Deductions</td>
                        <td>${formatCurrency(premium.totalDeductions)}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr class="section-header"><th colspan="4">SUMMARY</th></tr>
                    <tr>
                        <td>Total Own Damage Premium (A)</td>
                        <td>${formatCurrency(premium.totalOdPremium)}</td>
                        <td>Total Liability Premium (B)</td>
                        <td>${formatCurrency(premium.subTotalLiability)}</td>
                    </tr>

                    <tr>
                        <td class="final-total-row">Total Package Premium (A+B)</td>
                        <td class="final-total-row">${formatCurrency(premium.totalPackagePremium)}</td>
                        <td class="final-total-row"></td>
                        <td class="final-total-row"></td>
                    </tr>
                    <tr>
                        <td colspan="3">Service Tax (Including education cess & higher education cess)</td>
                        <td>${formatCurrency(premium.serviceTax)}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr class="final-total-row">
                        <td class="text-center" colspan="3">TOTAL FINAL PREMIUM</td>
                        <td>${formatCurrency(premium.totalFinalPremium)}</td>
                    </tr>
                </tfoot>
            </table>
        </div>

        <div class="note text-center">
            This QUOTE is valid for next 7 days from the date of Quotation.
        </div>
    </div>
</body>
</html>`;
}
export default generateMagmaQuoteHTML;
