const firebase = require('../utils/firebase');
const { v4: uuidv4 } = require('uuid');
const db = require('../data/db');
const e = require('express');

const bucket = firebase.firebaseAdmin.storage().bucket()

async function setProfileImage(req, res) {
    try {
        const email = req.body.email;
        const file = req.file;

        console.log('Received body:', req.body);
        console.log('Received Parameters:', email);
        console.log('Received File:', file);

        const imageID = uuidv4();
        const fileBuffer = file.buffer;
        const fileName = `${imageID}`;

        const fileUpload = bucket.file(fileName);
        const stream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
        });

        stream.on('error', (err) => {
            console.error('Error uploading to Firebase Storage:', err);
            res.status(500).json({ error: 'Error uploading to Firebase Storage' });
        });

        stream.on('finish', async () => {
            try {
                const queryStr = "UPDATE account SET image = $1 WHERE user_email = $2"
                await db.query(queryStr, [fileName, email]);
            } catch (error) {

            }
            console.log('File uploaded to Firebase Storage');
            res.status(200).json({ message: 'Data received and file uploaded successfully!' });
        });

        stream.end(fileBuffer);

    } catch (error) {
        console.log(error)
        res.status(401).json({ mess: error.message });
    }
}

async function getProfileImage(req, res) {
    try {
        const file = bucket.file(req.query.imageId);
        const fileUrl = await file.getSignedUrl({
            action: 'read',
            expires: Date.now() + 1000 * 60 * 10,
        });
        console.log('File url ' + fileUrl);//!qa test

        // const imageData = await getImageFromStorage(req.query.imageId);

        // const base64Data = imageData.toString('base64'); // Encode binary data to Base64
        // res.setHeader('Content-Type', 'application/json');
        // res.status(200).json({ data: base64Data, code: 200 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getImageFromStorage(fileName) {
    const file = bucket.file(fileName);

    try {
        const [fileData] = await file.download();
        return fileData;
    } catch (error) {
        console.error('Error downloading image from Firebase Storage:', error);
        throw error;
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
            await bucket.file(existingImageID).delete().then(() => {
                console.log('File deleted successfully.');
            })
                .catch((error) => {
                    console.error('Error deleting file:', error);
                });;
        }

        // Upload the new image with the same image ID
        const fileBuffer = file.buffer;
        const fileName = `${existingImageID}`;
        const fileUpload = bucket.file(fileName);
        const stream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
        });

        stream.on('error', (err) => {
            console.error('Error uploading to Firebase Storage:', err);
            res.status(500).json({ error: 'Error uploading to Firebase Storage' });
        });

        stream.on('finish', async () => {
            try {
                // Update the user's record in your database with the new image ID
                const queryStr = "UPDATE account SET image = $1 WHERE user_email = $2";
                await db.query(queryStr, [fileName, email]);
            } catch (error) {
                console.error('Error updating user record:', error);
                res.status(500).json({ error: 'Error updating user record' });
                return;
            }

            console.log('File uploaded to Firebase Storage');
            res.status(200).json({ message: 'Data received and file uploaded successfully!' });
        });

        stream.end(fileBuffer);

    } catch (error) {
        console.log(error);
        res.status(401).json({ mess: error.message });
    }
}

async function updateUserData(req, res) {
    console.log(req.body)
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
}