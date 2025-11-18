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
const renderPremiumRows = (rows) => {
    return rows.map(row => `
        <tr>
            <td class="premium-label">${row.name}</td>
            <td class="premium-value">${formatCurrency(row.current)}</td>
            <td class="premium-value">${formatCurrency(row.new)}</td>
            <td class="premium-value">${formatCurrency(row.diff)}</td>
        </tr>
    `).join('');
};
const renderLiabilitySection = (section) => {
    let html = `
        <tr><td colspan="4" class="liability-title">${section.title}</td></tr>
        ${renderPremiumRows(section.rows)}
        <tr class="sub-total-row">
            <td class="premium-label">${section.subTotal.name}</td>
            <td class="premium-value">${formatCurrency(section.subTotal.current)}</td>
            <td class="premium-value">${formatCurrency(section.subTotal.new)}</td>
            <td class="premium-value">${formatCurrency(section.subTotal.diff)}</td>
        </tr>
    `;
    return html;
};
function generateEndorsementHTML(data) {
    const { policyInfo, insured, valueChanges, premiumChange, finalPremiumSummary } = data;
    const internalCSS = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap');
            body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; background-color: #f7f7f7; }
            .slip-container { width: 100%; max-width: 900px; margin: 20px auto; padding: 30px; box-sizing: border-box; background-color: #fff; border: 1px solid #ddd; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }

            /* ICICI Lombard Branding */
            .header-icici { display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 10px; margin-bottom: 20px; border-bottom: 4px solid #DF1E26; }
            .header-icici .logo-text { font-size: 20px; font-weight: 800; color: #DF1E26; }
            .header-icici .slogan { font-size: 12px; color: #666; margin-top: 5px; }
            .header-icici .date-stamp { font-size: 12px; color: #333; font-weight: 600; text-align: right; }

            .endorsement-header { background-color: #f0f0f0; padding: 10px 15px; font-size: 16px; font-weight: 700; color: #333; border-radius: 4px; margin-bottom: 15px; }
            
            /* General Detail Tables */
            .detail-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; table-layout: fixed; }
            .detail-table td { padding: 8px 12px; font-size: 13px; border: 1px solid #eee; }
            .detail-table .label { font-weight: 600; color: #555; background-color: #f9f9f9; width: 25%; }
            .detail-table .value { color: #1a1a1a; width: 25%; }

            /* Premium/Value Change Table */
            .premium-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            .premium-table th, .premium-table td { padding: 10px 12px; font-size: 13px; border: 1px solid #ddd; text-align: left; }
            .premium-table th { background-color: #DF1E26; color: #fff; font-weight: 700; text-align: center; }
            .premium-table th:first-child { text-align: left; width: 45%; }
            
            .premium-label { width: 45%; color: #333; }
            .premium-value { text-align: right; font-weight: 500; width: 15%; }

            .section-header { background-color: #f0f8ff; color: #00448A; font-weight: 700; font-size: 15px; }
            .liability-title { background-color: #e6e6e6; color: #1a1a1a; font-weight: 700; font-size: 14px; padding: 8px 12px; }
            
            .sub-total-row td { background-color: #fffaf0; font-weight: 700; color: #DF1E26; border-top: 2px solid #DF1E26; }
            .sub-total-row .premium-label { color: #DF1E26; }

            /* Final Summary */
            .final-summary-box { margin-top: 30px; border: 2px solid #00448A; border-radius: 8px; padding: 20px; background-color: #f0f8ff; }
            .final-summary-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 16px; }
            .final-summary-row .label { font-weight: 500; color: #333; }
            .final-summary-row .value { font-weight: 700; color: #DF1E26; }
            .grand-total-row { font-size: 24px; font-weight: 800; color: #00448A; margin-top: 10px; border-top: 2px solid #00448A; padding-top: 15px; text-align: center; }
        </style>
    `;
    const renderValueChanges = (items) => {
        return items.map(item => `
            <tr>
                <td class="premium-label">${item.name}</td>
                <td class="premium-value">${item.current}</td>
                <td class="premium-value">${item.new}</td>
                <td class="premium-value">${item.diff}</td>
            </tr>
        `).join('');
    };
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ICICI Lombard Endorsement Detail</title>
    ${internalCSS}
</head>
<body>
    <div class="slip-container">
        <div class="header-icici">
            <div>
                <div class="logo-text">ICICI Lombard</div>
                <div class="slogan">- GENERAL INSURANCE</div>
            </div>
            <div class="date-stamp">
                Policy Updated Date: ${policyInfo.endorsementUpdatedDate}
            </div>
        </div>
        
        <div class="endorsement-header">
            Endorsement Detail (Type: ${policyInfo.endorsementType})
        </div>

        <!-- Policy & Insured Details -->
        <table class="detail-table">
            <tr>
                <td class="label">Policy No:</td>
                <td class="value">${policyInfo.policyNo}</td>
                <td class="label">Endorsement No:</td>
                <td class="value">${policyInfo.endorsementNo}</td>
            </tr>
            <tr>
                <td class="label">Name:</td>
                <td class="value">${insured.name}</td>
                <td class="label">Model Variant:</td>
                <td class="value">${insured.modelVariant}</td>
            </tr>
            <tr>
                <td class="label">TP Policy Expiry:</td>
                <td class="value">${policyInfo.tpPolicyExpiryDate}</td>
                <td class="label">Status / Remarks:</td>
                <td class="value">${policyInfo.icStatus} (${policyInfo.remarks})</td>
            </tr>
        </table>

        <!-- Value Change Section (Accessories) -->
        <div class="section-header">${valueChanges.subHeading}</div>
        <table class="premium-table">
            <thead>
                <tr>
                    <th>Cover / Value</th>
                    <th>Current Details</th>
                    <th>New Details</th>
                    <th>Difference</th>
                </tr>
            </thead>
            <tbody>
                ${renderValueChanges(valueChanges.items)}
            </tbody>
        </table>

        <!-- Premium Change Section -->
        <div class="section-header">${premiumChange.od.subHeading}</div>
        <table class="premium-table">
            <thead>
                <tr>
                    <th>Premium Component</th>
                    <th>Current Amount (Rs.)</th>
                    <th>New Amount (Rs.)</th>
                    <th>Diff Amount (Rs.)</th>
                </tr>
            </thead>
            <tbody>
                ${renderPremiumRows(premiumChange.od.rows)}
                <tr class="sub-total-row">
                    <td class="premium-label">${premiumChange.od.subTotal.name}</td>
                    <td class="premium-value">${formatCurrency(premiumChange.od.subTotal.current)}</td>
                    <td class="premium-value">${formatCurrency(premiumChange.od.subTotal.new)}</td>
                    <td class="premium-value">${formatCurrency(premiumChange.od.subTotal.diff)}</td>
                </tr>
            </tbody>
        </table>

        <!-- Liability Premium Section -->
        <div class="section-header">${premiumChange.liability.subHeading}</div>
        <table class="premium-table">
            <thead>
                <tr>
                    <th>Premium Component</th>
                    <th>Current Amount (Rs.)</th>
                    <th>New Amount (Rs.)</th>
                    <th>Diff Amount (Rs.)</th>
                </tr>
            </thead>
            <tbody>
                ${renderLiabilitySection(premiumChange.liability.thirdParty)}
                ${renderLiabilitySection(premiumChange.liability.paCover)}
                ${renderLiabilitySection(premiumChange.liability.legalLiability)}
                <tr class="sub-total-row" style="background-color: #e6f7ff; color: #00448A;">
                    <td class="premium-label">${premiumChange.liability.grandTotalLiability.name}</td>
                    <td class="premium-value">${formatCurrency(premiumChange.liability.grandTotalLiability.current)}</td>
                    <td class="premium-value">${formatCurrency(premiumChange.liability.grandTotalLiability.new)}</td>
                    <td class="premium-value">${formatCurrency(premiumChange.liability.grandTotalLiability.diff)}</td>
                </tr>
            </tbody>
        </table>

        <!-- Final Premium Summary -->
        <div class="final-summary-box">
            <div class="section-header" style="background-color: #00448A; color: #fff; border-left: none; margin-bottom: 0;">Final Endorsement Premium Calculation</div>
            
            <div class="final-summary-row">
                <span class="label">${finalPremiumSummary.grossPremium.name}</span>
                <span class="value">${formatCurrency(finalPremiumSummary.grossPremium.diff)}</span>
            </div>
            
            <div class="final-summary-row">
                <span class="label">${finalPremiumSummary.gst.name}</span>
                <span class="value">${formatCurrency(finalPremiumSummary.gst.diff)}</span>
            </div>
            
            <div class="final-summary-row">
                <span class="label">${finalPremiumSummary.netPremiumPayable.name}</span>
                <span class="value">${formatCurrency(finalPremiumSummary.netPremiumPayable.diff)}</span>
            </div>
            
            <div class="grand-total-row">
                AMOUNT PAYABLE BY CUSTOMER: ${formatCurrency(finalPremiumSummary.amountPayableByCustomer)}
            </div>
        </div>
    </div>
</body>
</html>`;
}
export default generateEndorsementHTML;