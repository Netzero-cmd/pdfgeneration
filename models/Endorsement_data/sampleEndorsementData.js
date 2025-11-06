const sampleEndorsementData = {
    policyInfo: {
        policyNo: "3005/0/BG-00000256/00/000",
        endorsementNo: "ICICIE3005/0/BG-00000256/00/000/03",
        tpPolicyNo: "treyyr66547475",
        tpPolicyExpiryDate: "30/10/2029",
        endorsementRequestDate: "17/10/2025",
        endorsementUpdatedDate: "17/10/2025",
        paymentMode: "Cheque",
        icStatus: "Approved",
        remarks: "ok approve testing",
        endorsementType: "Accessories",
        dealerCode: "INSBGAUSS123",
    },
    insured: {
        name: "MR. PRASAD P",
        address: "PENTO VILLA,,",
        modelVariant: "BGAUSS C12-BGAUSS C121 EX",
    },
    valueChanges: {
        subHeading: "Endorsement For",
        items: [
            { name: "Electrical Value", current: "0", new: "1000", diff: "1000" },
            { name: "Non Electrical Value", current: "0", new: "1000", diff: "1000" },
        ],
    },
    premiumChange: {
        od: {
            subHeading: "Own Damage Premium",
            rows: [
                { name: "Basic Own Damage Premium", current: "0.0", new: "3.24", diff: "3.24" },
                { name: "PA Cover for Owner Driver(1500000)", current: "0.0", new: "0.0", diff: "0.0" },
            ],
            subTotal: { name: "Sub Total (Own Damage)", current: "0.0", new: "3.24", diff: "3.24" },
        },
        liability: {
            subHeading: "Liability Premium",
            thirdParty: {
                title: "Third Party Liability",
                rows: [
                    { name: "Basic Third Party Liability Premium (including TPPD)", current: "0.0", new: "0.0", diff: "0.0" },
                    { name: "Third Party Liability For Bi-Fuel Kit", current: "0.0", new: "0.0", diff: "0.0" },
                    { name: "Third Party Liability For Geographical Area Extension", current: "0.0", new: "0.0", diff: "0.0" },
                ],
                subTotal: { name: "Sub Total (Third Party Liability)", current: "0.0", new: "0.0", diff: "0.0" },
            },
            paCover: {
                title: "PA Cover",
                rows: [
                    { name: "Compulsory PA Cover for Owner Driver(1500000)", current: "0.0", new: "0.0", diff: "0.0" },
                    { name: "PA cover for Paid Driver (200000)", current: "0.0", new: "0.0", diff: "0.0" },
                    { name: "PA Cover (200000 Per Person) for 0 Persons", current: "0.0", new: "0.0", diff: "0.0" },
                ],
                subTotal: { name: "Sub Total (PA Cover)", current: "0.0", new: "0.0", diff: "0.0" },
            },
            legalLiability: {
                title: "Legal Liability",
                rows: [
                    { name: "Paid Driver", current: "0.0", new: "0.0", diff: "0.0" },
                    { name: "Employees (for 0 persons)", current: "0.0", new: "0.0", diff: "0.0" },
                ],
                subTotal: { name: "Sub Total (Legal Liability)", current: "0.0", new: "0.0", diff: "0.0" },
            },
            grandTotalLiability: { name: "Grand Total (Liability Premium)", current: "0.0", new: "0.0", diff: "0.0" },
        },
    },
    finalPremiumSummary: {
        grossPremium: { name: "Gross Premium", current: "0.0", new: "3.24", diff: "3.24" },
        gst: { name: "GST", current: "0.0", new: "0.58", diff: "0.58" },
        netPremiumPayable: { name: "Net Premium Payable", current: "0.0", new: "3.82", diff: "3.82" },
        amountPayableByCustomer: "3.82",
    }
};