const firebaseAdmin = require('firebase-admin');
var serviceAccount = require("./fir-fb56f-firebase-adminsdk-lld53-f50aacf3cb.json");


firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  storageBucket: process.env.STORAGE_BUCKET,
  databaseURL: "https://fir-fb56f-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const bucket = firebaseAdmin.storage().bucket();

const uploadFile = async ({ file, directory, fileName, onSuccess, onFail }) => {
  const fileBuffer = file.buffer;
  const fileUpload = bucket.file(`${directory}/${fileName}`); // Specify directory in the file path
  const stream = fileUpload.createWriteStream({
    metadata: {
      contentType: 'image/jpeg',
    },
  });

  stream.on('error', onFail);

  stream.on('finish', onSuccess);

  stream.end(fileBuffer);
};

const deleteFile = async ({ fileName, onSuccess, onFail }) => {
  try {
    await bucket.file(fileName).delete().then(onSuccess).catch(onFail);
  } catch (error) {
    console.log(error);
  }
  
};

const sendNotificationTo = async (deviceTokenList, title, content) => {
  const message = {
    data: { title: title, content: content },
    tokens: deviceTokenList,
  };
  await firebaseAdmin.messaging().sendEachForMulticast(message)
    .then((response) => {
      console.log('sendNotificationTo ' + response.failureCount + ' messages were not sent');
      console.log('sendNotificationTo ' + response.successCount + ' messages were sent successfully');
    });
};

const sendInAppNotification = async (deviceTokenList, content) => {
  const message = {
    data: { body: content },
    tokens: deviceTokenList,
    android: {
      priority: 'high'
    }
  };
  try {
    await firebaseAdmin.messaging().sendEachForMulticast(message)
      .then((response) => {
        console.log('sendInAppNotification ' + response.failureCount + ' messages were not sent');
        console.log('sendInAppNotification ' + response.successCount + ' messages were sent successfully');
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendNotificationTo: sendNotificationTo,
  uploadFile: uploadFile,
  deleteFile: deleteFile,
  sendInAppNotification: sendInAppNotification,
}
