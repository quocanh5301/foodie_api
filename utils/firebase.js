const firebaseAdmin = require('firebase-admin');
var serviceAccount = require("./fir-fb56f-firebase-adminsdk-lld53-1bd81f0180.json");

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    storageBucket: process.env.STORAGE_BUCKET,
  });

exports.firebaseAdmin = firebaseAdmin
