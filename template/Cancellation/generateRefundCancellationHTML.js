const createDetailRow = (label, value) => `
    <div class="detail-row">
        <span class="detail-label">${label}:</span>
        <span class="detail-value">${value}</span>
    </div>
`;
function generateRefundCancellationHTML(data) {
    const { letterInfo, recipient, subject, cancellation, refund, insuredDetails, policyDetails, regards } = data;
    return `
            <div class="letter-container bg-white rounded-lg shadow-xl max-w-4xl mx-auto p-8 lg:p-12 my-8 border border-gray-100">

                <!-- Header -->
                <div class="flex justify-between items-start border-b-2 border-gray-200 pb-4 mb-6">
                    <div>
                        <div class="text-xl font-extrabold text-il-blue">${letterInfo.appTitle}</div>
                        <div class="text-xs text-gray-500 mt-1">${letterInfo.sourceLink}</div>
                    </div>
                    <div class="text-sm font-semibold text-gray-600">${letterInfo.date}</div>
                </div>

                <!-- Recipient -->
                <div class="text-sm leading-relaxed mb-6">
                    <p class="font-semibold text-il-blue">To,</p>
                    <p class="font-medium">${recipient.name}</p>
                    <p>${recipient.department}</p>
                </div>
                
                <div class="text-sm leading-relaxed mb-6">
                    Dear Sir/Madam,
                </div>

                <!-- Subject -->
                <div class="subject text-base font-bold bg-il-light-gray p-3 rounded-lg border-l-4 border-il-red mb-6">
                    Sub: ${subject.subTitle}
                </div>

                <!-- Body: Cancellation Reason -->
                <div class="text-sm leading-relaxed mb-6">
                    The Visof Vehicle Insurance Policy, Policy No. <span class="font-bold text-il-red">${subject.policyNo}</span>, has been cancelled at the request of Business Associate M/S <span class="font-bold">${cancellation.businessAssociate}</span>, on account of the following reason:
                    
                    <ul class="list-disc ml-6 mt-4 text-il-red">
                        <li class="mb-1 text-gray-800">
                            <span class="font-semibold text-il-blue">${cancellation.reason}</span>
                        </li>
                    </ul>

                    <!-- Refund Request Highlight -->
                    <div class="mt-6 p-4 border border-yellow-300 bg-yellow-50 rounded-lg text-sm font-medium">
                        You are requested to issue the refund cheque of <span class="text-lg font-extrabold text-il-red">${refund.amount}</span> in the name of <span class="font-bold">${refund.payeeName}</span>.
                    </div>
                </div>

                <!-- Insured Details -->
                <div class="mt-8 border-t border-gray-300 pt-4">
                    <div class="text-base font-bold text-il-blue mb-3">Insured Details</div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2 text-sm">
                        ${createDetailRow("Name", insuredDetails.name)}
                        ${createDetailRow("Mobile No.", insuredDetails.mobileNo)}
                        <div class="md:col-span-2">
                           ${createDetailRow("Address", insuredDetails.address)}
                        </div>
                    </div>
                </div>

                <!-- Policy Details -->
                <div class="mt-8 border-t border-gray-300 pt-4">
                    <div class="text-base font-bold text-il-blue mb-3">Details of Policy and Cancellation</div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2 text-sm">
                        ${createDetailRow("Policy No.", policyDetails.policyNo)}
                        ${createDetailRow("Cancellation No.", policyDetails.cancellationNo)}
                        ${createDetailRow("Policy Start Date", policyDetails.policyStartDate)}
                        ${createDetailRow("Policy End Date", policyDetails.policyEndDate)}
                        ${createDetailRow("Chassis No.", policyDetails.chassisNo)}
                        ${createDetailRow("Engine No.", policyDetails.engineNo)}
                        ${createDetailRow("Model-Variant", policyDetails.modelVariant)}
                        ${createDetailRow("Cancellation Request Date", policyDetails.cancellationRequestDate)}
                    </div>
                </div>
                <div class="mt-10 pt-4 text-sm leading-relaxed">
                    Regards,<br>
                    <div class="font-bold mt-2 text-il-blue">${regards.senderName}</div>
                    <div class="text-xs text-gray-500">${regards.senderTitle}</div>
                </div>

            </div>
        `;
}
export default generateRefundCancellationHTML;