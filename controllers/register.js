const db = require('../data/db'); 
const mailer = require('../utils/nodemailer_helper'); 
const dateTime = require('../utils/date_time'); 
const bcrypt = require('bcrypt');

async function registerAccount(req, res, next){
    try {
        const deleteQueryStr = "delete from register_account where user_email = $1"
        await db.query(deleteQueryStr, [req.body.email])
        const queryStr = "select user_name from account where user_email = $1"
        const rows = await db.query(queryStr, [req.body.email]);
        if(rows.length != 0) return res.status(200).json({"mess": "Email already exist",  "code" : 200});
        const queryStr2 = "insert into register_account (user_name, user_email, user_password, join_since) values ($1, $2, $3, $4)"
        await db.query(queryStr2, [req.body.name, req.body.email, (req.body.password).toString(), req.body.date]);
        mailer.sendVerificationEmail(req.body.email, "http://localhost:3000/register/confirmEmail?email=" + req.body.email);
        res.status(200).json({"mess": "Check your email",  "code" : 200});
    } catch (error) {
        console.log(error)
        res.status(401).json({"mess": error + "\nPlease contact a@gmail.com to report",  "code" : 401});
    }
}

async function confirmEmail(req, res){
    try {
        const emailConfirm = req.query.email;
    const queryStr = "select * from register_account where user_email = $1"
    const rows = await db.query(queryStr, [emailConfirm]);

    const hashedPassword = await bcrypt.hash(rows[0].user_password, 10);
    const queryStr2 = "insert into account (user_name, user_email, user_password, watched_num, favorite_num, join_since) values ($1, $2, $3, $4, $5, $6)"
    await db.query(queryStr2, [rows[0].user_name, emailConfirm, hashedPassword, 0, 0, rows[0].join_since]);

    const queryStr3 = "delete from register_account where user_email = $1"
    await db.query(queryStr3, [emailConfirm]);

    res.status(200).json({"mess": "Email verified, account created",  "code" : 200});
    } catch (error) {
        res.status(401).json({"error": error + "\nPlease contact a@gmail.com to report",  "code" : 401});
    }
    
}

module.exports = {
    registerAccount : registerAccount, 
    confirmEmail : confirmEmail
}