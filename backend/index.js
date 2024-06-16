const express = require('express');
const app = express();
const port = 5000;
const mongoDB = require("./db");

// Initialize MongoDB connection
mongoDB();

// Middleware to set headers for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api', require("./Routes/CreatUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
