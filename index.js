const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const workoutRoutes = require("./routes/workoutRoutes");
const userRoutes = require("./routes/userRoutes");
const trainerRoutes = require("./routes/trainerRoutes");

const app = express();

// middleware
app.use(express.json());

// MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("MongoDB Error:", err));

// Routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/users", userRoutes);
app.use("/api/trainers", trainerRoutes);

// Root test route
app.get("/", (req, res) => {
    res.send("Gym Management Backend Running");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
