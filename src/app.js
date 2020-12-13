const express = require("express");
const db = require("./db");
const app = express();
const router = require("./routes/index");

require("dotenv").config();
const PORT = process.env.PORT;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api", router);

app.listen(PORT, () => {
    console.log(`Server up on port ${PORT}`);
});
