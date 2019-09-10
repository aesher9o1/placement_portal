'use strict'
const router = require('express');
var admin = require("firebase-admin");
let route = router();
var secrets = require('../secrets/code-secrets.json')
//claims are -> admin officers student

// route.get('/', async (req, response) => {
//     admin.auth().getUser(req.headers.uid).then((userRecords) => {
//         if (userRecords.customClaims && (userRecords.customClaims).designation)
//             response.send({ status: 200, code: userRecords.customClaims.designation })
//         else {
//             admin.database().ref(`manipal/custom_claims/${req.headers.uid}`).once('value', (snapshot) => {
//                 let claim;
//                 if (snapshot.exists())
//                     claim = snapshot.val();
//                 else
//                     claim = "student"
//                 admin.auth().setCustomUserClaims(req.headers.uid, { designation: claim }).then(res => {
//                     console.log(`setting claim for user ${req.headers.uid}`)
//                     response.send({ status: 200, code: claim })
//                 })
//             })
//         }
//     })
// })


/**
 * The function is responsible to create a Super Admin
 * @todo Error handing, If claim is not set and the user is created delete the user
 */
route.post('/makesuperadmin', async (req, response) => {
    var body = req.body

    if (body['token'] === secrets.adminPassword) {
        admin.auth().createUser({
            email: body.email,
            emailVerified: false,
            password: body.password,
            displayName: body.displayName,
            disabled: false
        })
            .then(function (userRecord) {
                console.log('Successfully created new user:', userRecord.uid);
                admin.auth().setCustomUserClaims(userRecord.uid, {
                    admin: true,
                    officer: true,
                    student: true
                }).then(res => {
                    console.log(`setting claim for user ${userRecord.uid}`)
                    response.send({ status: 200, message: userRecord.uid })
                }, err => {
                    response.send({ status: 400, message: err.message })
                })
            })
            .catch(function (error) {
                console.log('Error creating new user:', error);
                response.send({ status: 400, message: error.message })
            });
    }
    else
        response.send({ status: 400, message: "Unauthorized" })
})

/**
 * The function is responsible to create a Training placemnet cordinator
 * @todo Error handing, If claim is not set and the user is created delete the user
 * @todo Since this will be sent from the website implement a proper encryption using crypto.js
 */
route.post('/normalusercreate', async (req, response) => {
    var body = req.body

    if (body['token'] === secrets.password) {
        admin.auth().createUser({
            email: body.email,
            emailVerified: false,
            password: body.password,
            displayName: body.displayName,
            disabled: false
        })
            .then(function (userRecord) {
                console.log('Successfully created new user:', userRecord.uid);
                admin.auth().setCustomUserClaims(userRecord.uid, {
                    officer: true,
                    student: true
                }).then(res => {
                    console.log(`setting claim for user ${userRecord.uid}`)
                    response.send({ status: 200, message: userRecord.uid })
                }, err => {
                    response.send({ status: 400, message: err.message })
                })
            })
            .catch(function (error) {
                console.log('Error creating new user:', error);
                response.send({ status: 400, message: error.message })
            });
    }
    else
        response.send({ status: 400, message: "Unauthorized" })
})



/**
 * Register the student, check if the student has the manipal ID
 * @todo Error handing, If claim is not set and the user is created delete the user
 * @todo Since this will be sent from the website implement a proper encryption using crypto.js
 */
route.post('/register', async (req, response) => {
    var body = req.body

    if (!body["email"].trim().includes(body["rid"])) {
        response.send({ status: 400, message: "The email ID does not belong to the registration number " })
    }
    else if (!body["email"].trim().includes(secrets.manipalEmailSuffix)) {
        response.send({ status: 400, message: "Please use the official email address" })
    }
    else {
        admin.auth().createUser({
            email: body.email,
            emailVerified: false,
            password: body.password,
            displayName: body.displayName,
            disabled: false
        })
            .then(function (userRecord) {
                console.log('Successfully created new user:', userRecord.uid);
                admin.auth().setCustomUserClaims(userRecord.uid, {
                    student: true
                }).then(res => {
                    console.log(`setting claim for user ${userRecord.uid}`)
                    response.send({ status: 200, message: userRecord.uid })
                }, err => {
                    response.send({ status: 400, message: err.message })
                })
            })
            .catch(function (error) {
                console.log('Error creating new user:', error);
                response.send({ status: 400, message: error.message })
            });
    }
})






module.exports = route;