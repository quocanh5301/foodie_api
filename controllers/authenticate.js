const db = require('../data/db');
const jwtHelper = require('../utils/jwt_helper');
const bcrypt = require('bcrypt');

async function logIn(req, res) {
    try {
        //! qa 29/11
        const { email, password } = req.body;
        const rows = await db.query('SELECT * FROM account WHERE user_email = $1', [email]);
        if (rows.length === 0) return res.status(401).json({ mess: "Email is incorrect", code: 401 });
        //PASSWORD CHECK
        const validPassword = await bcrypt.compare(password, rows[0].user_password);
        if (!validPassword) return res.status(401).json({ mess: "Incorrect password", code: 401 });
        //JWT
        const loggedInRows = await db.query('SELECT * FROM account_login_status WHERE user_email = $1', [email]);
        let tokens = jwtHelper.jwtTokens(rows[0]);//Gets access and refresh tokens
        if (loggedInRows.length === 0) {
            await db.query("INSERT INTO account_login_status (user_email, session_token) VALUES ($1, $2);", [email, tokens.accessToken]);
        } else {
            await db.query("UPDATE account_login_status SET session_token = $1 WHERE user_email = $2;", [tokens.accessToken, email]);
        }
        res.json({mess: "success", data: tokens, code: 200 });
    } catch (error) {
        res.status(401).json({ mess: error.message, code: 401 });
    }
}

async function refreshToken(req, res) {
    try {
        const userId = req.body.userId;
        const refreshToken = req.body.refreshToken; //Bearer TOKEN
        if (refreshToken === null) return res.sendStatus(401);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (error, user)  => {
            if (error) return res.status(403).json({ mess: error.message });
            let tokens = jwtHelper.jwtTokens(user);
            await db.query("UPDATE account_login_status SET session_token = $1 WHERE account_id = $2;", [tokens.accessToken, userId]);
            return res.status(200).json({data: tokens, mess: "success", code: 200});
        });
    } catch (error) {
        res.status(401).json({ mess: error.message , code: 401});
    }
}

async function logOut(req, res) {
    try {
        const email = req.body.email;
        const accessToken = req.body.accessToken;
        if (accessToken === null) return res.sendStatus(401);
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (error, user)  => {
            if (error) return res.status(403).json({ mess: error.message });
            // let tokens = jwtHelper.jwtTokens(user);
            await db.query("DELETE FROM account_login_status WHERE session_token = $1 and user_email = $2", [tokens.accessToken, email]);
            return res.status(200).json({mess: "success", code: 200});
        });
    } catch (error) {
        res.status(401).json({ mess: error.message, code: 401 });
    }
}

module.exports = {
    logIn: logIn,
    logOut: logOut,
    refreshToken: refreshToken
}