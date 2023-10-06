require('dotenv').config()

exports.environment = {
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    DATABASE: process.env.DATABASE,
    JWT_SECRET: process.env.JWT_SECRET,
    MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
    SECRET: process.env.SECRET,
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URI_PROD: process.env.DATABASE_URI_PROD,
    DATABASE_URI_DEVELOP: process.env.DATABASE_URI_DEVELOP,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    SENDGRID_EMAIL_FROM: process.env.SENDGRID_EMAIL_FROM
}