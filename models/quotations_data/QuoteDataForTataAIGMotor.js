const sampleTataAIGQuoteData = {
    quote: {
        quoteNumber: "QT/25/6312546540",
        quoteDate: "15/10/2025",
        policyPlan: "Package (1 year OD + 1 year TP)",
        policyStartDate: "31/10/2025",
        policyEndDate: "30/10/2026",
    },
    vehicle: {
        registrationNumber: "JH02BN2971",
        rtoLocation: "HAZARIBAGH RAMGARH",
        dateOfRegistration: "05/11/2023",
        mfgYear: "2023",
        make: "TATA MOTORS",
        model: "SIGNA 4830",
        variant: "TK",
        gvw: "48000",
        idv: "44,35,000.00",
    },
    premium: {
        od: {
            covers: {
                "Basic OD Premium": "10,174.00",
                "Add: Repair of glass, plastic, fibre and Rubber (TA 06)": "0.00",
            },
            ncbPercent: "20%",
            subTotalBeforeNCB: "10,174.00",
            ncbDiscount: "2,034.80",
            netOdPremium: "8,139.20",
        },
        tp: {
            covers: {
                "Basic TP Premium": "44,242.00",
            },
            netTpPremium: "44,242.00",
        },
        addOns: {
            covers: {
                "Nil Depreciation (TA 01)": "28,600.00",
                "Road Side Assistance (TA 21)": "384.00",
                "Key Replacement": "0.00",
                "Engine Protect": "0.00",
                "Consumables": "0.00",
                "Daily Allowance": "0.00",
            },
            totalAddOnPremium: "28,984.00",
        },
        otherLiability: {
            covers: {
                "LL to Paid Driver/Cleaner (TA 03)": "100.00",
                "LL to Cleaner/Conductor/Coolies (TA 04)": "0.00",
                "PA for Owner Driver": "0.00",
            },
            netOtherLiabilityPremium: "100.00",
        },
    },
    totals: {
        netPremium: "82,954.00",
        gst: {
            odGst: "6,950.00",
            otherLiabilityGst: "18.00",
            totalGst: "9,180.00",
        },
        totalPolicyPremium: "92,134.00",
    }
};