const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("body-parser-xml")(bodyParser);
const entry = require("./routes/entry");
const api = require("./routes/api");
const dataCenter = require("./routes/dataCenter");
const compiler = require("./routes/compiler");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.xml());

const PORT = process.env.PORT || 5000;

app.use("/", entry);
app.use("/api", api);
app.use("/data-center", dataCenter);
app.use("/compiler", compiler);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
