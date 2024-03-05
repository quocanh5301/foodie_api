const db = require('../data/db'); 
const mailer = require('../utils/nodemailer_helper'); 
const dateTime = require('../utils/date_time'); 
const bcrypt = require('bcrypt');
const date_time = require('../utils/date_time');

async function registerAccount(req, res){
    try {
        const queryStr = "select user_name from account where user_email = $1"
        const rows = await db.query(queryStr, [req.body.email]);
        if(rows.length != 0) return res.status(200).json({mess: "Email already exist",  code : 200});
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const queryStr2 = "insert into register_account (user_name, user_email, user_password) values ($1, $2, $3)"
        await db.query(queryStr2, [req.body.name, req.body.email, hashedPassword]);
        await mailer.sendVerificationEmail(req.body.email, "http://localhost:3000/register/confirmRegistration?email=" + req.body.email);
        res.status(200).json({mess: "Check your email",  code : 200});
    } catch (error) {
        console.log(error)
        res.status(401).json({mess: error + "\nPlease contact a@gmail.com to report",  code : 401});
    }
}

async function confirmEmail(req, res){
    try {
    const emailConfirm = req.query.email;
    const queryStr = "select * from register_account where user_email = $1"
    const rows = await db.query(queryStr, [emailConfirm]);

    const queryStr2 = "insert into account (user_name, user_email, user_password, update_at, join_at) values ($1, $2, $3, $4, $5)"
    await db.query(queryStr2, [rows[0].user_name, emailConfirm, rows[0].user_password, dateTime.currentDateDMY(), dateTime.currentDateDMY()]);

    const queryStr3 = "delete from register_account where user_email = $1"
    await db.query(queryStr3, [emailConfirm]);

    res.status(200).json({mess: "Email verified, account created",  code : 200});
    } catch (error) {
        res.status(401).json({mess: error + "\nPlease contact a@gmail.com to report",  code : 401});
    }
}

module.exports = {
    registerAccount : registerAccount, 
    confirmEmail : confirmEmail
}