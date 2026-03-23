const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/Doctor");

// SIGNUP
router.post("/signup", async (req, res) => {
    const { name, email, password, clinic, specialization, phone, city } = req.body;

    const existing = await Doctor.findOne({ email });
    if (existing) return res.json({ message: "Doctor already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = new Doctor({
        name,
        email,
        password: hashedPassword,
        clinic,
        specialization,
        phone,
        city
    });

    await doctor.save();

    res.json({ message: "Signup successful" });
});

// LOGIN 🔥
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email });
    if (!doctor) return res.json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) return res.json({ message: "Invalid credentials" });

    const token = jwt.sign(
        { doctorId: doctor._id },
        "secretkey",
        { expiresIn: "1d" }
    );

    res.json({
        message: "Login successful",
        token,
        doctor
    });
});

//profile
router.get("/profile", async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "secretkey");

        const doctor = await Doctor.findById(decoded.doctorId).select("-password");

        res.json(doctor);
    } catch (err) {
        res.status(401).json({ message: "Unauthorized" });
    }
});

module.exports = router;