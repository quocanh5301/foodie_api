const db = require('../data/db');
const firebase = require('../utils/firebase');
// const Notification = require('../models/notification');

async function getNotificationOfUser(req, res) {
    try {
        const userId = req.body.userId;
        const page = req.body.page;
        const pageSize = req.body.pageSize;
        const userNotiQuery = "select id, title, notification_content, notification_image, on_click_type, relevant_data, create_at, is_seen from notification join notification_to_account on notification.id = notification_to_account.notification_id where notification_to_account.account_id = $1 order by notification.create_at desc limit $2 offset $3"
        const userNoti = await db.query(userNotiQuery, [userId, pageSize, page * pageSize]);
        console.log(userNoti[0]);
        

        res.status(200).json({ mess: "success", code: 200, data: userNoti });

    } catch (error) {
        console.log(error);
        res.status(401).json({ mess: error + " Please contact a@gmail.com to report", code: 401 });
    }
}

async function seenNotification(req, res) {
    try {
        const userId = req.body.userId;
        const notificationId = req.body.notificationId;
        const isSeen = req.body.isSeen;
        const updateNotificationQuery = "update notification_to_account set is_seen = $1 where account_id = $2 and notification_id = $3"
        await db.query(updateNotificationQuery, [isSeen, userId, notificationId]);
        res.status(200).json({ mess: "success", code: 200 });
    } catch (error) {
        res.status(401).json({ mess: error + "\nPlease contact a@gmail.com to report", code: 401 });
    }
}

async function deleteNotification(req, res) {
    try {
        const userId = req.body.userId;
        const notificationId = req.body.notificationId;
        const deleteNotificationQuery = "delete from notification_to_account where account_id = $1 and notification_id = $2"
        await db.query(deleteNotificationQuery, [userId, notificationId]);

        const checkNotificationQuery = "select notification_id from notification_to_account where notification_id = $1"
        const notifications = await db.query(checkNotificationQuery, [notificationId]);
        if (notifications.length === 0) {
            const deleteNotificationQuery2 = "delete from notification where id = $1"
            await db.query(deleteNotificationQuery2, [notificationId]);
        }

        res.status(200).json({ mess: "success", code: 200 });
    } catch (error) {
        res.status(401).json({ mess: error + "\nPlease contact a@gmail.com to report", code: 401 });
    }
}

module.exports = {
    getNotificationOfUser: getNotificationOfUser,
    seenNotification: seenNotification,
    deleteNotification: deleteNotification,
}