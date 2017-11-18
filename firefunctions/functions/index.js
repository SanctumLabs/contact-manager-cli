"use strict";

require("core-js");

var _firebaseFunctions = require("firebase-functions");

var functions = _interopRequireWildcard(_firebaseFunctions);

var _firebaseAdmin = require("firebase-admin");

var admin = _interopRequireWildcard(_firebaseAdmin);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

admin.initializeApp(functions.config().firebase);

var contactsRef = admin.database().ref("/contacts");

var app = (0, _express2.default)();

// middlware
app.use((0, _cors2.default)({ origin: true }));

app.put(":/id", function (request, response, next) {
    admin.database().ref("/contacts/" + request.params.id).update({
        firstName: request.body.firstname,
        lastName: request.body.lastname,
        phone: request.body.phone,
        email: request.body.email
    });

    response.send(request.body);
    next();
});

app.delete('/:id', function (request, response, next) {
    admin.database().ref('/contacts/' + request.params.id).remove();
    response.send(request.params.id);
    next();
});

app.get('/:id', function (request, response, next) {
    admin.database().ref('/contacts/' + request.params.id).once('value', function (data) {
        var sn = data.val();
        response.send({
            'res': sn
        });
        next();
    }, function (err) {
        return res.send({ res: err });
    });
});

exports.helloContactsCLI = functions.https.onRequest(function (request, response) {
    response.send("Hello from Contacts CLI!");
});

/**
 * Allows adding a contact
 * @function {addContact}
 * @param {express.request}, {express.response}
 * @returns {Object}
 * */
exports.addContact = functions.https.onRequest(function (request, response) {
    (0, _cors2.default)()(request, response, function () {
        contactsRef.push({
            firstName: request.body.firstname,
            lastName: request.body.lastname,
            phone: request.body.phone,
            email: request.body.email
        });
    });

    response.send({
        message: "Done",
        data: {
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
exports.getContact = functions.https.onRequest(function (request, response) {
    return app(request, response);
});

/**
* @function {updateContact}
* @return {Object}
* @parameter {express.Request}, {express.Response}
**/
exports.updateContact = functions.https.onRequest(function (request, response) {
    return app(request, response);
});

/**
* @function {deleteContact}
* @return {Object}
* @parameter {express.Request}, {express.Response}
**/
exports.deleteContact = functions.https.onRequest(function (request, response) {
    return app(request, response);
});

/**
 * Handles getting contacts from database
 * @function getContactList
 * @param {function} which takes in request and response params
 * @returns {Object}
 */
exports.getContactList = functions.https.onRequest(function (request, response) {
    contactsRef.once("value", function (data) {
        response.send({
            "response": data.val()
        });
    });
});