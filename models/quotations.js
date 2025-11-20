import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";


const quotations = sequelize.define(
    "quotations",
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, unique: true, primaryKey: true },
        insurerName: { type: DataTypes.STRING },
        customerName: { type: DataTypes.STRING },
        quoteNumber: { type: DataTypes.STRING },
        uin: { type: DataTypes.STRING },
        quoteIssueDate: { type: DataTypes.STRING }, // "22-Oct-2025"

        // Vehicle
        vehicle_regNo: { type: DataTypes.STRING },
        vehicle_rtoLocation: { type: DataTypes.STRING },
        vehicle_seatingCapacity: { type: DataTypes.STRING },
        vehicle_make: { type: DataTypes.STRING },
        vehicle_model: { type: DataTypes.STRING },
        vehicle_fuelType: { type: DataTypes.STRING },
        vehicle_hypothecation: { type: DataTypes.STRING },
        vehicle_engineNo: { type: DataTypes.STRING },
        vehicle_chassisNo: { type: DataTypes.STRING },

        // Policy
        policy_coveragesOpted: { type: DataTypes.STRING },
        policy_ncbPercent: { type: DataTypes.STRING },
        policy_odFrom: { type: DataTypes.STRING },
        policy_odTo: { type: DataTypes.STRING },
        policy_tpFrom: { type: DataTypes.STRING },
        policy_tpTo: { type: DataTypes.STRING },
        policy_paOwnerDriverFrom: { type: DataTypes.STRING },
        policy_paOwnerDriverTo: { type: DataTypes.STRING },
        policy_voluntaryDeductible: { type: DataTypes.DECIMAL(18, 2) },
        policy_compulsoryDeductible: { type: DataTypes.DECIMAL(18, 2) },
        policy_paOwnerDriverCover: { type: DataTypes.DECIMAL(18, 2) },

        // IDV
        idv_year: { type: DataTypes.STRING },
        idv_vehicleIdv: { type: DataTypes.DECIMAL(18, 2) },
        idv_totalIdv: { type: DataTypes.DECIMAL(18, 2) },

        // Premium
        premium_basicOdPremium: { type: DataTypes.DECIMAL(18, 2) },
        premium_ncbDiscount: { type: DataTypes.DECIMAL(18, 2) },
        premium_othersOdPremium: { type: DataTypes.DECIMAL(18, 2) },
        premium_totalOdPremium: { type: DataTypes.DECIMAL(18, 2) },
        premium_basicTpLiability: { type: DataTypes.DECIMAL(18, 2) },
        premium_paOwnerDriverPremium: { type: DataTypes.DECIMAL(18, 2) },
        premium_totalActPremium: { type: DataTypes.DECIMAL(18, 2) },
        premium_netPremium: { type: DataTypes.DECIMAL(18, 2) },
        premium_igstPercent: { type: DataTypes.DECIMAL(18, 2) },
        premium_igstAmount: { type: DataTypes.DECIMAL(18, 2) },
        premium_finalPremium: { type: DataTypes.DECIMAL(18, 2) },
    },
    {
        tableName: "quotations",
        timestamps: false,
    }
);

export default quotations;
