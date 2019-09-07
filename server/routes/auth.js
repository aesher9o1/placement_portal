'use strict'
const router = require('express');
var admin = require("firebase-admin");
let route = router();

//claims are -> admin tpo student

route.get('/', async (req, response) => {

    admin.auth().getUser(req.headers.uid).then((userRecords) => {
        if (userRecords.customClaims && (userRecords.customClaims).designation)
            response.send({ status: 200, code: userRecords.customClaims.designation })
        else {
            admin.database().ref(`manipal/custom_claims/${req.headers.uid}`).once('value', (snapshot) => {
                let claim;
                if (snapshot.exists())
                    claim = snapshot.val();
                else
                    claim = "student"
                admin.auth().setCustomUserClaims(req.headers.uid, { designation: claim }).then(res => {
                    console.log(`setting claim for user ${req.headers.uid}`)
                    response.send({ status: 200, code: claim })
                })
            })
        }
    })

})

module.exports = route;