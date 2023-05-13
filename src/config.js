import dotenv from "dotenv";
dotenv.config();

const config = {
    PORT: process.env.PORT || 8080,
    DB_URL: process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    // GitHub App
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackUrl: process.env.CALLBACK_URL,
};

export default config;