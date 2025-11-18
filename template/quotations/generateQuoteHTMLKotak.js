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
const renderCovers = (covers) => {
    let html = '';
    for (const [name, amount] of Object.entries(covers)) {
        html += `
            <tr>
                <td class="cover-name">${name}</td>
                <td class="cover-premium">${formatCurrency(amount)}</td>
            </tr>
        `;
    }
    return html;
};

function generateZurichKotakQuoteHTML(data) {
    const { insurerName, quote, vehicle, customer, od, liability, addOns, discount, total } = data;
    const internalCSS = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
            body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; background-color: #f7f7f7; }
            .quote-container { width: 100%; max-width: 800px; margin: 20px auto; padding: 30px; box-sizing: border-box; background-color: #fff; border: 1px solid #ddd; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 5px solid #002D72; }
            
            .header-zurich { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #ccc; padding-bottom: 15px; margin-bottom: 20px; }
            .header-zurich h1 { color: #002D72; font-size: 24px; font-weight: 800; margin: 0; }
            .header-zurich p { color: #333; font-size: 14px; font-weight: 600; margin: 0; }
            
            .section-title { font-size: 18px; font-weight: 700; color: #002D72; margin-top: 20px; margin-bottom: 10px; padding: 5px 0; border-bottom: 1px solid #002D72; }
            
            .detail-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px 20px; margin-bottom: 20px; padding: 10px; background-color: #f8f8f8; border-radius: 4px; }
            .detail-item { font-size: 13px; line-height: 1.4; }
            .detail-label { font-weight: 500; color: #666; display: block; }
            .detail-value { font-weight: 600; color: #1a1a1a; display: block; }
            
            .premium-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .premium-table th, .premium-table td { padding: 8px 15px; text-align: left; font-size: 14px; border: 1px solid #eee; }
            .premium-table th { background-color: #e6f0f7; font-weight: 700; color: #002D72; text-transform: uppercase; }
            .premium-table .section-header { background-color: #002D72; color: #fff; text-align: center; }
            .cover-name { width: 70%; }
            .cover-premium { text-align: right; font-weight: 600; width: 30%; }

            .premium-summary { margin-top: 20px; border: 2px solid #002D72; border-radius: 6px; padding: 15px; background-color: #e6f7ff; }
            .premium-summary div { display: flex; justify-content: space-between; padding: 5px 0; font-size: 16px; }
            .premium-summary .label { font-weight: 500; color: #333; }
            .premium-summary .value { font-weight: 700; color: #002D72; }
            .premium-summary .total { font-size: 20px; font-weight: 800; background-color: #002D72; color: #fff; padding: 10px 15px; margin: 10px -15px -15px; border-bottom-left-radius: 4px; border-bottom-right-radius: 4px; }
            
            .disclaimer { margin-top: 30px; font-size: 12px; color: #777; padding: 10px; border-top: 1px dashed #ccc; }
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
        <div class="header-zurich">
            <div>
                <h1>ZURICH kotak</h1>
                <p>General Insurance</p>
            </div>
            <p>Quote Number: ${quote.quoteNumber}</p>
        </div>
        
        <div class="section-title">CUSTOMER & VEHICLE DETAILS</div>
        <div class="detail-grid">
            <div class="detail-item"><span class="detail-label">Customer Name:</span><span class="detail-value">${customer.customerName}</span></div>
            <div class="detail-item"><span class="detail-label">Contact Number:</span><span class="detail-value">${customer.contactNumber}</span></div>
            <div class="detail-item"><span class="detail-label">Quote Date:</span><span class="detail-value">${quote.quoteDate}</span></div>
            <div class="detail-item"><span class="detail-label">Policy Start Date:</span><span class="detail-value">${quote.policyStartDate}</span></div>
            <div class="detail-item"><span class="detail-label">Registration No / RTO Code:</span><span class="detail-value">${vehicle.registrationNoRTO}</span></div>
            <div class="detail-item"><span class="detail-label">Registration Date:</span><span class="detail-value">${vehicle.registrationDate}</span></div>
            <div class="detail-item"><span class="detail-label">Make, Model, Variant:</span><span class="detail-value">${vehicle.make} - ${vehicle.model} - ${vehicle.variant}</span></div>
            <div class="detail-item"><span class="detail-label">Fuel Type / CC / Seating:</span><span class="detail-value">${vehicle.fuelType} / ${vehicle.cubicCapacity} CC / ${vehicle.seatingCapacity} Seater</span></div>
        </div>

        <div class="section-title">COVERS & PREMIUM DETAILS</div>

        <!-- Own Damage Section -->
        <table class="premium-table">
            <thead>
                <tr class="section-header"><th colspan="2">OWN DAMAGE (1 Year)</th></tr>
                <tr><th>Covers</th><th class="cover-premium">Premium</th></tr>
            </thead>
            <tbody>
                ${renderCovers(od.covers)}
            </tbody>
        </table>

        <!-- Liability Section -->
        <table class="premium-table">
            <thead>
                <tr class="section-header"><th colspan="2">LIABILITY (3 Years)</th></tr>
                <tr><th>Covers</th><th class="cover-premium">Premium</th></tr>
            </thead>
            <tbody>
                ${renderCovers(liability.covers)}
                <tr class="premium-summary-row"><td class="cover-name" style="font-weight: 700;">Total (B) (Rs)</td><td class="cover-premium" style="font-weight: 800; background-color: #f0f0f0;">${formatCurrency(liability.totalLiability)}</td></tr>
            </tbody>
        </table>

        <!-- Add-Ons Section -->
        <table class="premium-table">
            <thead>
                <tr class="section-header"><th colspan="2">ADD-ONS</th></tr>
                <tr><th>Covers</th><th class="cover-premium">Premium</th></tr>
            </thead>
            <tbody>
                ${renderCovers(addOns)}
            </tbody>
        </table>
        
        <!-- Discount Section -->
        <table class="premium-table">
            <thead>
                <tr class="section-header"><th colspan="2">DISCOUNT</th></tr>
                <tr><th>Covers</th><th class="cover-premium">Premium</th></tr>
            </thead>
            <tbody>
                ${renderCovers(discount)}
                <tr class="premium-summary-row"><td class="cover-name" style="font-weight: 700;">Total (A) (Rs) - OD After Discount</td><td class="cover-premium" style="font-weight: 800; background-color: #f0f0f0;">${formatCurrency(discount.totalODAfterDiscount)}</td></tr>
            </tbody>
        </table>

        <!-- Total Premium Summary -->
        <div class="section-title">TOTAL PREMIUM</div>
        <div class="premium-summary">
            <div class="premium-summary-row">
                <span class="label">Final IDV (Rs)</span>
                <span class="value">${formatCurrency(total.finalIdv)}</span>
            </div>
            <div class="premium-summary-row">
                <span class="label">Net Premium (A) + (B) (Rs)</span>
                <span class="value">${formatCurrency(total.netPremium)}</span>
            </div>
            <div class="premium-summary-row">
                <span class="label">GST @ 18% (Rs)</span>
                <span class="value">${formatCurrency(total.gst)}</span>
            </div>
            <hr style="border-top: 1px dashed #ccc; margin: 10px 0;">
            <div class="total">
                <span>TOTAL FINAL PREMIUM (Rs)</span>
                <span>${formatCurrency(total.totalPremium)}</span>
            </div>
        </div>

        <div class="disclaimer">
            Disclaimer: This quote will be valid for 7 days from quote date. The company reserves the right to modify the rates, IDV, underwriting guidelines etc without prior intimation.
        </div>
    </div>
</body>
</html>`;
}

export default generateZurichKotakQuoteHTML;