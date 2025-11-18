import express from 'express';
import cancellationController from '../controllers/cancellation.Controller.js';
import endorsementController from '../controllers/endorsement.Controller.js';
import invoiceController from '../controllers/invoice.Controller.js';
import payInSlipController from '../controllers/payInSlip.Controller.js';
import policyController from '../controllers/policy.Controller.js';
import quotationController from '../controllers/quotations.Controller.js';
const router = express()
router.get('/generatrefundcancellation', cancellationController.refundCancellationPdf)
router.get('/generatrequestcancellation', cancellationController.requestCancellationPdf)
router.get('/generatendorsement', endorsementController.endorsementPdf)
router.get('/generatinvoice', invoiceController.invoicePdf)
router.get('/generatpayinslip', payInSlipController.payInSlipPdf)
router.get('/generatpolicy', policyController.policyPdf)
router.get('/generatquortation', quotationController.quotationPdf)

export default router;