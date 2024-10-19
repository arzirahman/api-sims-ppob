import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const PORT = process.env.APP_PORT ?? 4000;

app.listen(PORT, () => {
  console.log(`Local Server http://localhost:${PORT}`);
});