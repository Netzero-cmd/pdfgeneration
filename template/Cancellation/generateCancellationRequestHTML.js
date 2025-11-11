const createDetailRow = (label, value) => `
    <div class="detail-row">
        <span class="detail-label">${label}</span>
        <span class="detail-value">${value}</span>
    </div>
`;
const renderReasonChecklist = (reasons, selectedReason) => {
    return reasons.map(reason => {
        const isSelected = reason === selectedReason;
        const checkMark = isSelected ? '&#x2611;' : '&#x2610;'; // Checked or Unchecked Box
        const reasonClass = isSelected ? 'checked-reason' : 'unchecked-reason';
        return `
            <div class="reason-item ${reasonClass}">
                <span class="checkbox">${checkMark}</span>
                <span class="reason-text">${reason}</span>
            </div>
        `;
    }).join('');
};
function generateCancellationRequestHTML(data) {
    const { letterInfo, recipient, request, policyDetails, insuredDetails, signoff } = data;
    const internalCSS = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
            body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; background-color: #f7f7f7; color: #333; }
            .letter-container { width: 100%; max-width: 750px; margin: 20px auto; padding: 40px; box-sizing: border-box; background-color: #fff; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }

            .header { text-align: right; font-size: 12px; color: #777; margin-bottom: 20px; }
            .title { text-align: center; font-size: 18px; font-weight: 800; color: #00448A; margin-bottom: 30px; padding-bottom: 10px; border-bottom: 2px solid #eee; }

            .recipient-section { margin-bottom: 30px; font-size: 14px; line-height: 1.6; }
            .salutation { margin-bottom: 15px; font-size: 14px; }
            
            .subject { font-size: 15px; font-weight: 700; background-color: #f5f5f5; padding: 8px; border-left: 5px solid #DF1E26; margin-bottom: 20px; }
            .subject-text { font-size: 14px; font-weight: 400; }

            .body-text { font-size: 14px; line-height: 1.8; margin-bottom: 20px; }
            .policy-no-highlight { font-weight: 700; color: #DF1E26; }
            .date-highlight { font-weight: 700; color: #00448A; }

            /* Reason Checklist Styling */
            .reason-checklist-container { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin: 15px 0 30px 0; padding: 15px; border: 1px solid #ddd; border-radius: 4px; background-color: #fcfcfc; }
            .reason-item { display: flex; align-items: center; font-size: 13px; }
            .checkbox { font-size: 16px; margin-right: 8px; color: #00448A; }
            .reason-text { font-weight: 500; }
            .checked-reason .reason-text { font-weight: 700; color: #1a1a1a; }
            .unchecked-reason { opacity: 0.7; }

            /* Details Grid Styling */
            .details-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px 30px; margin-top: 15px; }
            .detail-row { display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px dashed #eee; font-size: 13px; }
            .detail-label { font-weight: 500; color: #555; width: 45%; }
            .detail-value { font-weight: 600; color: #1a1a1a; text-align: right; width: 55%; }
            
            /* Signature Section */
            .signature-section { margin-top: 50px; border-top: 1px solid #ccc; padding-top: 20px; }
            .signature-line { height: 1px; width: 60%; border-bottom: 1px solid #333; margin-bottom: 5px; }
            .signature-label { font-size: 12px; color: #555; margin-left: 5px; }
        </style>
    `;
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Customer Request Letter for Policy Cancellation</title>
    ${internalCSS}
</head>
<body>
    <div class="letter-container">
        
        <div class="header">
            ${letterInfo.date}
        </div>

        <div class="title">
            Customer Request Letter for Policy Cancellation
        </div>

        <!-- Recipient -->
        <div class="recipient-section">
            To,<br>
            ${recipient.department}
        </div>
        
        <div class="salutation">
            Dear Sir/Madam,
        </div>

        <!-- Subject -->
        <div class="subject">
            Sub: Cancellation of Policy No. ${request.policyNo}
        </div>

        <!-- Body: Request Text -->
        <div class="body-text">
            You are requested to please cancel the above mentioned policy effective today i.e. <span class="date-highlight">${request.effectiveDate}</span> on
            account of the following reason(s) -
        </div>

        <!-- Cancellation Reason Checklist -->
        <div class="reason-checklist-container">
            ${renderReasonChecklist(request.reasonChecklist, request.selectedReason)}
        </div>

        <!-- Policy Details Section -->
        <div class="body-text">
            The details of my policy are given below:-
        </div>

        <div class="details-grid">
            ${createDetailRow("Policy No.", policyDetails.policyNo)}
            ${createDetailRow("Model-Variant", policyDetails.modelVariant)}
            ${createDetailRow("Chassis No.", policyDetails.chassisNo)}
            ${createDetailRow("Engine No.", policyDetails.engineNo)}
            ${createDetailRow("Cover Type", policyDetails.coverType)}
            <div></div> <!-- Spacer -->
            ${createDetailRow("OD Start Date", policyDetails.odStartDate)}
            ${createDetailRow("OD End Date", policyDetails.odEndDate)}
            ${createDetailRow("TP Start Date", policyDetails.tpStartDate)}
            ${createDetailRow("TP End Date", policyDetails.tpEndDate)}
            <div></div> <!-- Spacer -->
        </div>

        <!-- Insured Details Section -->
        <div class="body-text" style="margin-top: 30px;">
            <div style="font-weight: 700; margin-bottom: 5px;">Insured Details:</div>
            ${createDetailRow("Name", insuredDetails.name)}
            ${createDetailRow("Address", insuredDetails.address)}
            ${createDetailRow("Mobile No.", insuredDetails.mobileNo)}
        </div>

        <!-- Sign-off Section -->
        <div class="signature-section">
            <div class="signature-line"></div>
            <div class="signature-label">Signature of Policy Holder</div>
            <div style="margin-top: 15px;">
                <div style="font-size: 14px; font-weight: 600; margin-bottom: 5px;">${insuredDetails.name}</div>
                <div style="font-size: 13px;">Contact Number: ${signoff.contactNumber}</div>
            </div>
        </div>

    </div>
</body>
</html>`;
}

export default generateCancellationRequestHTML;