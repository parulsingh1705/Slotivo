const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const authMiddleware = require("../middleware/authMiddleware");


// 👉 CREATE APPOINTMENT
router.post("/appointment", authMiddleware, async (req, res) => {
    try {
        const { date, time, patientName, phone } = req.body;

        // 🔥 doctorId token से आएगा
        const doctorId = req.doctorId;

        console.log("Doctor ID from token:", doctorId);

        // 🔥 slot check
        const existing = await Appointment.findOne({
            doctorId,
            date,
            time
        });

        if (existing) {
            return res.json({ message: "Slot already booked" });
        }

        // 🔥 appointment create
        const appointment = new Appointment({
            doctorId,
            patientName,
            phone,
            date,
            time,
            status: "booked"
        });

        await appointment.save();

        res.json({ message: "Appointment booked", appointment });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error booking appointment" });
    }
});


// 👉 GET ALL APPOINTMENTS (IMPORTANT FIX)
router.get("/appointments", async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments || []); // 🔥 FIX
    } catch (err) {
        res.json([]);
    }
});


// 👉 DOCTOR APPOINTMENTS (TOKEN BASED)
router.get("/appointments/doctor", authMiddleware, async (req, res) => {
    try {
        const appointments = await Appointment.find({
            doctorId: req.doctorId,
        });

        res.json(appointments || []);
    } catch (err) {
        res.json([]);
    }
});


// 👉 TODAY APPOINTMENTS
router.get("/appointments/today", authMiddleware, async (req, res) => {
    const today = new Date().toISOString().split("T")[0];

    const appointments = await Appointment.find({
        doctorId: req.doctorId,
        date: today,
    });

    res.json(appointments || []);
});


// 👉 UPCOMING
router.get("/appointments/upcoming", authMiddleware, async (req, res) => {
    const today = new Date().toISOString().split("T")[0];

    const appointments = await Appointment.find({
        doctorId: req.doctorId,
        date: { $gt: today },
    });

    res.json(appointments || []);
});


// ❌ BUG FIXED HERE
router.put("/appointments/cancel/:id", async (req, res) => {
    const appointment = await Appointment.findByIdAndUpdate(
        req.params.id,   // ❌ re.params.id -> FIXED
        { status: "cancelled" },
        { new: true }
    );

    res.json(appointment);
});


// 👉 COMPLETE
router.put("/appointment/complete/:id", async (req, res) => {
    const appointment = await Appointment.findByIdAndUpdate(
        req.params.id,
        { status: "completed" }, // 🔥 FIX (consistent naming)
        { new: true }
    );

    res.json(appointment);
});


// 👉 STATS
router.get("/doctor/stats", authMiddleware, async (req, res) => {
    const doctorId = req.doctorId;

    const totalAppointments = await Appointment.countDocuments({ doctorId });
    const completed = await Appointment.countDocuments({
        doctorId,
        status: "completed",
    });
    const cancelled = await Appointment.countDocuments({
        doctorId,
        status: "cancelled",
    });

    res.json({ totalAppointments, completed, cancelled });
});


// 👉 HISTORY
router.get("/appointments/history", authMiddleware, async (req, res) => {
    const today = new Date().toISOString().split("T")[0];

    const appointments = await Appointment.find({
        doctorId: req.doctorId,
        date: { $lt: today },
    });

    res.json(appointments || []);
});


// ❌ BUG FIXED HERE (Appointments → Appointment)
router.get("/appointments/page", authMiddleware, async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;

    const appointments = await Appointment.find({
        doctorId: req.doctorId,
    })
        .skip((page - 1) * limit)
        .limit(limit);

    res.json(appointments || []);
});


// 👉 UPDATE STATUS (GENERIC)
router.put("/appointment/:id", async (req, res) => {
    const { status } = req.body;

    const updated = await Appointment.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
    );

    res.json(updated);
});

router.get("/appointments/doctor", authMiddleware, async (req, res) => {
    try {
        console.log("Doctor ID:", req.doctorId);

        const appointments = await Appointment.find({
            doctorId: req.doctorId
        });

        console.log("Appointments Found:", appointments);

        res.json(appointments);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching appointments" });
    }
});

module.exports = router;