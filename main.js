const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const db = require('./data/db');

const app = express();
dotenv.config();

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const recipeRoutes = require('./routes/recipe');
const userRoutes = require('./routes/user');
const registerRoutes = require('./routes/register');
const authenticateRoutes = require('./routes/authenticate');

app.use('/user',
  authenticateToken,
  userRoutes);

app.use('/recipe',
  authenticateToken,
  recipeRoutes);

app.use('/register', registerRoutes);
app.use('/authenticate', authenticateRoutes);
app.listen(3000);


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']; //Bearer TOKEN
  const accessToken = authHeader && authHeader.split(' ')[1];

  if (accessToken == null) return res.status(401).json({ mess: "Null token", code: 401 });
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (error, user) => {
    if (error) {
      return res.status(401).json({ mess: error.message, code: 401 });
    }
    const userQuery = "SELECT session_token FROM account_login_status WHERE user_email = $1";
    const userResult = await db.query(userQuery, [user.user_email]);
    if (userResult.length === 0) {
      return res.status(401).json({ mess: "Token is not valid", code: 401 });
    }
    if (userResult[0].session_token != accessToken) {
      return res.status(401).json({ mess: "Token is not valid", code: 401 });
    }
    req.user = user;
    next();
  });
}
