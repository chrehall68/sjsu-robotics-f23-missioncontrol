import { Key, useEffect, useState } from "react";
import TIMEOUT from "./constants";

function Reader(key: Key, update: Number, sensor: string) {
    const [val, setVal] = useState(0)
    const [timestamp, setTimestamp] = useState(0)

    useEffect(() => {
        fetch(`http://localhost:2000/api/sensors/${sensor}`, { "mode": "cors" }).then(resp => resp.json()).then(data => { setVal(Number(data.value)); setTimestamp(Number(data.timestamp)) }).catch((err) => console.log("failed because of ", err))
    }, [update])

    // if timed out
    if (new Date().getTime() / 1000 - timestamp > TIMEOUT) {
        return <div key={key}>
            <p>Sorry, {sensor} is not currently connected.</p>
        </div>
    }
    else {
        return <div key={key}>
            <p>{sensor} value is currently {val}, last updated at {new Date(timestamp * 1000).toLocaleString()}</p>
        </div>
    }
}

export default function SensorDisplay() {
    const sensors = ["ax", "ay", "az", "gx", "gy", "gz"]
    const [update, setUpdate] = useState(0)

    // update sensors every 100 ms
    setInterval(() => setUpdate(update + 1), 100)

    return <div>
        {sensors.map((element, index) => Reader(index, update, element))}
    </div>
}