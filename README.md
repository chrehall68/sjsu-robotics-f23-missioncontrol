# Mission Control Demo
This project consists of a REST API made with an express js server,
a web client made with React and Next.js, and an Arduino client made
with Python. When all components are running, this allows remote
reading of Arduino data as well as remote control of Arduino servos
from the web client.

## Running
There are three components that should be run. Follow the instructions
in terminals that start in the project root directory

First, start up the REST server:
```
cd server
npm start
```
Next, start up the Arduino client
```
cd arduino_client
python3 client.py
```
Finally, start up the web client in dev mode:
```
cd web_client
npm run dev
```


## Message Structure
* ft=json
* structure:
```json
{
    "name":"name",
    "value":"(float value)",
    "timestamp":"timestamp string (secs since epoch)"
}
```

## Valid sensors
Sensors can be accessed via get methods to `http://localhost:2000/api/sensors/(sensorName)`
where `(sensorName)` is the name of the sensor, which should be one of the following:
* `ax` - accel x
* `ay` - accel y
* `az` - accel z
* `gx` - gyro x
* `gy` - gyro y
* `gz` - gyro z
* `servo_pos` - position that the servo is currently set to
* `requested_pos` - position that the servo should be set to