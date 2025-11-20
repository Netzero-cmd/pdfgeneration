import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
const PayInSlip = sequelize.define(
    "PayInSlip",
    {
        // Insurer
        id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
        insurer_name: { type: DataTypes.STRING },
        insurer_irdaRegnNo: { type: DataTypes.STRING },
        insurer_clientCode: { type: DataTypes.STRING },

        // Dealer
        dealer_name: { type: DataTypes.STRING },
        dealer_code: { type: DataTypes.STRING },
        dealer_cityDistrict: { type: DataTypes.STRING },

        // Pay-in Slip Details
        slip_no: { type: DataTypes.STRING },
        slip_date: { type: DataTypes.STRING },
        payment_mode: { type: DataTypes.STRING },
        house_bank_name: { type: DataTypes.STRING },

        // Transaction
        txn_uniqueRefNumber: { type: DataTypes.STRING },
        txn_transactionNo: { type: DataTypes.STRING },
        txn_transactionDate: { type: DataTypes.STRING },
        txn_insuredName: { type: DataTypes.STRING },
        txn_draweeBankName: { type: DataTypes.STRING },
        txn_amount: { type: DataTypes.DECIMAL(18, 2) },
        txn_policyRefNo: { type: DataTypes.STRING },
        txn_policyIssueDate: { type: DataTypes.STRING },

        // Totals
        total_amountFigures: { type: DataTypes.DECIMAL(18, 2) }
    },
    {
        tableName: "PayInSlip",
        timestamps: false
    }
);

export default PayInSlip;