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
  FACEBOOK: {
    oauthUrl: 'https://www.facebook.com/v14.0/dialog/oauth',
    tokenUrl: 'https://graph.facebook.com/v14.0/oauth/access_token',
    graphAPI: 'https://graph.facebook.com/',
    client_id: process.env.FACEBOOKID,
    secret: process.env.FACEBOOKSECRET,
    redirect_uri: process.env.FACEBOOKREDIRECT,
    scopes: ['email', 'public_profile'],
  },
};

const logger = winston.createLogger(config.LOG_CONFIGURATION);

export { config, logger };
