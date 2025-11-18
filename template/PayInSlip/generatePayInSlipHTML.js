function generatePayInSlipHTML(data) {
    const {
        insurer,
        dealer,
        payInSlipDetails,
        transaction,
        totals
    } = data;

    const internalCSS = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
            body { 
                font-family: 'Inter', sans-serif; 
                margin: 0; 
                padding: 0; 
                background-color: #ffffff; 
            }

            .slip-container { 
                width: 100%; 
                max-width: 750px; 
                margin: 20px auto; 
                padding: 30px; 
                box-sizing: border-box; 
                border: 1px solid #ccc; 
                box-shadow: 0 4px 10px rgba(0,0,0,0.05); 
            }

            .header-icici { 
                border-bottom: 4px solid #DF1E26; 
                padding-bottom: 15px; 
                margin-bottom: 20px; 
                text-align: center; 
            }

            .header-icici h1 { 
                color: #000; 
                font-size: 24px; 
                font-weight: 800; 
                margin: 0; 
            }

            .header-icici p { 
                font-size: 14px; 
                color: #555; 
                margin: 5px 0 0 0; 
            }

            .slip-title { 
                background-color: #DF1E26; 
                color: #fff; 
                padding: 10px 15px; 
                font-size: 18px; 
                font-weight: 600; 
                text-align: center; 
                margin-bottom: 20px; 
                border-radius: 4px; 
            }

            .info-grid { 
                display: grid; 
                grid-template-columns: repeat(2, 1fr); 
                gap: 10px 20px; 
                margin-bottom: 20px; 
            }

            .info-item { 
                display: flex; 
                justify-content: space-between; 
                padding: 5px 0; 
                border-bottom: 1px dashed #eee; 
                font-size: 14px; 
            }

            .info-label { 
                font-weight: 500; 
                color: #666; 
            }

            .info-value { 
                font-weight: 600; 
                color: #1a1a1a; 
                text-align: right; 
            }

            .section-header { 
                font-size: 16px; 
                font-weight: 700; 
                color: #333; 
                margin: 20px 0 10px 0; 
                padding-bottom: 5px; 
                border-bottom: 2px solid #ddd; 
            }

            /* ✅ Horizontal scroll for wide tables */
            .table-wrapper { 
                width: 100%; 
                overflow-x: auto; 
            }

            .transaction-table { 
                width: 100%; 
                border-collapse: collapse; 
                margin-bottom: 20px; 
            }

            .transaction-table th, 
            .transaction-table td { 
                padding: 10px 12px; 
                font-size: 13px; 
                border: 1px solid #ddd; 
                text-align: left;

                /* ✅ Prevent overflow */
                word-wrap: break-word;
                white-space: normal;
                max-width: 120px;
            }

            .transaction-table th { 
                background-color: #f0f0f0; 
                font-weight: 700; 
                color: #333; 
                text-transform: uppercase; 
            }

            .transaction-table .total-row td { 
                background-color: #ffe0e0; 
                font-weight: 700; 
                color: #DF1E26; 
                font-size: 16px; 
                border-top: 3px solid #DF1E26; 
            }

            .note { 
                margin-top: 20px; 
                font-size: 12px; 
                color: #777; 
                padding: 10px; 
                border: 1px solid #ddd; 
                background-color: #f9f9f9; 
                text-align: center; 
            }
        </style>
    `;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ICICI Lombard Pay-In Slip</title>
    ${internalCSS}
</head>
<body>
    <div class="slip-container">
        <div class="header-icici">
            <h1>${insurer.name}</h1>
            <p>IRDA Regn No: ${insurer.irdaRegnNo}</p>
        </div>

        <div class="slip-title">DEALER PAY-IN SLIP</div>

        <div class="section-header">Dealer & Banking Details</div>
        <div class="info-grid">
            <div class="info-item"><span class="info-label">Pay In Slip No:</span><span class="info-value">${payInSlipDetails.slipNo}</span></div>
            <div class="info-item"><span class="info-label">Pay In Slip Date:</span><span class="info-value">${payInSlipDetails.slipDate}</span></div>

            <div class="info-item"><span class="info-label">Dealer Name:</span><span class="info-value">${dealer.name}</span></div>
            <div class="info-item"><span class="info-label">Dealer Code:</span><span class="info-value">${dealer.code}</span></div>

            <div class="info-item"><span class="info-label">Dealer City/District:</span><span class="info-value">${dealer.cityDistrict}</span></div>
            <div class="info-item"><span class="info-label">Client Code:</span><span class="info-value">${insurer.clientCode}</span></div>

            <div class="info-item"><span class="info-label">Payment Mode:</span><span class="info-value">${payInSlipDetails.paymentMode}</span></div>
            <div class="info-item"><span class="info-label">House Bank Name:</span><span class="info-value">${payInSlipDetails.houseBankName}</span></div>
        </div>

        <div class="section-header">Transaction Details</div>

        <!-- ✅ Table wrapper added -->
        <div class="table-wrapper">
        <table class="transaction-table">
            <thead>
                <tr>
                    <th>Sr. No.</th>
                    <th>Unique Ref Number</th>
                    <th>Cheque/Online Transaction No.</th>
                    <th>Date</th>
                    <th>Insured Name</th>
                    <th>Drawee Bank Name</th>
                    <th style="text-align:right;">Amount (₹)</th>
                    <th>Policy Ref No</th>
                    <th>Policy Issue Date</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>1</td>
                    <td>${transaction.uniqueRefNumber}</td>
                    <td>${transaction.transactionNo}</td>
                    <td>${transaction.transactionDate}</td>
                    <td>${transaction.insuredName}</td>
                    <td>${transaction.draweeBankName}</td>
                    <td style="text-align:right;">${transaction.amount}</td>
                    <td>${transaction.policyRefNo}</td>
                    <td>${transaction.policyIssueDate}</td>
                </tr>

                <tr class="total-row">
                    <td colspan="6" style="text-align:right;">TOTAL AMOUNT:</td>
                    <td style="text-align:left;">${totals.amountFigures}</td>
                    <td colspan="2"></td>
                </tr>
            </tbody>
        </table>
        </div>

        <div class="note">This is a system-generated Pay-In Slip.</div>
    </div>
</body>
</html>`;
}

export default generatePayInSlipHTML;
