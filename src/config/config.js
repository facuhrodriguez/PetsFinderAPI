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
    google_creds: process.env.GOOGLE_CREDS ? JSON.parse(process.env.GOOGLE_CREDS) : {},
  },
};

const logger = winston.createLogger(config.LOG_CONFIGURATION);

export { config, logger };
