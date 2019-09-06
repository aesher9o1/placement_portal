var express = require('express');
var bodyParser = require('body-parser');

let apiVersion = {
    v1: '/api/v1'
}
let app = express()

app.get('/', async (req, res) => {
    res.send('server working')
})

app.listen(process.env.PORT || 4000, (err) => {
    if (err)
        throw err;
    else
        console.log(`App is listening to ${process.env.PORT}`)
});
