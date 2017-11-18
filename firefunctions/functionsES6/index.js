import "core-js";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import cors from "cors";
import express from "express";

admin.initializeApp(functions.config().firebase);

let contactsRef = admin.database().ref("/contacts");

const app = express();

// middlware
app.use(cors({origin: true}))

app.put(":/id", (request, response, next) => {
    admin.database().ref("/contacts/" + request.params.id).update({
        firstName: request.body.firstname,
        lastName: request.body.lastname,
        phone: request.body.phone,
        email: request.body.email
    })

    response.send(request.body);
    next();
})

app.delete('/:id', (request, response, next) => {
    admin.database().ref('/contacts/' + request.params.id).remove()
    response.send(request.params.id)
    next();
   });


app.get('/:id', (request, response, next) => {
 admin.database().ref('/contacts/' + request.params.id).once('value',  (data) => {
  var sn = data.val()
  response.send({
   'res': sn
  })
  next()
  },(err) => res.send({res: err})
 )
})

exports.helloContactsCLI = functions.https.onRequest((request, response) => {
 response.send("Hello from Contacts CLI!");
});

/**
 * Allows adding a contact
 * @function {addContact}
 * @param {express.request}, {express.response}
 * @returns {Object}
 * */
exports.addContact = functions.https.onRequest((request, response) => {
    cors()( request, response, () => {
        contactsRef.push({
            firstName: request.body.firstname,
            lastName: request.body.lastname,
            phone: request.body.phone,
            email: request.body.email
        })
    })

    response.send({
        message: "Done",
        data:{
            firstName: rquest.body.firstname,
            lastName: request.body.lastname,
            phone: request.body.phone,
            email: request.body.email            
        }
    });
});


/**
 * Gets a contact from the database
 * @function getContact
 * @param {function} with 2 params, request and response objects
 * @returns {Object}
 */
exports.getContact = functions.https.onRequest((request, response) => {
    return app(request, response);
});

/**
* @function {updateContact}
* @return {Object}
* @parameter {express.Request}, {express.Response}
**/
exports.updateContact = functions.https.onRequest((request, response) => {
    return app(request, response)
   })

   /**
* @function {deleteContact}
* @return {Object}
* @parameter {express.Request}, {express.Response}
**/
exports.deleteContact = functions.https.onRequest((request, response) => {
    return app(request, response)
   })

/**
 * Handles getting contacts from database
 * @function getContactList
 * @param {function} which takes in request and response params
 * @returns {Object}
 */
exports.getContactList = functions.https.onRequest((request, response) => {
    contactsRef.once("value", (data) => {
        response.send({
            "response": data.val()
        })
    })
})