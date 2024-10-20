import { Router } from 'express';
import { login, profile, register, updateProfile, uploadImage } from '../controllers/membershipController';
import { 
    loginValidation, 
    registerValidation, 
    updateProfileValidation, 
    uploadImageValidation 
} from '../validations/membershipValidation';
import { auth } from '../middlewares/auth';
import { file } from '../middlewares/file';

const membershipRoutes = Router();

/**
 * @swagger
 * /registration:
 *   post:
 *     tags: [1. Module Membership]
 *     description: <strong>API Registration Public (Tidak perlu Token untuk mengaksesnya)</strong>
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "arzi@rahman.com"
 *               first_name:
 *                 type: string
 *                 example: "arzi"
 *               last_name:
 *                 type: string
 *                 example: "rahman"
 *               password:
 *                 type: string
 *                 example: "12345678"
 *             required:
 *               - email
 *               - first_name
 *               - last_name
 *               - password
 *     responses:
 *       200:
 *         description: Berhasil Register
 *         content:
 *           application/json:
 *             schema:
 *               example: {
 *                  "status": 0,
 *                  "message": "Registrasi berhasil silahkan login",
 *                  "data": null
 *               }
 *       400:
 *         description: Permintaan tidak valid
 *         content:
 *           application/json:
 *             schema:
 *                example: {
 *                  "status": 102,
 *                  "message": "Email sudah terdaftar",
 *                  "data": null
 *               }
 */

membershipRoutes.post('/registration', registerValidation, register);

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [1. Module Membership]
 *     description: <strong>API Login Public (Tidak perlu Token untuk mengaksesnya)</strong>
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "arzi@rahman.com"
 *               password:
 *                 type: string
 *                 example: "12345678"
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Berhasil Login
 *         content:
 *           application/json:
 *             schema:
 *               example: {
 *                   "status": 0,
 *                   "message": "Login Sukses",
 *                   "data": {
 *                       "token": "JWT_TOKEN"
 *                   }
 *               }
 *       400:
 *         description: Permintaan tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               example: {
 *                  "status": 103,
 *                  "message": "Username atau password salah",
 *                  "data": null
 *               }
 */

membershipRoutes.post('/login', loginValidation, login);

/**
 * @swagger
 * /profile:
 *   get:
 *     tags: [1. Module Membership]
 *     description: <strong>API Profile Private (memerlukan Token untuk mengaksesnya)</strong>
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil Mengambil Data Profile
 *         content:
 *           application/json:
 *             schema:
 *               example: {
 *                   "status": 0,
 *                   "message": "Sukses",
 *                   "data": {
 *                       "email": "arzi@gmail.com",
 *                       "first_name": "arzi",
 *                       "last_name": "rahman",
 *                       "profile_image": "Screenshot 2024-10-16 192326.png"
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

membershipRoutes.get('/profile', auth, profile);

/**
 * @swagger
 * /profile/update:
 *   put:
 *     tags: [1. Module Membership]
 *     description: <strong>API Update Profile Private (memerlukan Token untuk mengaksesnya)</strong>
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: "arzi"
 *               last_name:
 *                 type: string
 *                 example: "rahman"
 *             required:
 *               - first_name
 *               - last_name
 *     responses:
 *       200:
 *         description: Berhasil Update Profile
 *         content:
 *           application/json:
 *             schema:
 *               example: {
 *                   "status": 0,
 *                   "message": "Sukses",
 *                   "data": {
 *                       "email": "arzi@gmail.com",
 *                       "first_name": "arzi",
 *                       "last_name": "rahman",
 *                       "profile_image": "Screenshot 2024-10-16 192326.png"
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

membershipRoutes.put('/profile/update', auth, updateProfileValidation, updateProfile);

/**
 * @swagger
 * /profile/image:
 *   put:
 *     tags: [1. Module Membership]
 *     description: <Strong>API Upload Profile Image Private (memerlukan Token untuk mengaksesnya)</strong>
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *             required:
 *               - file
 *     responses:
 *       200:
 *         description: Berhasil Update Image
 *         content:
 *           application/json:
 *             schema:
 *               example: {
 *                   "status": 0,
 *                   "message": "Sukses",
 *                   "data": {
 *                       "email": "arzi@gmail.com",
 *                       "first_name": "arzi",
 *                       "last_name": "rahman",
 *                       "profile_image": "Screenshot 2024-10-16 192326.png"
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

membershipRoutes.put('/profile/image', auth, file.single('file'), uploadImageValidation, uploadImage);

export default membershipRoutes;
