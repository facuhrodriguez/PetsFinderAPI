import { transports, format, createLogger } from 'winston';
import 'dotenv/config.js';

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

const config = {
  NODE_ENV: {
    PORT: process.env.PORT || 3000,
  },
  LOG_CONFIGURATION: {
    transports: [new transports.Console()],
    format: format.combine(format.timestamp(), format.json()),
    levels: logLevels,
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
  EMAIL: {
    host: process.env.EMAILHOST ? process.env.EMAILHOST : 'smtp.gmail.com',
    port: process.env.EMAILPORT ? +process.env.EMAILPORT : 465,
    secure: true,
    from: process.env.EMAILFROM ? process.env.EMAILFROM : 'mascotapp@gmail.com',
    auth: {
      user: process.env.EMAILUSER,
      pass: process.env.EMAILPASS,
    },
  },
};

const logger = createLogger(config.LOG_CONFIGURATION);

export { config, logger };
