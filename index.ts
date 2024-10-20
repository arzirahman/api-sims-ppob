import app from './app';
import { APP_PORT } from './configs/environment';

app.listen(APP_PORT, () => {
  console.log(`Local Server http://localhost:${APP_PORT}`);
});