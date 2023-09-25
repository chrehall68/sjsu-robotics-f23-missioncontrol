import { useEffect, useState } from "react";
import constants from "./constants";

export default function ServoWriter() {
    const [value, setVal] = useState(0);
    const [timestamp, setTimestamp] = useState(0);
    const [update, setUpdate] = useState(0);

    useEffect(() => {
        fetch(`${constants.API_URL}/servo_pos`, { "mode": "cors" }).then(resp => resp.json()).then(data => { if (update == 0) { setVal(Number(data.value)); } setTimestamp(Number(data.timestamp)) }).catch((err) => console.log("failed because of ", err))
    }, [update]);

    // automatically refresh every second (not as critical as reading sensor data)
    setInterval(() => setUpdate(update + 1), 1000);

    if (new Date().getTime() / 1000 - timestamp > constants.TIMEOUT) {
        return <div className="w-3/4">Sorry, the servo is currently not connected.</div>
    }
    else {
        return <div>
            <p>Set servo position to (0-180):</p>
            <input type="text" className="bg-slate-700"
                onKeyDown={(event) => { if (event.key == "Enter") { fetch("http://localhost:2000/api/sensors", { method: "POST", body: JSON.stringify({ "name": "requested_pos", "value": value, "timestamp": new Date().getTime() / 1000 }), headers: { "Content-Type": "application/json" } }) } }}
                value={value}
                onChange={event => { if (!Number.isNaN(Number(event.target.value))) setVal(Number(event.target.value)) }}
            />
        </div>
    }
}