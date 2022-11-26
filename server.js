// Load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// Import dependencies
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDb = require("./config/connectToDb");
const propsController = require("./controllers/propsController");
const usersController = require("./controllers/usersController");
const adminController = require("./controllers/adminController");
const requireAuth = require("./middleware/requireAuth");

// Create an express app
const app = express();

// Configure express app
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "*", // Allow requests from any origin
}));

// Connect to database
connectToDb();

// Routing
app.post('/signup', usersController.signup);
app.post('/login', usersController.login);
app.get('/logout', usersController.logout);
app.get('/check-auth', requireAuth, usersController.checkAuth);
app.get('/user', requireAuth, usersController.fetchUser);
app.get('/allUsers', requireAuth, adminController.fetchAllUsers);
app.get('/admin', requireAuth, usersController.fetchUser);
app.get("/props", requireAuth, propsController.fetchProps);
app.get("/props/:id", requireAuth, propsController.fetchProp);
app.post("/props", requireAuth, propsController.createProp);
app.put("/props/:id", requireAuth, propsController.updateProp);
app.delete("/props/:id", requireAuth, propsController.deleteProp);

// Start our server
app.listen(process.env.PORT); 
console.log(`Server listening on port ${process.env.PORT}`);

