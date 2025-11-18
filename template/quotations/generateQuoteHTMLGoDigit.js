const formatCurrency = (amount) => {
    if (typeof amount === 'number') {
        amount = amount.toFixed(2);
    }
    return `₹ ${amount}`;
};
function generateQuoteHTMLGoDigit(data) {
    const { insurerName, customerName, quoteNumber, uin, quoteIssueDate, vehicle, policy, idv, premium } = data;
    const internalCSS = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
            body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; }
            .quote-container { width: 100%; max-width: 800px; margin: 0 auto; padding: 30px; box-sizing: border-box; }
            .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #000000; padding-bottom: 15px; margin-bottom: 20px; }
            .header h1 { color: #1a1a1a; font-size: 24px; font-weight: 700; margin: 0; }
            .header-logo { font-size: 28px; font-weight: 900; color: #000000; text-transform: uppercase; letter-spacing: -1px; }
            .section-title { background-color: #f0f0f0; color: #1a1a1a; padding: 8px 15px; font-size: 16px; font-weight: 600; border-radius: 4px; margin: 20px 0 10px 0; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px 30px; margin-bottom: 20px; }
            .info-item { display: flex; flex-direction: column; }
            .info-label { font-size: 12px; color: #666666; margin-bottom: 2px; }
            .info-value { font-size: 14px; color: #1a1a1a; font-weight: 500; border-bottom: 1px dotted #ccc; padding-bottom: 2px; }
            .premium-box { border: 2px solid #ccc; border-radius: 8px; padding: 15px; margin-top: 20px; }
            .premium-row { display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px dashed #eee; }
            .premium-row:last-child { border-bottom: none; }
            .premium-label { font-size: 14px; color: #333; }
            .premium-value { font-size: 14px; font-weight: 600; color: #1a1a1a; }
            .total-premium { background-color: #e6f7ff; border-top: 2px solid #005f73; padding: 10px; display: flex; justify-content: space-between; font-size: 18px; font-weight: 700; margin-top: 15px; border-radius: 4px; }
            .note { margin-top: 20px; font-size: 12px; color: #777; padding: 10px; border-left: 3px solid #f90; background-color: #fffbe6; }
            .text-right { text-align: right; }
            .font-bold { font-weight: 700; }
            .text-sm { font-size: 14px; }
            @media print { .quote-container { margin: 0; box-shadow: none; border-radius: 0; } }
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
        <div class="header">
            <div class="header-logo">digit INSURANCE</div>
            <div>
                <h1>Digit Private Car Policy Quote</h1>
                <div class="text-right text-sm">UIN: ${uin}</div>
            </div>
        </div>

        <div style="font-size: 18px; font-weight: 600; margin-bottom: 20px;">
            HI ${customerName}!
        </div>

        <div class="section-title">The car you want to protect.</div>
        <div class="info-grid">
            <div class="info-item"><div class="info-label">Quote Number:</div><div class="info-value">${quoteNumber}</div></div>
            <div class="info-item"><div class="info-label">Quote Issue Date:</div><div class="info-value">${quoteIssueDate}</div></div>

            <div class="info-item"><div class="info-label">Registration No.</div><div class="info-value">${vehicle.regNo}</div></div>
            <div class="info-item"><div class="info-label">RTO Location</div><div class="info-value">${vehicle.rtoLocation}</div></div>

            <div class="info-item"><div class="info-label">Make</div><div class="info-value">${vehicle.make}</div></div>
            <div class="info-item"><div class="info-label">Model / Variant</div><div class="info-value">${vehicle.model}</div></div>

            <div class="info-item"><div class="info-label">Fuel Type</div><div class="info-value">${vehicle.fuelType}</div></div>
            <div class="info-item"><div class="info-label">Seating Capacity</div><div class="info-value">${vehicle.seatingCapacity}</div></div>

            <div class="info-item"><div class="info-label">Engine No.</div><div class="info-value">${vehicle.engineNo}</div></div>
            <div class="info-item"><div class="info-label">Chassis No.</div><div class="info-value">${vehicle.chassisNo}</div></div>
        </div>

        <div class="section-title">This is the plan you were interested in.</div>
        <div class="info-grid">
            <div class="info-item"><div class="info-label">Coverages Opted</div><div class="info-value">${policy.coveragesOpted}</div></div>
            <div class="info-item"><div class="info-label">NCB % (Current Policy)</div><div class="info-value">${policy.ncbPercent}</div></div>
            
            <div class="info-item"><div class="info-label">Period for Own Damage Cover</div><div class="info-value">From: ${policy.odFrom} To: ${policy.odTo}</div></div>
            <div class="info-item"><div class="info-label">Period for Third Party Liability</div><div class="info-value">From: ${policy.tpFrom} To: ${policy.tpTo}</div></div>

            <div class="info-item"><div class="info-label">Compulsory Deductible</div><div class="info-value">${formatCurrency(policy.compulsoryDeductible)}</div></div>
            <div class="info-item"><div class="info-label">Voluntary Deductible</div><div class="info-value">${formatCurrency(policy.voluntaryDeductible)}</div></div>

            <div class="info-item"><div class="info-label">PA Owner Driver Cover Amount</div><div class="info-value">${formatCurrency(policy.paOwnerDriverCover)}</div></div>
            <div class="info-item"><div class="info-label">Period for PA Owner Driver</div><div class="info-value">From: ${policy.paOwnerDriverFrom} To: ${policy.paOwnerDriverTo}</div></div>
        </div>

        <div class="section-title">Your Vehicle IDV (Insured Declared Value)</div>
        <div class="info-grid">
            <div class="info-item"><div class="info-label">Vehicle IDV (${idv.year})</div><div class="info-value">${formatCurrency(idv.vehicleIdv)}</div></div>
            <div class="info-item"><div class="info-label">Total IDV</div><div class="info-value">${formatCurrency(idv.totalIdv)}</div></div>
        </div>

        <div class="section-title">All about your money.</div>
        <div class="premium-box">
            <div class="info-grid" style="gap: 15px 50px;">
                <!-- OWN DAMAGE PREMIUM [A] -->
                <div>
                    <div class="premium-row flex font-bold"><div class="premium-label">Own Damage Premium [A]</div><div class="premium-value"></div></div>
                    <div class="premium-row"><div class="premium-label">Total Basic Own Damage Premium</div><div class="premium-value">${formatCurrency(premium.basicOdPremium)}</div></div>
                    <div class="premium-row"><div class="premium-label">NCB Discount Amount</div><div class="premium-value">${formatCurrency(premium.ncbDiscount)}</div></div>
                    <div class="premium-row"><div class="premium-label">Others (e.g., Loadings/Discounts)</div><div class="premium-value">${formatCurrency(premium.othersOdPremium)}</div></div>
                    <div class="premium-row flex font-bold" style="border-top: 1px solid #ccc; margin-top: 5px;"><div class="premium-label">TOTAL OD PREMIUM (₹)</div><div class="premium-value">${formatCurrency(premium.totalOdPremium)}</div></div>
                </div>

                <!-- LIABILITY PREMIUM [B] -->
                <div>
                    <div class="premium-row flex font-bold"><div class="premium-label">Liability Premium [B]</div><div class="premium-value"></div></div>
                    <div class="premium-row"><div class="premium-label">Basic Third-Party Liability</div><div class="premium-value">${formatCurrency(premium.basicTpLiability)}</div></div>
                    <div class="premium-row"><div class="premium-label">PA cover for Owner-Driver</div><div class="premium-value">${formatCurrency(premium.paOwnerDriverPremium)}</div></div>
                    <div class="premium-row flex font-bold" style="border-top: 1px solid #ccc; margin-top: 5px;"><div class="premium-label">TOTAL ACT PREMIUM (₹)</div><div class="premium-value">${formatCurrency(premium.totalActPremium)}</div></div>
                </div>
            </div>

            <!-- NET and FINAL PREMIUM -->
            <div style="margin-top: 25px;">
                <div class="premium-row flex font-bold" style="border-bottom: 2px solid #ccc;"><div class="premium-label">NET PREMIUM (₹)</div><div class="premium-value">${formatCurrency(premium.netPremium)}</div></div>
                <div class="premium-row"><div class="premium-label">IGST @ ${premium.igstPercent}%</div><div class="premium-value">${formatCurrency(premium.igstAmount)}</div></div>
            </div>

            <div class="total-premium">
                <div class="premium-label">FINAL PREMIUM (₹)</div>
                <div class="premium-value">${formatCurrency(premium.finalPremium)}</div>
            </div>
        </div>

        <div class="note">
            <strong>Note:</strong> Premium and coverages will change if Quote is issued post 29-Oct-2025. Please read policy terms and conditions carefully before concluding sale. All charges/taxes, as applicable, will be borne by the Policyholder.
        </div>
    </div>
</body>
</html>`;
}
export default generateQuoteHTMLGoDigit;