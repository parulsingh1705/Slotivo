const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Doctor = require("../models/Doctor");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/doctor", async(req, res) => {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.json(doctor);
});

router.get("/doctors", async(req, res) => {
    const doctors = await Doctor.find();
    res.json(doctors);
});

router.put("/doctor/:id", async(req, res) => {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.json(doctor);
});

router.delete("/doctor/:id", async(req, res) => {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({message: "Doctor deleted"});
});

//signup route
router.post("/doctor/signup", async(req, res) => {
    const {name, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const doctor = new Doctor({
        name,
        email,
        password : hashedPassword
    });
    await doctor.save();
    res.json({message : "Doctor registered"});
});

//login route
router.post("/doctor/login", async(req, res) => {
    const {email, password} = req.body;
    const doctor = await Doctor.findOne({email});

    if(!doctor){
        return res.json({message : "Doctor not found"});
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if(!isMatch){
        return res.json({message : "Invalid password"});
    }

    const token = jwt.sign(
        {doctorId : doctor._id},
        "secretkey"
    );

    res.json({message : "Login successful", token});
});

//doctor profile
router.get("/doctor/profile", authMiddleware, async(req, res) => {
    const doctor = await Doctor.findById(req.doctorId).select("-password");
    res.json(doctor);
});

router.get("/doctor/:id", async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ message: "Error fetching doctor" });
    }
});


module.exports = router;