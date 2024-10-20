import { Router } from 'express';
import { balance, history, topup, transaction } from '../controllers/transactionController';
import { historyValidation, topupValidation, transactionValidation } from '../validations/transactionValidation';

const transactionRoutes = Router();

/**
 * @swagger
 * /balance:
 *   get:
 *     tags: [3. Module Transaction]
 *     description: <strong>API Balance Private (memerlukan Token untuk mengaksesnya)</strong>
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil Mengambil Data Balance
 *         content:
 *           application/json:
 *             schema:
 *               example: {
 *                   "status": 0,
 *                   "message": "Sukses",
 *                   "data": {
 *                       "balance": 50112
 *                   }
 *               }
 *       401:
 *         description: Token tidak valid atau kadaluwarsa
 *         content:
 *           application/json:
 *             schema:
 *               example: {
 *                  "status": 108,
 *                  "message": "Token tidak tidak valid atau kadaluwarsa",
 *                  "data": null
 *               }
 */

transactionRoutes.get('/balance', balance);

/**
 * @swagger
 * /topup:
 *   post:
 *     tags: [3. Module Transaction]
 *     description: <strong>API Topup Private (memerlukan Token untuk mengaksesnya)</strong>
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               top_up_amount:
 *                 type: string
 *                 example: 10000
 *             required:
 *               - top_up_amount
 *     responses:
 *       200:
 *         description: Berhasil Top Up
 *         content:
 *           application/json:
 *             schema:
 *               example: {
 *                   "status": 0,
 *                   "message": "Top Up Balance berhasil",
 *                   "data": {
 *                       "balance": 51112
 *                   }
 *               }
 *       401:
 *         description: Token tidak valid atau kadaluwarsa
 *         content:
 *           application/json:
 *             schema:
 *               example: {
 *                  "status": 108,
 *                  "message": "Token tidak tidak valid atau kadaluwarsa",
 *                  "data": null
 *               }
 */

transactionRoutes.post('/topup', topupValidation, topup);

/**
 * @swagger
 * /transaction:
 *   post:
 *     tags: [3. Module Transaction]
 *     description: <strong>API Transaction Private (memerlukan Token untuk mengaksesnya)</strong>
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               service_code:
 *                 type: string
 *                 example: "PULSA"
 *             required:
 *               - service_code
 *     responses:
 *       200:
 *         description: Berhasil Top Up
 *         content:
 *           application/json:
 *             schema:
 *               example: {
 *                   "status": 0,
 *                   "message": "Transaksi berhasil",
 *                   "data": {
 *                       "invoice_number": "INV20241020OPHVT8",
 *                       "service_code": "PULSA",
 *                       "service_name": "Pulsa",
 *                       "transaction_type": "PAYMENT",
 *                       "total_amount": 40000,
 *                       "created_on": "2024-10-20T03:42:50.881Z"
 *                   }
 *               }
 *       401:
 *         description: Token tidak valid atau kadaluwarsa
 *         content:
 *           application/json:
 *             schema:
 *               example: {
 *                  "status": 108,
 *                  "message": "Token tidak tidak valid atau kadaluwarsa",
 *                  "data": null
 *               }
 */

transactionRoutes.post('/transaction', transactionValidation, transaction);

/**
 * @swagger
 * /transaction/history:
 *   get:
 *     tags: [3. Module Transaction]
 *     description: <strong>API History Private (memerlukan Token untuk mengaksesnya)</strong>
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: offset
 *         required: false
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           example: 3
 *     responses:
 *       200:
 *         description: Berhasil Mengambil History Transaction.
 *         content:
 *           application/json:
 *             schema:
 *               example: {
 *                   "status": 0,
 *                   "message": "Top Up Balance berhasil",
 *                   "data": {
 *                       "offset": 0,
 *                       "limit": 3,
 *                       "records": [
 *                           {
 *                               "invoice_number": "INV20241020OPHVT8",
 *                               "transaction_type": "PAYMENT",
 *                               "description": "Pulsa",
 *                               "total_amount": 40000,
 *                               "created_on": "2024-10-20T03:42:50.881Z"
 *                           },
 *                           {
 *                               "invoice_number": "INV20241020JUWO3U",
 *                               "transaction_type": "TOPUP",
 *                               "description": "Top Up balance",
 *                               "total_amount": 1000,
 *                               "created_on": "2024-10-20T03:38:01.583Z"
 *                           },
 *                           {
 *                               "invoice_number": "INV20241019OF4EVO",
 *                               "transaction_type": "PAYMENT",
 *                               "description": "PGN Berlangganan",
 *                               "total_amount": 50000,
 *                               "created_on": "2024-10-19T15:03:00.817Z"
 *                           }
 *                       ]
 *                   }
 *               }
 *       401:
 *         description: Token tidak valid atau kadaluwarsa
 *         content:
 *           application/json:
 *             schema:
 *               example: {
 *                  "status": 108,
 *                  "message": "Token tidak tidak valid atau kadaluwarsa",
 *                  "data": null
 *               }
 */

transactionRoutes.get('/transaction/history', historyValidation, history);

export default transactionRoutes;
