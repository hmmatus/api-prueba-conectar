const admin = require("firebase-admin");

const  serviceAccount = require("../../serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://prueba-conectar.appspot.com"
});

const firestore = admin.firestore();
const storage = admin.storage().bucket();

module.exports = {
  firestore,
  storage
}