import winston from 'winston';
import 'dotenv/config.js';

const config = {
  NODE_ENV: {
    PORT: process.env.PORT || 3000,
  },
  LOG_CONFIGURATION: {
    transports: [new winston.transports.Console()],
  },
  FIREBASE: {
    projectId: process.env.FIREBASEPROJECTID,
    storageBucket: process.env.FIREBASESTORAGEBUCKET,
  },
};

const logger = winston.createLogger(config.LOG_CONFIGURATION);

export { config, logger };
