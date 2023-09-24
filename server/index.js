const express = require("express");
const datarouter = require("./router/routes")
const bodyparser = require("body-parser")

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyparser.json())
app.use("/api/", datarouter)

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});
