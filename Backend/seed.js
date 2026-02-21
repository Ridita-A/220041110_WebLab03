require("dotenv").config();

const mongoose = require("mongoose");
const User = require("./models/userModel");
const Trainer = require("./models/trainerModel");
const Workout = require("./models/workoutModel");

// Sample Users
const users = [
    { name: "Ridita Alam", email: "ra@gmail.com", age: 22, membershipType: "premium"},
    { name: "Anjim Alam", email: "aa@gmail.com", age: 31, membershipType: "elite"},
    { name: "Mahim Alam", email: "ma@gmail.com", age: 26, membershipType: "basic"},
    { name: "Saba Alam", email: "sa@gmail.com", age: 20, membershipType: "premium"},
    { name: "Sadman Alam", email: "sad@gmail.com", age: 29, membershipType: "elite"},
];

// Sample Trainers
const trainers = [
    {
        name: "Alam Ridita",
        email: "ar@gmail.com",
        specialization: ["strength", "cardio"],
        experienceYears: 5,
        hourlyRate: 25 
    },
    {
        name: "Alam Anijm",
        email: "aa@gmail.com",
        specialization: ["yoga", "pilates"],
        experienceYears: 3,
        hourlyRate: 20
    },
    {
        name: "Alam Mahim",
        email: "am@gmail.com",
        specialization: ["cross-fit"],
        experienceYears: 4,
        hourlyRate: 30,
        available: false
    },
    {
        name: "Alam Saba",
        email: "as@gmail.com",
        specialization: ["yoga", "pilates"],
        experienceYears: 2,
        hourlyRate: 18
    },
    {
        name: "Alam Sadman",
        email: "das@gmail.com",
        specialization: ["strength"],
        experienceYears: 6,
        hourlyRate: 35
    },
];


const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for seeding");

    await User.deleteMany();
    await Trainer.deleteMany();
    await Workout.deleteMany();

    const createdUsers = await User.insertMany(users);
    const createdTrainers = await Trainer.insertMany(trainers);

    // Sample Workouts
    const workouts = [
      {
        workoutType: "Strength Training",
        load: 50,
        reps: 10,
        difficulty: "medium",
        user: createdUsers[0]._id, 
        trainer: createdTrainers[0]._id, 
        scheduledAt: new Date(Date.now() + 86400000), 
        status: "scheduled",
        notes: "Focus on upper body"
      },
      {
        workoutType: "Yoga Session",
        load: 0,
        reps: 1,
        difficulty: "easy",
        user: createdUsers[1]._id, 
        trainer: createdTrainers[1]._id, 
        scheduledAt: new Date(Date.now() - 86400000), 
        status: "completed",
        notes: "Morning session"
      },
      {
        workoutType: "Cardio Blast",
        load: 0,
        reps: 30,
        difficulty: "hard",
        user: createdUsers[3]._id, 
        trainer: createdTrainers[3]._id, 
        scheduledAt: new Date(Date.now() + 172800000), 
        status: "scheduled",
        notes: "High intensity"
      }
    ];

    await Workout.insertMany(workouts);

    console.log("Sample Data Inserted Successfully");
    process.exit();
  } catch (err) {
    console.error("Seeding Error:", err);
    process.exit(1);
  }
};

seedData();
