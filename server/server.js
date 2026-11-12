const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.get("/", (req, res) => res.send("Signup API is running"));
app.use("/api/auth", authRoutes);

async function startServer() {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI is missing. Create a .env file.");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
  } catch (error) {
    console.error("Server startup error:", error.message);
    process.exit(1);
  }
}
startServer();
