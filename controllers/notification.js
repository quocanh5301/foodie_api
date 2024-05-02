const db = require('../data/db');
// const mailer = require('../utils/nodemailer_helper'); 
// const dateTime = require('../utils/date_time'); 
// const bcrypt = require('bcrypt');

async function getNotificationOfUser(req, res) {
    try {
        const userId = req.body.userId;

        res.status(200).json({ mess: "success", code: 200 });
    } catch (error) {
        res.status(401).json({ mess: error + " Please contact a@gmail.com to report", code: 401 });
    }
}

async function seenNotification(req, res) {
    try {
        const userId = req.body.userId;

        res.status(200).json({ mess: "success", code: 200 });
    } catch (error) {
        res.status(401).json({ mess: error + "\nPlease contact a@gmail.com to report", code: 401 });
    }
}

module.exports = {
    getNotificationOfUser: getNotificationOfUser,
    seenNotification: seenNotification
}