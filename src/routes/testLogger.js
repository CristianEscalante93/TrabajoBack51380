const express= require("express");
const { Router } = require("express");
const winston= require("winston");
const testLogger = Router();

testLogger.get('/', (req, res) => {
  req.logger.error("testing logger error");
  req.logger.warn("testing logger warn");
  req.logger.info("testing logger info");
  req.logger.http("testing logger http");
  req.logger.verbose("testing logger verbose");
  req.logger.debug("testing logger debug");

  res.send({ message: "prueba de logger!!!" });
})

module.exports = testLogger;