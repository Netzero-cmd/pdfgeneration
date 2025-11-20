import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const CancelCertificate = sequelize.define(
    "CancelCertificate",
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
        // Letter Info
        letter_appTitle: { type: DataTypes.STRING },
        letter_date: { type: DataTypes.STRING },
        letter_sourceLink: { type: DataTypes.STRING },

        // Recipient
        recipient_name: { type: DataTypes.STRING },
        recipient_department: { type: DataTypes.STRING },

        // Subject
        subject_subTitle: { type: DataTypes.STRING },
        subject_policyNo: { type: DataTypes.STRING },

        // Cancellation
        cancellation_businessAssociate: { type: DataTypes.STRING },
        cancellation_reason: { type: DataTypes.STRING },

        // Refund
        refund_amount: { type: DataTypes.DECIMAL(18, 2) },
        refund_payeeName: { type: DataTypes.STRING },

        // Insured Details
        insured_name: { type: DataTypes.STRING },
        insured_address: { type: DataTypes.STRING },
        insured_mobileNo: { type: DataTypes.STRING },

        // Policy Details
        policy_policyNo: { type: DataTypes.STRING },
        policy_engineNo: { type: DataTypes.STRING },
        policy_policyStartDate: { type: DataTypes.STRING },
        policy_cancellationNo: { type: DataTypes.STRING },
        policy_chassisNo: { type: DataTypes.STRING },
        policy_modelVariant: { type: DataTypes.STRING },
        policy_policyEndDate: { type: DataTypes.STRING },
        policy_cancellationRequestDate: { type: DataTypes.STRING },

        // Regards
        regards_senderName: { type: DataTypes.STRING },
        regards_senderTitle: { type: DataTypes.STRING }
    },
    {
        tableName: "CancelCertificates",
        timestamps: false
    }
);

export default CancelCertificate;