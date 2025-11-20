import CancelCertificate from "./CancelCertificate.js";
import CancellationLetter from "./CancellationLetter.js";
import quotations from "./quotations.js";
import Invoice from "./invoices.js";
import PayInSlip from "./payInSlips.js";
import InsuranceDetails from "./Policys.js";
import Endorsement from "./endorsements.js";



const syncAllTables = async () => {
    console.log("🔄 Starting individual table sync...\n");
    try {
        await CancelCertificate.sync();
        console.log(`✅ Synced table: CancelCertificate`);
        await CancellationLetter.sync();
        console.log(`✅ Synced table: CancellationLetter`);
        await quotations.sync();
        console.log(`✅ Synced table: quotations`);
        await Invoice.sync();
        console.log(`✅ Synced table: Invoice`);
        await PayInSlip.sync();
        console.log(`✅ Synced table: PayInSlip`);
        await InsuranceDetails.sync();
        console.log(`✅ Synced table: InsuranceDetails`);
        await Endorsement.sync();
        console.log(`✅ Synced table: Endorsement`);
    } catch (error) {
        console.error(`❌ Failed to sync table::`, error.message);
    }
    console.log("\n🎉 All table sync operations completed!");
};

(async () => {
    await syncAllTables();
})();

export {
    InsuranceDetails,
    quotations,
    PayInSlip,
    Endorsement,
    CancellationLetter,
    CancelCertificate,
    Invoice
};








