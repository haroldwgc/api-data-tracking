const express = require("express");
const router = express.Router();
const trackingController = require("../controllers/TrackingController");
const Tracking = require("../models/Tracking");

//obtener clientes
module.exports = function () {
  //post : /tracking
  router.post("/tracking", trackingController.add);
  //get: /tracking
  router.get("/tracking", trackingController.list);
  return router;
};
