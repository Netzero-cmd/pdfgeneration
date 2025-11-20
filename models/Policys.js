import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";


const InsuranceDetails = sequelize.define(
    "InsuranceDetails",
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
        insurerName: { type: DataTypes.STRING },
        websiteDetails: { type: DataTypes.STRING },
        policyNo: { type: DataTypes.STRING },
        proposalNo: { type: DataTypes.STRING },

        invoiceDate: { type: DataTypes.DATE },

        insuredName: { type: DataTypes.STRING },
        contactNo: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING },

        placeOfSupply: { type: DataTypes.STRING },
        address: { type: DataTypes.TEXT },

        // OD Cover
        od_from: { type: DataTypes.STRING },
        od_to: { type: DataTypes.STRING },

        // TP Cover
        tp_from: { type: DataTypes.STRING },
        tp_to: { type: DataTypes.STRING },

        // CPA Cover
        cpa_from: { type: DataTypes.STRING },
        cpa_to: { type: DataTypes.STRING },

        // Vehicle Details
        vehicle_regNo: { type: DataTypes.STRING },
        vehicle_makeModel: { type: DataTypes.STRING },
        vehicle_mfgMonthYear: { type: DataTypes.STRING },
        vehicle_rtoLocation: { type: DataTypes.STRING },
        vehicle_engineNo: { type: DataTypes.STRING },
        vehicle_chassisNo: { type: DataTypes.STRING },
        vehicle_cc: { type: DataTypes.STRING },
        vehicle_seatingCapacity: { type: DataTypes.STRING },
        vehicle_hypothecation: { type: DataTypes.STRING },
        vehicle_idv: { type: DataTypes.DECIMAL(18, 2) },

        // Premium Details
        premium_basicOD: { type: DataTypes.DECIMAL(18, 2) },
        premium_basicTP: { type: DataTypes.DECIMAL(18, 2) },
        premium_cpaCover: { type: DataTypes.DECIMAL(18, 2) },
        premium_totalPackage: { type: DataTypes.DECIMAL(18, 2) },
        premium_gstRate: { type: DataTypes.STRING },
        premium_gstAmount: { type: DataTypes.DECIMAL(18, 2) },
        premium_total: { type: DataTypes.DECIMAL(18, 2) },

        // Nominee
        nominee_name: { type: DataTypes.STRING },
        nominee_age: { type: DataTypes.INTEGER },
        nominee_relationship: { type: DataTypes.STRING },

        // Other
        other_deductible: { type: DataTypes.DECIMAL(18, 2) },
        other_ncbPercent: { type: DataTypes.INTEGER },
    },
    {
        tableName: "InsuranceDetails",
        timestamps: false,
    }
);

export default InsuranceDetails;
