const formatCurrency = (amount) => {
    const numericAmount = parseFloat(String(amount).replace(/[^0-9.-]+/g, ''));
    if (!isNaN(numericAmount)) {
        return `Rs ${numericAmount.toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    }
    return `Rs ${amount}`;
};
function generateUniversalSompoQuoteHTML(data) {
    const { insurerName, quote, vehicle, premium, addOns } = data;
    const internalCSS = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
            body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; background-color: #ffffff; }
            .quote-container { width: 100%; max-width: 850px; margin: 20px auto; padding: 30px; box-sizing: border-box; border: 1px solid #e0e0e0; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
            
            .header-sompo { border-bottom: 4px solid #005691; padding-bottom: 15px; margin-bottom: 20px; text-align: center; }
            .header-sompo h1 { color: #005691; font-size: 26px; font-weight: 800; margin: 0; }
            .header-sompo p { font-size: 14px; color: #666; margin: 5px 0 0 0; }
            .quotation-title { background-color: #f0f0f0; color: #333; padding: 10px 15px; font-size: 16px; font-weight: 600; text-align: center; margin-bottom: 20px; border-radius: 4px; border: 1px solid #ccc; }

            .info-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
            .info-table td { padding: 8px 15px; font-size: 14px; border: 1px solid #ddd; }
            .info-table .label { font-weight: 600; color: #1a1a1a; width: 25%; background-color: #f9f9f9; }
            .info-table .value { color: #333; width: 25%; }

            .premium-breakup-title { font-size: 18px; font-weight: 700; color: #005691; margin-bottom: 15px; border-left: 5px solid #005691; padding-left: 10px; }
            
            .premium-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .premium-table th, .premium-table td { padding: 10px 15px; font-size: 14px; border: 1px solid #ddd; }
            .premium-table th { background-color: #e6f0f7; font-weight: 700; color: #005691; text-align: center; }
            .premium-table td { vertical-align: top; }
            .premium-table .section-header { background-color: #d1e5f0; color: #005691; font-weight: 700; text-align: center; }

            .premium-row-title { font-weight: 600; color: #1a1a1a; }
            .premium-row-amount { text-align: right; font-weight: 600; width: 120px; }
            .premium-row-subtotal { background-color: #f7f7f7; font-weight: 700; color: #005691; }
            
            .final-total-box { margin-top: 20px; border: 2px solid #005691; border-radius: 6px; padding: 15px; background-color: #e6f7ff; }
            .final-total-row { display: flex; justify-content: space-between; font-size: 18px; font-weight: 700; color: #005691; }
            .note { margin-top: 30px; font-size: 12px; color: #777; padding: 10px; border: 1px dashed #999; background-color: #fff; text-align: center; }
        </style>
    `;
    const renderPremiumDetails = (premiumItems, isLiability = false) => {
        let html = '';
        for (const [key, value] of Object.entries(premiumItems)) {
            if (key.includes('Total') || key.includes('BasicOD') || key.includes('BasicTP')) continue;
            html += `
                <tr>
                    <td class="premium-row-title">${key}</td>
                    <td class="premium-row-amount">${formatCurrency(value)}</td>
                </tr>
            `;
        }
        return html;
    };
    const renderAddOns = (addOns) => {
        let html = '';
        if (Object.keys(addOns).length === 0) {
            return `<tr><td class="premium-row-title">No Add-on Covers Opted</td><td class="premium-row-amount">${formatCurrency("0")}</td></tr>`;
        }
        for (const [key, value] of Object.entries(addOns)) {
            html += `
                <tr>
                    <td class="premium-row-title">${key}</td>
                    <td class="premium-row-amount">${formatCurrency(value)}</td>
                </tr>
            `;
        }
        return html;
    };
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
        <div class="header-sompo">
            <h1>Universal Sompo General Insurance</h1>
            <p>Suraksha, Hamesha Aapke Saath</p>
        </div>
        
        <div class="quotation-title">MOTOR GOODS CARRYING VEHICLE - CUM TAX INVOICE Quotation</div>

        <!-- Quote and Vehicle Details Grid -->
        <table class="info-table">
            <tr>
                <td class="label">Quote No:</td>
                <td class="value">${quote.quoteNo}</td>
                <td class="label">Registration No:</td>
                <td class="value">${vehicle.registrationNo}</td>
            </tr>
            <tr>
                <td class="label">Model:</td>
                <td class="value" colspan="3">${vehicle.model}</td>
            </tr>
            <tr>
                <td class="label">Total IDV:</td>
                <td class="value">${formatCurrency(quote.totalIdv)}</td>
                <td class="label">Mobile:</td>
                <td class="value">${quote.mobile}</td>
            </tr>
            <tr>
                <td class="label">Proposed Policy Start Date:</td>
                <td class="value">${quote.proposedPolicyStartDate}</td>
                <td class="label">Manufacturing Year:</td>
                <td class="value">${vehicle.manufacturingYear}</td>
            </tr>
            <tr>
                <td class="label">GVW:</td>
                <td class="value">${vehicle.gvw}</td>
                <td class="label">Quote Date and Time:</td>
                <td class="value">${quote.quoteDateTime}</td>
            </tr>
            <tr>
                <td class="label">Email:</td>
                <td class="value" colspan="3">${quote.email}</td>
            </tr>
        </table>

        <!-- Premium Breakup Table -->
        <div class="premium-breakup-title">Insurance Premium Break-Up</div>
        
        <table class="premium-table">
            <thead>
                <tr>
                    <th colspan="2">A. Own Damage</th>
                    <th colspan="2">B. Liability</th>
                </tr>
            </thead>
            <tbody>
                <!-- Basic Premiums -->
                <tr>
                    <td class="premium-row-title">Basic OD Premium</td>
                    <td class="premium-row-amount">${formatCurrency(premium.basicOdPremium)}</td>
                    <td class="premium-row-title">Basic - TP</td>
                    <td class="premium-row-amount">${formatCurrency(premium.basicTp)}</td>
                </tr>
                <tr>
                    <td class="premium-row-title">IMT 23</td>
                    <td class="premium-row-amount">${formatCurrency(premium.imt23)}</td>
                    <td class="premium-row-title">Paid Driver</td>
                    <td class="premium-row-amount">${formatCurrency(premium.paidDriver)}</td>
                </tr>
                <tr>
                    <td class="premium-row-title">Basic OD2 (Including other loadings/fees)</td>
                    <td class="premium-row-amount">${formatCurrency(premium.basicOd2)}</td>
                    <td class="premium-row-title">Cleaner Conductor Coolies</td>
                    <td class="premium-row-amount">${formatCurrency(premium.cleanerConductorCoolies)}</td>
                </tr>
                <tr class="premium-row-subtotal">
                    <td class="premium-row-title">Sub Total (A) Before Add-ons/Discounts</td>
                    <td class="premium-row-amount">${formatCurrency(premium.subTotalABeforeAddons)}</td>
                    <td class="premium-row-title">Basic TP2</td>
                    <td class="premium-row-amount">${formatCurrency(premium.basicTp2)}</td>
                </tr>
                
                <!-- Add-On Covers -->
                <tr>
                    <th colspan="2" style="background-color: #f0f0f0; color: #333;">Add on Covers</th>
                    <th colspan="2" style="background-color: #f0f0f0; color: #333;">Liability Extras</th>
                </tr>
                ${renderAddOns(addOns)}
                
                <!-- Discounts and Final OD/Liability Totals -->
                <tr>
                    <td class="premium-row-title">Basic OD3 (After Add-ons)</td>
                    <td class="premium-row-amount">${formatCurrency(premium.basicOd3)}</td>
                    <td class="premium-row-title">Total Liability Premium</td>
                    <td class="premium-row-amount">${formatCurrency(premium.totalLiabilityPremium)}</td>
                </tr>
                <tr>
                    <td class="premium-row-title">Deduct ${premium.ncbPercent} for NCB</td>
                    <td class="premium-row-amount">-${formatCurrency(premium.ncbDiscount)}</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr class="premium-row-subtotal">
                    <td class="premium-row-title">Total Own Damage Premium</td>
                    <td class="premium-row-amount">${formatCurrency(premium.totalOwnDamagePremium)}</td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>

        <!-- Final Premium Summary -->
        <div class="final-total-box">
            <div class="final-total-row">
                <span>Package Premium (OD + Liability)</span>
                <span>${formatCurrency(premium.packagePremium)}</span>
            </div>
            <div class="final-total-row" style="font-size: 16px; margin-top: 10px; font-weight: 500;">
                <span>GST</span>
                <span>${formatCurrency(premium.gst)}</span>
            </div>
            <hr style="border: 1px solid #005691; margin: 10px 0;">
            <div class="final-total-row">
                <span>TOTAL FINAL PREMIUM</span>
                <span>${formatCurrency(premium.finalPremium)}</span>
            </div>
        </div>

        <div class="note">
            Disclaimer: This is NOT a cover note/policy document. The quote is valid only for a period of 7 days.
        </div>
    </div>
</body>
</html>`;
}
export default generateUniversalSompoQuoteHTML;