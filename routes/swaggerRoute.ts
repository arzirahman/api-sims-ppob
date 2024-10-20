import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from '../configs/swagger';

const swaggerRoutes = Router();

/**
 * @swagger
 * tags:
 *   - name: 1. Module Membership
 *   - name: 2. Module Information
 *   - name: 3. Module Transaction
 * 
 * x-tagGroups:
 *   - name: Modules
 *     tags:
 *       - 1. Module Membership
 *       - 2. Module Information
 *       - 3. Module Transaction
 */

swaggerRoutes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default swaggerRoutes;