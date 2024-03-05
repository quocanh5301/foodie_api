const firebaseAdmin = require('firebase-admin');
var serviceAccount = require("./fir-fb56f-firebase-adminsdk-lld53-f50aacf3cb.json");


firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    storageBucket: process.env.STORAGE_BUCKET,
    databaseURL: "https://fir-fb56f-default-rtdb.asia-southeast1.firebasedatabase.app",
  });

const bucket = firebaseAdmin.storage().bucket();

// exports.firebaseAdmin = firebaseAdmin

const sendNotificationTo = ({deviceTokenList, tilte, content}) => {
  const message = {
    data: { title: tilte, content: content },
    tokens: deviceTokenList,
};
firebaseAdmin.messaging().sendEachForMulticast(message)
    .then((response) => {
        console.log(response.successCount + ' messages were sent successfully');
    });
};

const uploadFile = async ({file, fileName, onSuccess, onFail}) => {
  
  const fileBuffer = file.buffer;

  const fileUpload = bucket.file(fileName);
  const stream = fileUpload.createWriteStream({
      metadata: {
          contentType: file.mimetype,
      },
  });

  stream.on('error', onFail);

  stream.on('finish', onSuccess);

  stream.end(fileBuffer);
};

const deleteFile = async ({fileName, onSuccess, onFail}) => {
  await bucket.file(fileName).delete().then(onSuccess).catch(onFail);
};

const getImageUrl = async (imageId) => {
  const file = bucket.file(imageId);
  const fileUrl = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 1000 * 60 * 10,
  });
  return fileUrl;
};

module.exports = {
  sendNotificationTo: sendNotificationTo,
  uploadFile: uploadFile,
  deleteFile: deleteFile,
  getImageUrl: getImageUrl,
}
