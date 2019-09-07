'use strict'
var admin = require("firebase-admin");
module.exports = async function verifyToken(err, res, req, next) {
    const idToken = req.headers.authorization;
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        if (decodedToken) {
            req.body.uid = decodedToken.uid;
            return next();
        } else
            return res.status(401).send("Unauthorized!!")
    } catch (e) {
        return res.status(401).send("Unauthorized!!")
    }
}
