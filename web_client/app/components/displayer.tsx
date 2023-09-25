import { Key, useEffect, useState } from "react";
import { LineChart, Line, YAxis } from "recharts";
import constants from "./constants";

function Reader(key: Key, update: Number, sensor: string) {
    const [val, setVal] = useState(0)
    const [timestamp, setTimestamp] = useState(0)
    const [stack, setStack] = useState([{ "name": sensor, "timestamp": 0, "value": -1 }]);
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        fetch(`${constants.API_URL}/${sensor}`, { "mode": "cors" }).then(resp => resp.json())
            .then(data => {
                setVal(Number(data.value));
                setTimestamp(Number(data.timestamp));
                if (stack.length > constants.MAXPOINTS) { setStack([...stack.filter((val, index) => index != 0), data]) }
                else { setStack([...stack, data]); }
            })
            .catch((err) => console.log("failed because of ", err))
    }, [update, sensor, stack])

    // if timed out
    if (new Date().getTime() / 1000 - timestamp > constants.TIMEOUT) {
        return <div key={key} className="w-full">
            <p>Sorry, {sensor} is not currently connected.</p>
        </div>
    }
    else {
        return <div key={key} className="my-10 mx-10" onClick={() => setClicked(!clicked)}>
            <p>{sensor}: {val}</p>
            <p className="text-xs">updated at {new Date(timestamp * 1000).toLocaleString()}</p>
            {clicked &&
                <LineChart width={400} height={200} data={stack}>
                    <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
                    <YAxis domain={[-32768, 32768]} scale="linear" />
                </LineChart>
            }
        </div>
    }
}

export default function SensorDisplay() {
    const sensors = ["accel_x", "accel_y", "accel_z", "gyro_x", "gyro_y", "gyro_z"]
    const [update, setUpdate] = useState(0)

    // update sensors every 100 ms
    setInterval(() => setUpdate(update + 1), 100)

    return <div className="flex flex-wrap justify-between w-3/4">
        {sensors.map((element, index) => Reader(index, update, element))}
    </div>
}