const firebase = require('../utils/firebase');
const { v4: uuidv4 } = require('uuid');
const db = require('../data/db');
const e = require('express');

async function setProfileImage(req, res) {
    try {
        const email = req.body.email;
        const file = req.file;

        console.log('Received body:', req.body);
        console.log('Received Parameters:', email);
        console.log('Received File:', file);

        const imageID = uuidv4();
        const fileName = `${imageID}`;
        await firebase.uploadFile({
            file: file,
            fileName: fileName,
            onSuccess: async () => {
                try {
                    const queryStr = "UPDATE account SET image = $1 WHERE user_email = $2"
                    await db.query(queryStr, [fileName, email]);
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
        const fileUrl = await firebase.getImageUrl(req.query.imageId);
        console.log('File url ' + fileUrl);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ mess: "success", data: fileUrl, code: 200 });
    } catch (error) {
        res.status(500).json({ mess: error.message, code: 500 });
    }
}

async function updateProfileImage(req, res, next) {
    try {
        const imageId = req.body.imageId;
        const file = req.file;
        const email = req.body.email;

        if (imageId === null) {
            next()
        }

        const userQuery = "SELECT image FROM account WHERE user_email = $1";
        const userResult = await db.query(userQuery, [email]);
        console.log(userResult[0].image);
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
            fileName: `${existingImageID}`,
            onSuccess: async () => {
                try {
                    // Update the user's record in your database with the new image ID
                    const queryStr = "UPDATE account SET image = $1 WHERE user_email = $2";
                    await db.query(queryStr, [fileName, email]);
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
        console.log(error);
        res.status(401).json({ mess: error.message, code: 401 });
    }
}

async function updateUserData(req, res) {
    try {
        const userId = req.body.userId;
        const userName = req.body.userName;
        const userEmail = req.body.userEmail;
        const userPassword = req.body.userPassword;
        const updateUserQuery = "UPDATE account SET user_name = $1, user_email = $2, user_password = $3 WHERE id = $4";
        await db.query(updateUserQuery, [userName, userEmail, userPassword, userId]);
        res.status(200).json({ mess: "success", code: 200 });
    } catch (error) {
        res.status(500).json({ mess: 'Error updating user data', code: 500 });
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
    // sendNotificationToFollower: sendNotificationToFollower, //!qa
    registerUserDeviceToken: registerUserDeviceToken,
}