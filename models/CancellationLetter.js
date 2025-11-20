import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";


const CancellationLetter = sequelize.define(
    "CancellationLetter", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
    // Letter Info
    letter_appTitle: { type: DataTypes.STRING },
    letter_date: { type: DataTypes.STRING },

    // Recipient
    recipient_department: { type: DataTypes.STRING },

    // Request
    request_policyNo: { type: DataTypes.STRING },
    request_effectiveDate: { type: DataTypes.STRING },
    request_selectedReason: { type: DataTypes.STRING },
    request_reasonChecklist: { type: DataTypes.TEXT },

    // Policy Details
    policy_policyNo: { type: DataTypes.STRING },
    policy_modelVariant: { type: DataTypes.STRING },
    policy_chassisNo: { type: DataTypes.STRING },
    policy_engineNo: { type: DataTypes.STRING },
    policy_coverType: { type: DataTypes.STRING },
    policy_odStartDate: { type: DataTypes.STRING },
    policy_odEndDate: { type: DataTypes.STRING },
    policy_tpStartDate: { type: DataTypes.STRING },
    policy_tpEndDate: { type: DataTypes.STRING },

    // Insured Details
    insured_name: { type: DataTypes.STRING },
    insured_address: { type: DataTypes.STRING },
    insured_mobileNo: { type: DataTypes.STRING },

    // Signoff
    signoff_contactNumber: { type: DataTypes.STRING },
    signoff_signatureText: { type: DataTypes.STRING }
},
    {
        tableName: "CancellationLetters",
        timestamps: false
    }
);

export default CancellationLetter;

