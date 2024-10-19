import { Router } from 'express';
import { banner, services } from '../controllers/informationController';

const informationRoutes = Router();

informationRoutes.get('/banner', banner);
informationRoutes.get('/services', services);

export default informationRoutes;
