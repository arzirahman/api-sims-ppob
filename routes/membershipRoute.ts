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

membershipRoutes.post('/register', registerValidation, register);
membershipRoutes.post('/login', loginValidation, login);
membershipRoutes.get('/profile', auth, profile);
membershipRoutes.put('/profile/update', auth, updateProfileValidation, updateProfile);
membershipRoutes.put('/profile/image', auth, file.single('file'), uploadImageValidation, uploadImage);

export default membershipRoutes;
