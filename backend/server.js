require("dotenv").config();
const express = require("express");
const cors = require("cors");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;
const authRoutes = require("./routes/authRoutes");

mongoose.connect(MONGO_URL)
 .then(() => {
    console.log("MongoDB connected");
 })
 .catch((err) => {
    console.log(err);
 });


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", doctorRoutes);
app.use("/api", appointmentRoutes);
app.use("/api", authRoutes);
app.use("/api", require("./routes/authRoutes"));

app.get("/", (req, res) => {
    res.send("backend running");
});

app.listen(5000, () => {
    console.log("Server started on port 5000");
});

