const express = require("express");
const app = express();

// paser
app.use(express.json());

// middle-ware
app.use("/",require("./router/main"));

// server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));