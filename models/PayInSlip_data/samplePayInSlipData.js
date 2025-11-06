const samplePayInSlipData = {
    slip: {
        payInSlipNo: "ICICIP000426",
        payInSlipDate: "17/10/2025",
        note: "Note: This deposit is not verified at the time of acceptance. Final credit is subject to verification by the bank; and subject to the terms & conditions of the Collection Service Agreement as accepted by you...",
    },
    dealer: {
        dealerName: "Shree Ganesh BGAUSS Dealership",
        dealerCode: "INSBGAUSS123",
        dealerCityDistrict: "GURGAON",
        clientCode: "ILOMHYUN",
    },
    bank: {
        paymentMode: "Dealer's Cheque",
        houseBankName: "APG BANK",
    },
    transactions: [
        {
            uniqueRefNumber: "PAYICICI001146",
            chequeTransactionNo: "887654",
            chequeTransactionDate: "17/10/2025",
            insuredName: "MR. PRASAD P",
            draweeBankName: "APG BANK",
            transactionAmount: "44.00",
            commonRefNoPolicyNo: "ICICIE3005/O/BG-00000256/00/000/03",
            policyIssueDateId: "17/10/2025",
        }
    ],
    total: {
        numericalAmount: 44,
        currencyAmount: "44/-",
        words: "and Forty Four Only.",
    }
};