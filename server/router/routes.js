const express = require("express")
const datamanager = require("../datamanager/manager")
const router = express.Router()

// api routes
router.get("/sensors/:sensorID", datamanager.getSensor)
router.post("/sensors", datamanager.postSensor)
router.patch("/sensors", datamanager.updateSensor)
router.delete("/sensors", datamanager.deleteSensor)

// for debugging purposes
router.get("/", datamanager.getAllSensors)

module.exports = router