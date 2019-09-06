var express = require('express');
var bodyParser = require('body-parser');
var admin = require("firebase-admin");
var serviceAccount = require("./secrets/placement-portalmuj-firebase-adminsdk-cred.json");

let apiVersion = {
    v1: '/api/v1'
}
let app = express()

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://placement-portalmuj.firebaseio.com"
});


app.get('/', async (req, res) => {
    res.send('server working')
})


app.listen(process.env.PORT || 4000, (err) => {
    if (err)
        throw err;
    else
        console.log(`App is listening to ${process.env.PORT}`)
});
