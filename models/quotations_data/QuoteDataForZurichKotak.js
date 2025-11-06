const sampleZurichKotakQuoteData = {
    quote: {
        quoteNumber: "Q768033968147",
        quoteDate: "23/10/2025",
        policyStartDate: "23/10/2025",
    },
    customer: {
        customerName: "Customer Name",
        contactNumber: "+91 98765 43210",
        email: "customer@example.com",
    },
    vehicle: {
        registrationDate: "23/10/2025",
        registrationNoRTO: "/TN01 CHENNΝΑΙ (20529)",
        make: "TATA",
        model: "ΝΕΧΟΝ",
        variant: "NEXON - CREATIVE PLUS 1.5 REVOTORQ DIESEL 6AMT",
        fuelType: "Diesel",
        cubicCapacity: "1497",
        seatingCapacity: "5",
    },
    od: {
        covers: {
            "Own Damage Premium (Rs)": "9,906.59",
            "Electrical/Electronic Items (Rs)": "0.00",
            "Non Electrical/Electronic Items (Rs)": "0.00",
            "External Bi Fuel Kit (Rs)": "0.00",
            "CNG and LPG Kit (Rs)": "0.00",
        }
    },
    liability: {
        covers: {
            "Basic TP including TPPD premium (Rs)": "10,640.00",
            "Liability For Bi-Fuel Kit (Rs)": "0.00",
            "PA For Unnamed Passenger SI per person :0.0 (Rs) Number of Persons: 5": "0.00",
            "PA For Named Passenger SI: 0.0 (Rs)": "0.00",
            "PA To Paid Driver SI: 0.0 (Rs)": "0.00",
            "PA Cover For Owner Driver Tenure": "0.00",
            "Legal Liability for paid driver cleaner Conductor (Rs)": "150.00",
            "Legal Liability for Employees other than paid driver conductor cleaner (Rs)": "150.00",
            "CNG Kit TP (Rs)": "0.00",
        },
        totalLiability: "10,940.00",
    },
    addOns: {
        "Engine Protect Cover (Rs)": "595.10",
        "Return to Invoice Cover (Rs)": "595.10",
        "Consumable Cover (Rs)": "738.74",
        "Depreciation Cover (Rs)": "3,570.57",
        "Road Side Assistance (RSA) (Rs)": "500.00",
        "Daily Car Allowance (Rs)": "0.00",
        "Key Replacement SI :25000 (Rs)": "233.75",
        "Tyre Cover (Rs)": "1,488.34",
        "NCB Protect (Rs)": "0.00",
        "Loss of Personal Belongings SI: 10000 (Rs)": "93.50",
    },
    discount: {
        "Voluntary Deduction for Basic OD (Rs)": "0.00",
        "No Claim Bonus (NCB) 0% (Rs)": "0.00",
        totalODAfterDiscount: "18,146.69",
    },
    total: {
        finalIdv: "1,207,090.00",
        netPremium: "29,086.69",
        gst: "5,235.60",
        totalPremium: "34,322.00",
    }
};