const express = require("express");
const port = process.env.PORT || 5000;
const cors = require("cors");

const app = express();
app.use(cors());
app.use('/daftarbahan', require('./routes/daftarbahan'));
app.listen(port, () => console.log("Backend server live on  " + port));