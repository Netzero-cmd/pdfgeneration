import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Invoice = sequelize.define(
    "Invoice",
    {
        // Seller
        id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
        seller_name: { type: DataTypes.STRING },
        seller_addressLine1: { type: DataTypes.STRING },
        seller_addressLine2: { type: DataTypes.STRING },
        seller_phone: { type: DataTypes.STRING },
        seller_pan: { type: DataTypes.STRING },

        // Invoice Details
        invoiceDate: { type: DataTypes.STRING },
        invoiceNumber: { type: DataTypes.STRING },

        // Bill To
        billToName: { type: DataTypes.STRING },
        billToAddressLine1: { type: DataTypes.STRING },
        billToAddressLine2: { type: DataTypes.STRING },
        billToAddressLine3: { type: DataTypes.STRING },
        billToPan: { type: DataTypes.STRING },
        billToGst: { type: DataTypes.STRING },

        // Items (array)
        items: { type: DataTypes.TEXT },

        // Amount in words
        totalInWords: { type: DataTypes.STRING },

        // Payment Info
        payment_payeeName: { type: DataTypes.STRING },
        payment_bankDetails: { type: DataTypes.STRING },
        payment_ifsc: { type: DataTypes.STRING },
        payment_phone: { type: DataTypes.STRING },
        payment_pan: { type: DataTypes.STRING }
    },
    {
        tableName: "Invoices",
        timestamps: false
    }
);

export default Invoice;

