const firebase = require('../utils/firebase');
const { v4: uuidv4 } = require('uuid');
const db = require('../data/db');
const e = require('express');
const bcrypt = require('bcrypt');
const dateTime = require('../utils/date_time');


async function setProfileImage(req, res) {
    try {
        const userId = req.body.userId;
        const file = req.file;

        const imageID = uuidv4();
        const fileName = `${imageID}`;
        await firebase.uploadFile({
            file: file,
            fileName: fileName,
            onSuccess: async () => {
                try {
                    const queryStr = "UPDATE account SET image = $1 WHERE id = $2"
                    await db.query(queryStr, [fileName, userId]);
                } catch (error) {
                    console.log('File fail to uploaded to Firebase Storage' + error);
                }
                console.log('File uploaded to Firebase Storage');
                res.status(200).json({ mess: 'success', code: 200 });
            },
            onFail: (err) => {
                console.error('Error uploading to Firebase Storage:', err);
                res.status(500).json({ mess: 'Error uploading to Firebase Storage', code: 500 });
            },
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({ mess: error.message, code: 401 });
    }
}

async function getProfileImage(req, res) {
    try {
        const userId = req.body.userId;
        const userQuery = "SELECT user_image FROM account WHERE id = $1";
        const userResult = await db.query(userQuery, [userId]);
        const fileUrl = await firebase.getImageUrl(userResult[0].user_image);
        // res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ mess: "success", data: fileUrl, code: 200 });
    } catch (error) {
        res.status(500).json({ mess: error.message, code: 500 });
    }
}

async function updateProfileImage(req, res, next) {
    try {
        const file = req.file;
        const userId = req.body.userId;

        const userQuery = "SELECT user_image FROM account WHERE id = $1";
        const userResult = await db.query(userQuery, [userId]);
        const existingImageID = userResult[0].image;
        //Delete the existing image from Firebase Storage
        if (existingImageID) {
            await firebase.deleteFile({
                fileName: existingImageID,
                onSuccess: () => { console.log('File deleted successfully.'); },
                onFail: (err) => { console.error('Error deleting file:', err); }
            });
        }
        // Upload the new image with the same image ID
        await firebase.uploadFile({
            file: file,
            fileName: existingImageID,
            onSuccess: async () => {
                try {
                    // Update the user's record in your database with the new image ID
                    const queryStr = "UPDATE account SET image = $1 WHERE id = $2";
                    await db.query(queryStr, [existingImageID, userId]);
                } catch (error) {
                    console.error('Error updating user record:', error);
                    res.status(500).json({ mess: 'Error updating user record', code: 500 });
                    return;
                }
                console.log('File uploaded to Firebase Storage');
                res.status(200).json({ mess: 'success', code: 200 });
            },
            onFail: (err) => {
                console.error('Error uploading to Firebase Storage:', err);
                res.status(500).json({ mess: 'Error uploading to Firebase Storage', code: 500 });
            },
        });
    } catch (error) {
        res.status(500).json({ mess: error.message, code: 500 });
    }
}

async function updateUserData(req, res) {
    try {
        const userId = req.body.userId;
        const userName = req.body.userName;
        const userEmail = req.body.userEmail;
        const description = req.body.description;
        const updateUserQuery = "UPDATE account SET user_name = $1, user_email = $2, description = $3, update_at = $4 WHERE id = $5";
        await db.query(updateUserQuery, [userName, userEmail, description, dateTime.currentDateDMY(), userId]);
        res.status(200).json({ mess: "success", code: 200, data: { userName: userName, userEmail: userEmail, description: description } });
    } catch (error) {
        res.status(500).json({ mess: 'Error updating user data ' + error, code: 500 });
    }
}

async function changeUserPassword(req, res) {
    try {
        const userId = req.body.userId;
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;

        const userQuery = "SELECT user_password FROM account WHERE id = $1";
        const userResult = await db.query(userQuery, [userId]);
        const validPassword = await bcrypt.compare(oldPassword, userResult[0].user_password);
        if (!validPassword) return res.status(401).json({ mess: "Incorrect old password", code: 401 });
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updateUserQuery = "UPDATE account SET user_password = $1 WHERE id = $2";
        await db.query(updateUserQuery, [hashedPassword, userId]);
        res.status(200).json({ mess: "success", code: 200 });
    } catch (error) {
        res.status(500).json({ mess: 'Error updating user password' + error, code: 500 });
    }
}

async function setFirebaseToken(req, res) {
    try {
        const userId = req.body.userId;
        const firebaseToken = req.body.firebaseToken;
        await db.query('delete from firebase_messaging_token WHERE account_id = $1 or firebase_token = $2', [userId, firebaseToken]);

        const registerFirebaseQuery = "INSERT INTO firebase_messaging_token (firebase_token, account_id) VALUES ($1, $2)";
        await db.query(registerFirebaseQuery, [firebaseToken, userId]);
        res.status(200).json({ mess: "success", code: 200 });
    } catch (error) {
        res.status(500).json({ mess: 'Error updating Firebase Token ' + error, code: 500 });
    }
}

async function followUser(req, res) {
    try {
        const userId = req.body.userId; //to user
        const followerUserId = req.body.followerUserId; //from user
        const isFollow = req.body.isFollow;
        if (isFollow == 1) {
            const followUserQuery = "INSERT INTO subscription_account (account_id, follower_account_id) values ($1,$2);"
            await db.query(followUserQuery, [userId, followerUserId]);
            res.status(200).json({ mess: "success", code: 200 });
        } else {
            const unfollowUserQuery = "DELETE FROM subscription_account WHERE account_id = $1 AND follower_account_id = $2;"
            await db.query(unfollowUserQuery, [userId, followerUserId]);
            res.status(200).json({ mess: "success", code: 200 });
        }
    } catch (error) {
        res.status(500).json({ mess: error.message, code: 500 });
    }
}

async function searchUser(req, res) {
    try {
        const searchKey = req.body.searchKey;
        const page = req.body.page;
        const pageSize = req.body.pageSize;
        const searchUserQuery = "SELECT * FROM account WHERE  where user_name ilike $1 limit $2 offset $3";
        const searchResult = await db.query(searchUserQuery, [`%${searchKey}%`, pageSize, pageSize * page]);
        res.status(200).json({ mess: "success", code: 200, data: searchResult });
    } catch (error) {
        res.status(500).json({ mess: error.message, code: 500 });
    }
}

module.exports = {
    setProfileImage: setProfileImage,
    getProfileImage: getProfileImage,
    updateProfileImage: updateProfileImage,
    updateUserData: updateUserData,
    setFirebaseToken: setFirebaseToken,
    changeUserPassword: changeUserPassword,
    followUser: followUser, //!qa unfollowUser
    searchUser: searchUser,
}