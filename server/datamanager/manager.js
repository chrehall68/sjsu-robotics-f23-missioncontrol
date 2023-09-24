/**
 * We need to be able to get and display sensor data
 * specifically from an IMU.
 * We also need to be able to see current servo position
 * and update the offset
 */
const express = require("express")


// stores name, value, timestamp (in ms since epoch)
var sensors = []

// post
const postSensor = (req, res) => {
    const { body } = req
    temp = sensors.find((val) => val.name == body.name)
    if (temp === undefined) {
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
    const { body } = req
    temp = sensors.find((val) => val.name == body.name)
    temp.value = body.value
    temp.timestamp = body.timestamp
    res.send(`Updated sensor ${body.name}`)
}

// get
const getSensor = (req, res) => {
    temp = sensors.find((val) => val.name == req.body.name)
    if (temp === undefined) {
        res.status(404).send({ name: body.name, value: -1, timestamp: 0 })
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
    const index = sensors.findIndex((val) => val.name == req.body.name)
    if (index != -1) {
        sensors.splice(index, 1)  // remove that element
        res.send("deleted")
    }
    else {
        res.send("didn't delete since not found")
    }
}

module.exports = {
    postSensor,
    updateSensor,
    getSensor,
    deleteSensor,
    getAllSensors,
}