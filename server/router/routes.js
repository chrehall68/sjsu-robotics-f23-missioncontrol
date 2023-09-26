const express = require("express")
const datamanager = require("../datamanager/manager")
const router = express.Router()

// api routes
// head and options are handled w/ get
router.get("/sensors/:sensorID", datamanager.getSensor)
router.post("/sensors", datamanager.addSensor)
router.put("/sensors", datamanager.addSensor)
router.patch("/sensors/:sensorID", datamanager.updateSensor)
router.delete("/sensors/:sensorID", datamanager.deleteSensor)

// for debugging purposes
router.get("/", datamanager.getAllSensors)

module.exports = router