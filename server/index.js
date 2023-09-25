const express = require("express");
const datarouter = require("./router/routes")
const bodyparser = require("body-parser")
const cors = require("cors")

const app = express();
const PORT = process.env.PORT || 2000;

// allow cors from the server
allowedOrigins = ["http://localhost:3000"]
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg =
                "The CORS policy for this site does not " +
                "allow access from the specified Origin.";
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}))

app.use(bodyparser.json())
app.use("/api/", datarouter)

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});
