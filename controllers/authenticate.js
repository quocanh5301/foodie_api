const db = require('../data/db');
const jwtHelper = require('../utils/jwt_helper');
const firebase = require('../utils/firebase');

const bcrypt = require('bcrypt');

async function logIn(req, res) {
    try {
        //! qa 29/11
        const { email, password } = req.body;
        const rows = await db.query('SELECT * FROM account WHERE user_email = $1', [email]);
        if (rows.length === 0) return res.status(401).json({ "mess": "Email is incorrect", "code": 401 });
        //PASSWORD CHECK
        const validPassword = await bcrypt.compare(password, rows[0].user_password);
        if (!validPassword) return res.status(401).json({ "mess": "Incorrect password", "code": 401 });
        //JWT
        console.log(rows[0].join_since.getTime());
        console.log(rows[0].password);

        let tokens = jwtHelper.jwtTokens(rows[0]);//Gets access and refresh tokens
        res.json({ ...tokens, "code": 200 });
    } catch (error) {
        res.status(401).json({ "mess": error.message, "code": 401 });
    }
}

async function refreshToken(req, res) {
    try {
        const refreshToken = req.body.refreshToken; //Bearer TOKEN
        console.log(refreshToken);
        if (refreshToken === null) return res.sendStatus(401);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
            if (error) return res.status(403).json({ error: error.message });
            let tokens = jwtHelper.jwtTokens(user);
            return res.json(tokens);
        });
    } catch (error) {
        res.status(401).json({ mess: error.message });
    }
}

module.exports = {
    logIn: logIn,
    refreshToken: refreshToken
}