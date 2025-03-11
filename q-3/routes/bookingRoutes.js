const express = require("express");
const Booking = require("../models/Booking");
const { authMiddleware, adminMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
    const booking = new Booking({ ...req.body, userId: req.user.id });
    await booking.save();
    res.status(201).json(booking);
});

router.get("/", authMiddleware, async (req, res) => {
    const bookings = await Booking.find({ userId: req.user.id });
    res.json(bookings);
});

router.put("/:id", authMiddleware, async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    if (!booking || booking.userId.toString() !== req.user.id) return res.status(403).json({ message: "Not authorized" });

    Object.assign(booking, req.body);
    await booking.save();
    res.json(booking);
});

router.delete("/:id", authMiddleware, async (req, res) => {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted" });
});

router.get("/all", authMiddleware, adminMiddleware, async (req, res) => {
    const bookings = await Booking.find();
    res.json(bookings);
});

module.exports = router;
