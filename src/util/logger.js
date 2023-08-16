const winston= require("winston");
require('dotenv').config();


/* req.logger.info(
    `${req.method} on ${req.url} - ${new Date().toLocaleTimeString()}`
  ); */

  const devLogger= winston.createLogger({
    transports: [
      new winston.transports.Console({
        level: "debug",
        format: winston.format.colorize({ all: true }),
      }),
      new winston.transports.File({
        filename: "./errors.log",
        level: "error",
        format: winston.format.simple(),
      }),
    ],
  });

  const prodLogger= winston.createLogger({
    transports: [
      new winston.transports.Console({
        level: "info",
        format: winston.format.colorize({ all: true }),
      }),
      new winston.transports.File({
        filename: "./errors.log",
        level: "error",
        format: winston.format.simple(),
      }),
    ],
  });

const addLogger = (req, res, next) => {
    const enviroment = process.env.NODE_ENV || 'development'
    if (enviroment === 'production'){
      req.logger = prodLogger;
    }else{
      req.logger= devLogger;
    }
    next();
  };

  module.exports = {addLogger};