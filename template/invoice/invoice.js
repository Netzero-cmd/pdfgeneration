function generateInvoiceHTML(invoiceData) {
    // Helper function for rendering table rows dynamically
    const renderItems = (items) => {
        return items.map(item => `
            <tr>
                <td style="border: 1px solid #000; padding: 8px; text-align: left;">${item.description}</td>
                <td style="border: 1px solid #000; padding: 8px; text-align: left; width: 100px;">${item.period}</td>
                <td style="border: 1px solid #000; padding: 8px; text-align: right; width: 150px;">${item.amount}</td>
            </tr>
        `).join('');
    };

    const totalAmount = invoiceData.items.reduce((sum, item) => {
        // Assuming amount is a string like "₹      18694", extract the number for calculation
        const amountValue = parseFloat(item.amount.replace(/[^0-9.-]+/g, ""));
        return sum + (isNaN(amountValue) ? 0 : amountValue);
    }, 0).toFixed(2); // Format to two decimal places

    // Template Literal for the HTML structure
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>INVOICE - ${invoiceData.invoiceNumber}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 20px; font-size: 10pt; }
                .invoice-box { max-width: 800px; margin: auto; padding: 30px; border: 1px solid #eee; box-shadow: 0 0 10px rgba(0, 0, 0, 0.15); font-size: 10pt; line-height: 18pt; color: #555; }
                .header, .footer { text-align: center; }
                .details-table, .items-table, .payment-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                .details-table td, .items-table th, .items-table td, .payment-table td { padding: 8px; border: 1px solid #000; }
                .details-table { border: none; }
                .details-table td { border: none; padding: 2px 0; }
                .right-align { text-align: right; }
                .total-row { font-weight: bold; background-color: #f7f7f7; }
                .signature-line { border-top: 1px solid #000; margin-top: 50px; padding-top: 5px; text-align: right; }
                h1 { margin: 0; padding: 0; font-size: 18pt; color: #333; }
                strong { font-weight: bold; }
            </style>
        </head>
        <body>
            <div class="invoice-box">
                <div class="header">
                    <h1>INVOICE</h1>
                    <h2>${invoiceData.seller.name.toUpperCase()}</h2>
                </div>

                <table class="details-table" style="margin-top: 20px;">
                    <tr>
                        <td style="width: 50%; vertical-align: top;">
                            <p style="margin: 0;">${invoiceData.seller.addressLine1}</p>
                            <p style="margin: 0;">${invoiceData.seller.addressLine2}</p>
                            <p style="margin: 0;">M : ${invoiceData.seller.phone}</p>
                            <p style="margin: 0;">PAN NO – ${invoiceData.seller.pan}</p>
                        </td>
                        <td style="width: 50%; vertical-align: top; text-align: right;">
                            <p style="margin: 0;"><strong>DATE:</strong> ${invoiceData.invoiceDate}</p>
                            <p style="margin: 0;"><strong>INVOICE #:</strong> ${invoiceData.invoiceNumber}</p>
                        </td>
                    </tr>
                </table>

                <hr style="border: 0; border-top: 1px solid #ccc; margin: 10px 0;">

                <div style="margin-bottom: 10px;">
                    <p style="margin: 0;"><strong>Bill To:</strong></p>
                    <p style="margin: 0;"><strong>${invoiceData.billToName}</strong></p>
                    <p style="margin: 0;">${invoiceData.billToAddressLine1}</p>
                    <p style="margin: 0;">${invoiceData.billToAddressLine2}</p>
                    <p style="margin: 0;">${invoiceData.billToAddressLine3}</p>
                    <p style="margin: 0;">Company PAN No. ${invoiceData.billToPan}</p>
                    <p style="margin: 0;">Company GST No. ${invoiceData.billToGst}</p>
                </div>

                <table class="items-table" style="width: 100%; border: 1px solid #000;">
                    <thead>
                        <tr style="background-color: #f2f2f2;">
                            <th style="border: 1px solid #000; padding: 8px; text-align: left;">DESCRIPTION</th>
                            <th style="border: 1px solid #000; padding: 8px; text-align: left; width: 100px;">PERIOD</th>
                            <th style="border: 1px solid #000; padding: 8px; text-align: right; width: 150px;">AMOUNT IN RS</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${renderItems(invoiceData.items)}
                        <tr class="total-row">
                            <td colspan="2" style="border: 1px solid #000; padding: 8px; text-align: right;">TOTAL</td>
                            <td style="border: 1px solid #000; padding: 8px; text-align: right;">₹ ${totalAmount}</td>
                        </tr>
                    </tbody>
                </table>

                <p style="margin: 15px 0 30px 0;">( Total in Rupees : <strong>${invoiceData.totalInWords}</strong> )</p>

                <p style="margin: 0;"><strong>Make all payments to</strong></p>
                <table class="details-table" style="font-size: 9pt;">
                    <tr>
                        <td style="width: 30%;">Payee Name:</td>
                        <td style="width: 70%;"><strong>${invoiceData.paymentInfo.payeeName}</strong></td>
                    </tr>
                    <tr>
                        <td style="width: 30%;">Payee Bank Details:</td>
                        <td style="width: 70%;"><strong>${invoiceData.paymentInfo.bankDetails}</strong></td>
                    </tr>
                    <tr>
                        <td style="width: 30%;">IFSC Code:</td>
                        <td style="width: 70%;"><strong>${invoiceData.paymentInfo.ifsc}</strong></td>
                    </tr>
                    <tr>
                        <td style="width: 30%;">M :</td>
                        <td style="width: 70%;"><strong>${invoiceData.paymentInfo.phone}</strong></td>
                    </tr>
                    <tr>
                        <td style="width: 30%;">PAN NO –</td>
                        <td style="width: 70%;"><strong>${invoiceData.paymentInfo.pan}</strong></td>
                    </tr>
                </table>

                <div class="signature-line">
                    <p style="margin: 0;">${invoiceData.paymentInfo.payeeName}</p>
                    <p style="margin: 0;">Authorized Signatory</p>
                </div>
                
                <div class="footer" style="margin-top: 20px;">
                    <p style="margin: 0;">THANK YOU</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

export default generateInvoiceHTML;