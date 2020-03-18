const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // databaseURL: "",
    storageBucket: "kick-storage-exam.appspot.com"
});

const BUCKET = admin.storage().bucket();

module.exports = { BUCKET };