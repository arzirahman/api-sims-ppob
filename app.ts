import express from 'express';
import { json } from 'body-parser';
import { exception } from './middlewares/exception';
import { auth } from './middlewares/auth';

import membershipRoutes from './routes/membershipRoute';
import informationRoutes from './routes/informationRoute';
import transactionRoutes from './routes/transactionRoute';
import swaggerRoutes from './routes/swaggerRoute';

const app = express();

app.use(swaggerRoutes);

app.use(json());

app.use(membershipRoutes);

app.use(auth);
app.use(informationRoutes);
app.use(transactionRoutes);

app.use(exception)

export default app;