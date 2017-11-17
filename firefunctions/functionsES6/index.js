import "core-js";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as cors from "cors";

admin.initializeApp(functions.config().firebase);

let contactsRef = admin.database().ref("/contacts");

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Contacts CLI!");
});
