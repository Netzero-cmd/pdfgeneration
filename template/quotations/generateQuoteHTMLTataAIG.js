const formatCurrency = (amount) => {
    const numericAmount = parseFloat(String(amount).replace(/[^0-9.-]+/g, ''));
    if (!isNaN(numericAmount)) {
        return `₹ ${numericAmount.toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    }
    return `₹ ${amount}`;
};
const renderPremiumRows = (items) => {
    let html = '';
    for (const [name, amount] of Object.entries(items)) {
        html += `
            <tr>
                <td class="premium-label">${name}</td>
                <td class="premium-value">${formatCurrency(amount)}</td>
            </tr>
        `;
    }
    return html;
};
function generateTataAIGQuoteHTML(data) {
    const { insurerName, quote, vehicle, premium, totals } = data;
    const internalCSS = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
            body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; background-color: #f7f7f7; }
            .quote-container { width: 100%; max-width: 850px; margin: 20px auto; padding: 30px; box-sizing: border-box; background-color: #fff; border: 1px solid #ccc; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border-top: 8px solid #00448A; }

            .header-aig { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid #ccc; padding-bottom: 10px; margin-bottom: 20px; }
            .header-aig .logo-text { color: #00448A; font-size: 24px; font-weight: 900; line-height: 1.1; margin: 0; }
            .header-aig .with-you { color: #555; font-size: 14px; font-weight: 500; margin-top: 5px; }
            .header-aig .quote-info { text-align: right; font-size: 14px; }
            .header-aig .quote-info span { display: block; font-weight: 600; color: #333; }

            .section-title { background-color: #e6f7ff; color: #00448A; padding: 10px 15px; font-size: 16px; font-weight: 700; margin-bottom: 15px; border-radius: 4px; border-left: 5px solid #00448A; }
            
            .detail-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; table-layout: fixed; }
            .detail-table td { padding: 8px 15px; font-size: 13px; border: 1px solid #eee; }
            .detail-table .label { font-weight: 600; color: #555; width: 30%; background-color: #f9f9f9; }
            .detail-table .value { color: #1a1a1a; width: 70%; }
            
            .premium-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .premium-table th, .premium-table td { padding: 10px 15px; font-size: 14px; border: 1px solid #eee; text-align: left; }
            .premium-table th { background-color: #00448A; color: #fff; font-weight: 700; }
            .premium-table .section-header { background-color: #e6f7ff; color: #00448A; font-weight: 700; text-align: left; }
            
            .premium-label { width: 75%; }
            .premium-value { text-align: right; font-weight: 600; width: 25%; }
            
            .sub-total-row td { background-color: #f0f8ff; font-weight: 700; color: #00448A; border-top: 2px solid #00448A; }

            .final-total-box { margin-top: 30px; border: 2px solid #00448A; border-radius: 8px; padding: 20px; background-color: #f0f8ff; }
            .final-total-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 18px; }
            .final-total-row .label { font-weight: 500; color: #333; }
            .final-total-row .value { font-weight: 700; color: #00448A; }
            .final-total-row.grand-total { font-size: 24px; font-weight: 800; color: #00448A; margin-top: 10px; border-top: 2px solid #00448A; padding-top: 15px; }
            
            .note { margin-top: 30px; font-size: 12px; color: #777; text-align: center; border-top: 1px dashed #ccc; padding-top: 15px; }
        </style>
    `;
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
        <div class="header-aig">
            <div>
                <div class="logo-text">TATA AIG INSURANCE</div>
                <div class="with-you">WITH YOU ALWAYS</div>
            </div>
            <div class="quote-info">
                Quotation No: <span>${quote.quoteNumber}</span>
                Date: <span>${quote.quoteDate}</span>
            </div>
        </div>
        
        <div class="section-title">Quotation Worksheet for Auto Secure - Commercial Vehicle Package Policy</div>

        <!-- Vehicle and Policy Details -->
        <table class="detail-table">
            <tr>
                <td class="label">Policy Plan:</td>
                <td class="value" colspan="3">${quote.policyPlan}</td>
            </tr>
            <tr>
                <td class="label">Policy Period:</td>
                <td class="value">${quote.policyStartDate} to ${quote.policyEndDate}</td>
                <td class="label">IDV (Insured Declared Value):</td>
                <td class="value">${formatCurrency(vehicle.idv)}</td>
            </tr>
            <tr>
                <td class="label">RTO Location:</td>
                <td class="value">${vehicle.rtoLocation}</td>
                <td class="label">Registration No:</td>
                <td class="value">${vehicle.registrationNumber}</td>
            </tr>
            <tr>
                <td class="label">Make, Model, Variant:</td>
                <td class="value" colspan="3">${vehicle.make}, ${vehicle.model}, ${vehicle.variant}</td>
            </tr>
            <tr>
                <td class="label">Manufacturing Year:</td>
                <td class="value">${vehicle.mfgYear}</td>
                <td class="label">GVW (Gross Vehicle Weight):</td>
                <td class="value">${vehicle.gvw}</td>
            </tr>
        </table>

        <!-- Premium Breakup Table -->
        <div class="section-title">Premium Calculation Work Sheet</div>
        
        <table class="premium-table">
            <thead>
                <tr>
                    <th colspan="2">Premium Component</th>
                </tr>
            </thead>
            <tbody>
                <!-- Section A: Own Damage (OD) -->
                <tr><td colspan="2" class="section-header">A. Own Damage Premium (OD)</td></tr>
                ${renderPremiumRows(premium.od.covers)}
                <tr class="sub-total-row">
                    <td class="premium-label">Total Own Damage Premium before NCB</td>
                    <td class="premium-value">${formatCurrency(premium.od.subTotalBeforeNCB)}</td>
                </tr>
                <tr>
                    <td class="premium-label">Deduct: No Claim Bonus (${premium.od.ncbPercent})</td>
                    <td class="premium-value">-${formatCurrency(premium.od.ncbDiscount)}</td>
                </tr>
                <tr class="sub-total-row">
                    <td class="premium-label">Net Own Damage Premium (A)</td>
                    <td class="premium-value">${formatCurrency(premium.od.netOdPremium)}</td>
                </tr>

                <!-- Section B: Basic Third Party (TP) Premium -->
                <tr><td colspan="2" class="section-header" style="margin-top: 10px;">B. Basic Third Party (TP) Premium</td></tr>
                ${renderPremiumRows(premium.tp.covers)}
                <tr class="sub-total-row">
                    <td class="premium-label">Net Third Party Premium (B)</td>
                    <td class="premium-value">${formatCurrency(premium.tp.netTpPremium)}</td>
                </tr>

                <!-- Section C: Add On Premium -->
                <tr><td colspan="2" class="section-header" style="margin-top: 10px;">C. Add On Covers Premium (Optional)</td></tr>
                ${renderPremiumRows(premium.addOns.covers)}
                <tr class="sub-total-row">
                    <td class="premium-label">Total Add On Premium (C)</td>
                    <td class="premium-value">${formatCurrency(premium.addOns.totalAddOnPremium)}</td>
                </tr>

                <!-- Section D: Other Liability Premium -->
                <tr><td colspan="2" class="section-header" style="margin-top: 10px;">D. Other Liability Premium</td></tr>
                ${renderPremiumRows(premium.otherLiability.covers)}
                <tr class="sub-total-row">
                    <td class="premium-label">Net Other Liability Premium (D)</td>
                    <td class="premium-value">${formatCurrency(premium.otherLiability.netOtherLiabilityPremium)}</td>
                </tr>
            </tbody>
        </table>

        <!-- Final Total Summary -->
        <div class="final-total-box">
            <div class="section-title" style="background-color: #00448A; color: #fff; border-left: none;">Premium Summary</div>
            
            <div class="final-total-row">
                <span class="label">Net Premium (A+B+C+D)</span>
                <span class="value">${formatCurrency(totals.netPremium)}</span>
            </div>
            
            <div class="final-total-row">
                <span class="label">Add: GST on OD Section (IGST@18%)</span>
                <span class="value">${formatCurrency(totals.gst.odGst)}</span>
            </div>
            
            <div class="final-total-row">
                <span class="label">Add: GST on Other Liability (IGST@18%)</span>
                <span class="value">${formatCurrency(totals.gst.otherLiabilityGst)}</span>
            </div>
            
            <div class="final-total-row">
                <span class="label">Total GST Amount</span>
                <span class="value">${formatCurrency(totals.gst.totalGst)}</span>
            </div>
            
            <div class="final-total-row grand-total">
                <span>TOTAL POLICY PREMIUM</span>
                <span>${formatCurrency(totals.totalPolicyPremium)}</span>
            </div>
        </div>

        <div class="note">
            This Quote will remain valid only for today (up to midnight 11:59:59 PM). Premium and Risk period may change at the time of issuance of Policy.
        </div>
    </div>
</body>
</html>`;
}
export default generateTataAIGQuoteHTML;