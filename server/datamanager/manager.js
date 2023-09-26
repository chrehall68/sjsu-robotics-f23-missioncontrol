/**
 * We need to be able to get and display sensor data
 * specifically from an IMU.
 * We also need to be able to see current servo position
 * and update the offset
 */

// stores name, value, timestamp (in ms since epoch)
var sensors = []

// post and put
const addSensor = (req, res) => {
    const { body } = req
    temp = sensors.find((val) => val.name === body.name)
    if (temp === undefined && body.name !== undefined) {
        sensors.push({ "name": body.name, "value": body.value, "timestamp": body.timestamp })
    }
    else {
        temp.value = body.value
        temp.timestamp = body.timestamp
    }
    res.send(`You added a sensor ${body.name}`)
}

// patch
const updateSensor = (req, res) => {
    const { sensorID } = req.params
    if (sensorID !== req.body.name) {
        res.status(400); // invalid request
        return;
    }

    temp = sensors.find((val) => val.name === sensorID)
    temp.value = req.body.value
    temp.timestamp = req.body.timestamp
    res.send(`Updated sensor ${req.body.name}`)
}

// get
const getSensor = (req, res) => {
    const { sensorID } = req.params
    temp = sensors.find((val) => val.name === sensorID)
    if (temp === undefined) {
        res.status(404).send({ name: sensorID, value: -1, timestamp: 0 })
    }
    else {
        res.send(temp)
    }
}
const getAllSensors = (req, res) => {
    let ret = ""
    sensors.forEach(element => {
        ret += element.name + ": " + element.value + " - updated at " + element.timestamp
        ret += "\n"
    });
    res.send(ret)
}

// delete
const deleteSensor = (req, res) => {
    const { sensorID } = req.params
    const index = sensors.findIndex((val) => val.name === sensorID)
    if (index != -1) {
        sensors.splice(index, 1)  // remove that element
        res.send("deleted")
    }
    else {
        res.send("didn't delete since not found")
    }
}

module.exports = {
    addSensor,
    updateSensor,
    getSensor,
    deleteSensor,
    getAllSensors,
}