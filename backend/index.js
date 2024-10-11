const express = require("express");
const dbConnection = require("./config/connection");
const app = express();
require("dotenv").config();
const { PORT } = process.env;
const cors = require("cors");
const profileRouter = require("./routes/profile");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dbConnection();
app.get("/", (req, res) => {
    res.json({
        error: false,
        message: "Working fine"
    })
})
app.use("/api/v1", profileRouter)

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})