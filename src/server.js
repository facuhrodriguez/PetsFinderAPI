import App from './app.js';
import { config, logger } from './config/config.js';

const app = new App().getApp();

app.listen(config.NODE_ENV.PORT, () => {
  logger.info(`Server listening on port ${config.NODE_ENV.PORT}`);
});
