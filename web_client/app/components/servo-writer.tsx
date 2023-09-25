import { useState } from "react";

export default function ServoWriter() {
    const [value, setValue] = useState(0);

    return <div>
        <p>Set servo position to (0-180):</p>
        <input type="text" className="bg-slate-700"
            onKeyDown={(event) => { if (event.key == "Enter") { fetch("http://localhost:2000/api/sensors", { method: "POST", body: JSON.stringify({ "name": "requested_pos", "value": value, "timestamp": new Date().getTime() / 1000 }), headers: { "Content-Type": "application/json" } }) } }}
            value={value}
            onChange={event => { if (!Number.isNaN(Number(event.target.value))) setValue(Number(event.target.value)) }}
        />
    </div>

}