import express from "express";
import morgan from "morgan";
import pdfrouter from "./routers/routers.js";
import { sequelize, connectdb, disconnectdb } from "./config/db.js";
import {
    InsuranceDetails,
    quotations,
    PayInSlip,
    Endorsement,
    CancellationLetter,
    CancelCertificate,
    Invoice
} from './models/CentralizedSync.js'
const app = express();

app.use(express.json());
app.use(morgan("dev"));
const server = app.listen(3000, async () => {
    console.log("Server running at http://localhost:3000");
    try {
        await connectdb();
        await sequelize.sync();
        console.log("Database connected & tables synced");
    } catch (err) {
        console.error("Database connection failed:", err);
    }
});

app.use("/pdfservices", pdfrouter);
process.on("SIGINT", async () => {
    console.log("SIGINT received: shutting down gracefully...");
    server.close(async () => {
        console.log("HTTP server closed.");
        await disconnectdb();
        console.log("Database disconnected.");
        process.exit(0);
    });
});
