import serial
import requests
import re
import argparse
from datetime import datetime

parser = argparse.ArgumentParser()
parser.add_argument(
    "-device",
    type=str,
    help="The serial device to open",
    default="/dev/ttyUSB0",
    required=False,
)
parser.add_argument(
    "-baudrate",
    type=int,
    help="Baudrate of the serial device",
    default=9600,
    required=False,
)
parser.add_argument(
    "-port",
    type=str,
    help="The port where the rest api is",
    default="2000",
    required=False,
)
parser.add_argument(
    "-v",
    type=bool,
    help="Whether or not to be verbose (print messages to the console)",
    required=False,
    default=True,
)
args = parser.parse_args()

FORMAT = ["accel_x", "accel_y", "accel_z", "gyro_x", "gyro_y", "gyro_z", "servo_pos"]
REQUESTED_POS = "requested_pos"

if __name__ == "__main__":
    print("Sending data.")
    destination = "http://localhost:" + args.port + "/api/sensors/"
    com = serial.Serial(args.device, baudrate=args.baudrate)

    # previous requested servo pos
    prev_pos = 0

    # initialize the sensors
    for sensor in FORMAT:
        raw_data = {
            "name": sensor,
            "value": -1,
            "timestamp": datetime.now().timestamp(),
        }
        resp = requests.post(destination, json=raw_data)

    while 1:
        try:
            line = str(com.readline())

            if len(re.findall("accel", line)) == 0:
                continue
            numbers = [float(s) for s in re.findall("(-?\d+.?\d+?)", line)]
            for pair in zip(FORMAT, numbers):
                raw_data = {
                    "name": pair[0],
                    "value": pair[1],
                    "timestamp": datetime.now().timestamp(),
                }
                resp = requests.patch(destination + pair[0], json=raw_data)

            resp = requests.get(destination + REQUESTED_POS)
            if resp.status_code == 404:
                pass
            else:
                pos = int(resp.json()["value"])
                if pos != prev_pos:
                    com.write(bytes(str(pos) + "\n", encoding="utf8"))
                    if args.v:
                        print(
                            f"got request to move servo to {pos}"
                        )  # log message request
                    prev_pos = pos
        except KeyboardInterrupt:
            print("Requested to stop...")
            break

        except requests.exceptions.ConnectionError:
            print("ERROR: Resource not found!")
            break

    com.close()
    print("done.")
