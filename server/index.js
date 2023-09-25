const express = require("express");
const datarouter = require("./router/routes")
const bodyparser = require("body-parser")
const cors = require("cors")

const app = express();
const PORT = process.env.PORT || 2000;

// allow cors from the server
app.use(cors({
    origin: function (origin, callback) {
        return callback(null, true);
    }
}))

app.use(bodyparser.json())
app.use("/api/", datarouter)

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});
