import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Endorsement = sequelize.define(
    "Endorsement",
    {
        // ---------------- POLICY INFO ----------------
        id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
        policy_policyNo: { type: DataTypes.STRING },
        policy_endorsementNo: { type: DataTypes.STRING },
        policy_tpPolicyNo: { type: DataTypes.STRING },
        policy_tpPolicyExpiryDate: { type: DataTypes.STRING },
        policy_endorsementRequestDate: { type: DataTypes.STRING },
        policy_endorsementUpdatedDate: { type: DataTypes.STRING },
        policy_paymentMode: { type: DataTypes.STRING },
        policy_icStatus: { type: DataTypes.STRING },
        policy_remarks: { type: DataTypes.STRING },
        policy_endorsementType: { type: DataTypes.STRING },
        policy_dealerCode: { type: DataTypes.STRING },

        // ---------------- INSURED ----------------
        insured_name: { type: DataTypes.STRING },
        insured_address: { type: DataTypes.STRING },
        insured_modelVariant: { type: DataTypes.STRING },

        // ---------------- VALUE CHANGES ----------------
        value_subHeading: { type: DataTypes.STRING },
        value_items: { type: DataTypes.TEXT },

        // ---------------- PREMIUM CHANGE ----------------

        // OD
        od_subHeading: { type: DataTypes.STRING },
        od_rows: { type: DataTypes.TEXT },
        od_subTotal: { type: DataTypes.TEXT },

        // Liability → Third Party
        liability_thirdParty_title: { type: DataTypes.STRING },
        liability_thirdParty_rows: { type: DataTypes.TEXT },
        liability_thirdParty_subTotal: { type: DataTypes.TEXT },

        // Liability → PA Cover
        liability_paCover_title: { type: DataTypes.STRING },
        liability_paCover_rows: { type: DataTypes.TEXT },
        liability_paCover_subTotal: { type: DataTypes.TEXT },

        // Liability → Legal Liability
        liability_legalLiability_title: { type: DataTypes.STRING },
        liability_legalLiability_rows: { type: DataTypes.TEXT },
        liability_legalLiability_subTotal: { type: DataTypes.TEXT },

        // Liability → Grand Total
        liability_grandTotal: { type: DataTypes.TEXT },

        // ---------------- FINAL PREMIUM SUMMARY ----------------
        final_grossPremium: { type: DataTypes.TEXT },
        final_gst: { type: DataTypes.TEXT },
        final_netPremiumPayable: { type: DataTypes.TEXT },
        final_amountPayableByCustomer: { type: DataTypes.DECIMAL(18, 2) }
    },
    {
        tableName: "Endorsements",
        timestamps: false
    }
);

export default Endorsement;


