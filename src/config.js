import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT || 8080,
  DB_URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  // Persistence
  PERSISTENCE: process.env.PERSISTENCE,
  // ! Esto cambiarlo por commander
  // GitHub App
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackUrl: process.env.CALLBACK_URL,
  // Admin Account
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
};

export default config;
