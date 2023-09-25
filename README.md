# Mission Control Demo

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
* `ax` - accel x
* `ay` - accel y
* `az` - accel z
* `gx` - gyro x
* `gy` - gyro y
* `gz` - gyro z
* `servo pos` - position that the servo is currently set to
* `requested pos` - position that the servo should be set to