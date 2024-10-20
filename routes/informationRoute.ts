import { Router } from 'express';
import { banner, services } from '../controllers/informationController';
import { auth } from '../middlewares/auth';

const informationRoutes = Router();

/**
 * @swagger
 * /banner:
 *   get:
 *     tags: [2. Module Information]
 *     description: <strong>API Banner Public (tidak memerlukan Token untuk mengaksesnya)</strong>
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil Mengambil Daftar Banner.
 *         content:
 *           application/json:
 *             schema:
 *               example: {
 *                   "status": 0,
 *                   "message": "Sukses",
 *                   "data": [
 *                       {
 *                           "banner_name": "Banner 1",
 *                           "banner_image": "https://nutech-integrasi.app/dummy.jpg",
 *                           "description": "Lerem Ipsum Dolor sit amet"
 *                       },
 *                       {
 *                           "banner_name": "Banner 2",
 *                           "banner_image": "https://nutech-integrasi.app/dummy.jpg",
 *                           "description": "Lerem Ipsum Dolor sit amet"
 *                       },
 *                       {
 *                           "banner_name": "Banner 5",
 *                           "banner_image": "https://nutech-integrasi.app/dummy.jpg",
 *                           "description": "Lerem Ipsum Dolor sit amet"
 *                       }
 *                   ]
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

informationRoutes.get('/banner', banner);

/**
 * @swagger
 * /services:
 *   get:
 *     tags: [2. Module Information]
 *     description: <strong>API Services Private (memerlukan Token untuk mengaksesnya)</strong>
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil Mengambil daftar layanan atau service
 *         content:
 *           application/json:
 *             schema:
 *               example: {
 *                  "status": 0,
 *                  "message": "Sukses",
 *                  "data": [
 *                       {
 *                           "service_code": "PAJAK",
 *                           "service_name": "Pajak PBB",
 *                           "service_icon": "https://nutech-integrasi.app/dummy.jpg",
 *                           "service_tarif": 40000
 *                       },
 *                       {
 *                           "service_code": "PLN",
 *                           "service_name": "Listrik",
 *                           "service_icon": "https://nutech-integrasi.app/dummy.jpg",
 *                           "service_tarif": 10000
 *                       },
 *                       {
 *                           "service_code": "PDAM",
 *                           "service_name": "PDAM Berlangganan",
 *                           "service_icon": "https://nutech-integrasi.app/dummy.jpg",
 *                           "service_tarif": 40000
 *                       }
 *                   ]
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
informationRoutes.get('/services', services);

export default informationRoutes;