const db = require('../data/db');
const mailer = require('../utils/nodemailer_helper');
const dateTime = require('../utils/date_time');
const bcrypt = require('bcrypt');

async function registerAccount(req, res) {
    try {
        const email = req.body.email;
        const name = req.body.name;
        const password = req.body.password;
        if (!email || !name || !password) return res.status(401).json({ mess: "Please fill in all fields", code: 401 });

        const queryStr = "select user_name from account where user_email = $1 or user_name = $2"
        const rows = await db.query(queryStr, [email, name]);
        if (rows.length != 0) return res.status(200).json({ mess: "Email or user name already exist", code: 200 });
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const queryStr2 = "insert into register_account (user_name, user_email, user_password) values ($1, $2, $3)"
        await db.query(queryStr2, [req.body.name, req.body.email, hashedPassword]);
        await mailer.sendVerificationEmail(req.body.email, "http://localhost:3000/register/confirmRegistration?email=" + req.body.email);
        res.status(200).json({ mess: "success", code: 200 });
    } catch (error) {
        res.status(401).json({ mess: error + " Please contact a@gmail.com to report", code: 401 });
    }
}

async function confirmEmail(req, res) {
    try {
        const emailConfirm = req.query.email;
        const queryStr = "select * from register_account where user_email = $1"
        const rows = await db.query(queryStr, [emailConfirm]);

        const queryStr2 = "insert into account (user_name, user_email, user_password, update_at, join_at, num_of_followers) values ($1, $2, $3, $4, $5, 0)"
        await db.query(queryStr2, [rows[0].user_name, emailConfirm, rows[0].user_password, dateTime.currentDateDMY_HM(), dateTime.currentDateDMY_HM()]);

        const queryStr3 = "delete from register_account where user_email = $1"
        await db.query(queryStr3, [emailConfirm]);

        res.status(200).send(successRegister);
    } catch (error) {
        res.status(401).json({ mess: error + "\nPlease contact a@gmail.com to report", code: 401 });
    }
}

const successRegister = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            color: #333;
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }
        .container {
            background: white;
            padding: 20px 40px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            text-align: center;
        }
        .container h1 {
            color: #4CAF50;
        }
        .container p {
            font-size: 1.2em;
        }
        .container .button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-size: 1em;
            transition: background-color 0.3s;
        }
        .container .button:hover {
            background-color: #DBA510;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Thank You!</h1>
        <p>Your email has been successfully confirmed.</p>
        <p>You can now proceed to use our services.</p>
    </div>
</body>
</html>
`

const failRegister = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Confirmation Failed</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f8f9fa;
            color: #333;
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }
        .container {
            background-color: #fff;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        h1 {
            color: #dc3545;
            margin-bottom: 1rem;
        }
        p {
            font-size: 1.1rem;
            margin-bottom: 1.5rem;
        }
        .btn {
            background-color: #007bff;
            color: #fff;
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 4px;
            text-decoration: none;
            font-size: 1rem;
            cursor: pointer;
        }
        .btn:hover {
            background-color: #2b2b2b;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Email Confirmation Failed</h1>
        <p>Oops! Something went wrong. We were unable to confirm your email address.</p>
        <p>Please check your email and try again, or click the button below to resend the confirmation email.</p>
    </div>
</body>
</html>
`

module.exports = {
    registerAccount: registerAccount,
    confirmEmail: confirmEmail
}