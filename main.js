const express = require("express");
const cookieParser =  require("cookie-parser");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));

const manganimeRoutes = require('./routes/manga');
const userRoutes = require('./routes/user');
const registerRoutes = require('./routes/register');
const authenticateRoutes = require('./routes/authenticate');

// app.use('/manganime', authenticateToken, manganimeRoutes);

app.use('/user', 
// authenticateToken,
 userRoutes);

app.use('/register', registerRoutes);
app.use('/authenticate', authenticateRoutes);
app.listen(3000);


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']; //Bearer TOKEN
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).json({error:"Null token"});
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
      if (error) return res.status(403).json({error : error.message});
      req.user = user;
      next();
    });
  }
