import swaggerJsDoc from 'swagger-jsdoc';
import { APP_URL } from './environment';

const swaggerOptions: swaggerJsDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Contract SIMS PPOB',
      description: 'Documentation for Take Home Test API',
      version: '1.0.0',
    },
    servers: [
      {
        url: APP_URL,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;