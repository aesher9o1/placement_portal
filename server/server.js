var express = require('express');
var bodyParser = require('body-parser');
var admin = require("firebase-admin");
var serviceAccount = require("./secrets/placement-portalmuj-firebase-adminsdk-cred.json");
var cors = require('cors');
var tokenMiddleware = require('./middlewares/verifyAuth')

let apiVersion = {
    v1: '/api/v1'
}
let app = express()

/**Application setup */
app.use(cors())

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://placement-portalmuj.firebaseio.com"
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use('/', tokenMiddleware)

let authRoute = require('./routes/auth')


/**Test route */
app.get('/', async (req, res) => {
    res.send('server working')
})

app.use(`${apiVersion.v1}/auth`, authRoute);


app.listen(process.env.PORT || 4000, (err) => {
    if (err)
        throw err;
    else
        console.log(`App is listening to ${process.env.PORT}`)
});
