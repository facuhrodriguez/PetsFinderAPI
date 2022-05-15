import winston from 'winston';

const config = {
  NODE_ENV: {
    PORT: process.env.PORT || 3000,
  },
  LOG_CONFIGURATION: {
    transports: [new winston.transports.Console()],
  },
};

const logger = winston.createLogger(config.LOG_CONFIGURATION);

export { config, logger };
