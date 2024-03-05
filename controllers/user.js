const firebase = require('../utils/firebase');
const { v4: uuidv4 } = require('uuid');
const db = require('../data/db');
const e = require('express');
const bcrypt = require('bcrypt');

async function setProfileImage(req, res) {
    try {
        const userId = req.body.userId;
        const file = req.file;

        console.log('Received body:', req.body);
        console.log('Received Parameters:', userId);
        console.log('Received File:', file);

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
                res.status(200).json({ mess: 'Data received and file uploaded successfully!', code: 200 });
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

// async function sendNotificationToFollower(req, res) {
//     try {
//         const registrationTokens = [];
//         const userId = req.body.userId; //id of followed user 
//         const userQuery = "select follower_account_id from subscription_account where account_id = $1;";
//         const userResult = await db.query(userQuery, [userId]);
//         for (let index = 0; index < userResult.length; index++) {
//             const tokenQuery = "select firebase_token from firebase_messaging_token where account_id = $1;";
//             const tokenResult = await db.query(tokenQuery, [userResult[index].follower_account_id]);
//             console.log(tokenResult[0].firebase_token);
//             // registrationTokens.push(tokenResult[0].firebase_token);
//         }

//         // firebase.sendNotificationTo({  //!qa
//         //     deviceTokenList: ['ezDzgtKtTsGnDpb-HXJsGz:APA91bEVw5ITiUJ7cK5buZJuenp2tLa0AfVqrwrxV-ekG6g5XkuXMWFPRRAbYO5-lxnmC6iAIwGtvNBY2ygW513CgaHmQ6zBzEPXEek9bRQwxPj7DqYzi5XMH09koijV4GKpDfXaOyBv'], 
//         //     tilte: '8500000', 
//         //     content: '2:45',
//         // })
//     } catch (error) {
//         res.status(500).json({ mess: error.message, code: 500 });
//     }
// }

async function registerUserDeviceToken(req, res) {
    try {
        const userId = req.body.userId; //id of user 
        const deviceToken = req.body.deviceToken; //deviceToken of user 
        const userQuery = "INSERT INTO firebase_messaging_token (firebase_token, account_id) VALUES ($1, $2);";
        await db.query(userQuery, [userId, deviceToken]);
    } catch (error) {
        res.status(500).json({ mess: error.message, code: 500 });
    }
}

async function getProfileImage(req, res) {
    try {
        const userId = req.body.userId;
        const userQuery = "SELECT image FROM account WHERE id = $1";
        const userResult = await db.query(userQuery, [userId]);
        const fileUrl = await firebase.getImageUrl(userResult[0].image);
        // const fileUrl = await firebase.getImageUrl(req.query.imageId);
        console.log('File url ' + fileUrl);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ mess: "success", data: fileUrl, code: 200 });
    } catch (error) {
        res.status(500).json({ mess: error.message, code: 500 });
    }
}

async function updateProfileImage(req, res, next) {
    try {
        const file = req.file;
        const userId = req.body.userId;

        if (imageId === null) {
            next()
        }

        const userQuery = "SELECT image FROM account WHERE id = $1";
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
                res.status(200).json({ mess: 'Data received and file uploaded successfully!', code: 200 });
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
        const updateUserQuery = "UPDATE account SET user_name = $1, user_email = $2 WHERE id = $3";
        await db.query(updateUserQuery, [userName, userEmail, userId]);
        res.status(200).json({ mess: "success", code: 200 });
    } catch (error) {
        res.status(500).json({ mess: 'Error updating user data', code: 500 });
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

async function retrieveUserData(req, res) {
    console.log(req.body)
}

module.exports = {
    setProfileImage: setProfileImage,
    getProfileImage: getProfileImage,
    updateProfileImage: updateProfileImage,
    updateUserData: updateUserData,
    retrieveUserData: retrieveUserData,
    changeUserPassword: changeUserPassword,
    // sendNotificationToFollower: sendNotificationToFollower, //!qa
    registerUserDeviceToken: registerUserDeviceToken,
}