import { Router } from 'express';
import { balance, history, topup, transaction } from '../controllers/transactionController';
import { historyValidation, topupValidation, transactionValidation } from '../validations/transactionValidation';

const transactionRoutes = Router();

transactionRoutes.get('/balance', balance);
transactionRoutes.post('/topup', topupValidation, topup);
transactionRoutes.post('/transaction', transactionValidation, transaction);
transactionRoutes.get('/transaction/history', historyValidation, history);

export default transactionRoutes;
