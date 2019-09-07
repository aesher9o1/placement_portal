'use strict'
const router = require('express');
var admin = require("firebase-admin");
let route = router();

route.post('/', async (req, res) => {
    console.log(req.body['uid'])
    console.log(req.body)
    admin.auth().verifyIdToken(req.body['uid'])
        .then(function (decodedToken) {
            let uid = decodedToken.uid;
            res.send(uid)
            
        }).catch(function (error) {
            res.send(error)
        });
})

module.exports = route;