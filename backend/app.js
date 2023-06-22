const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/tasks");

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://denizdemirbilek:adessoTurkey@cluster0.v578l5s.mongodb.net/mean-task?retryWrites=true&w=majority",
    // "mongodb+srv://denizdemirbilek:adessoTurkey@cluster0.v578l5s.mongodb.net/mean-task" +
    //   process.env.MONGO_ATLAS_PW +
    //   "@cluster0.v578l5s.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log("Error connecting to db");
  });

// Configure body-parser
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});

// Define routes
app.use("/api/tasks", taskRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
