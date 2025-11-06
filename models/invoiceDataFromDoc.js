const invoiceDataFromDoc = {
    seller: {
        name: "VINAYAKA MOTORS",
        addressLine1: "Mr SANTHOSH K S, KOONAMUDDANAHALLI KOTTAGAL (H) BILAGUMBA",
        addressLine2: "RAMANAGARA",
        phone: "9611155205",
        pan: "DOHPS7493H"
    },
    invoiceDate: "OCT/06/2025",
    invoiceNumber: "TM-15/25-26",
    billToName: "Ins - Lab Private Ltd",
    billToAddressLine1: "No,364,16th Main,",
    billToAddressLine2: "4 th T Block, Jayanagar,",
    billToAddressLine3: "Bengaluru Bangalore - 560 011",
    billToPan: "AAGCI5222H",
    billToGst: "29AAGCI5222H1ZK",
    items: [
        {
            description: "Marketing commission Services for the month of OCTOBER - 25",
            period: "SEPT- 24",
            amount: "₹ 18694",
        }
    ],
    totalInWords: "EIGHTEEN THOUSAND SIX HUNDRED NINETYFOUR RUPES ONLY",
    paymentInfo: {
        payeeName: "SANTHOSH K S",
        bankDetails: "HDFC Bank A/C Number:50100306612460",
        ifsc: "HDFC0001747",
        phone: "9611155205",
        pan: "DOHPS7493H"
    }
};

export default invoiceDataFromDoc;