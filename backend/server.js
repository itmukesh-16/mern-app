
require("dotenv").config(); // make sure to include at the top 

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express(); // initialize the application

app.use(cors());
app.use(express.json());

app.use("/api/notes", require("./routes/notes")); // from step 3 


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"));

app.get("/", (req, res) => {
  res.send("API running");
});

app.listen(5000, () => console.log("Server started on port 5000"));
