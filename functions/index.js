const functions = require('firebase-functions');
const admin = require('firebase-admin')
const express = require('express')
var bodyParser = require('body-parser');
const cors = require('cors')({
    origin: true
});

const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies
app.use(cors)

admin.initializeApp(functions.config().firebase)

app.post('/contactform', (req, res) => {
    if (req.body.alan != '@l@n') {
        res.end("Unauthorized Access")
    }

    delete req.body.alan

    let message = req.body

    admin.database().ref("contactform").push(message)
    res.end("OK")
})

app.get('/list', (req, res) => {
    
    admin.database().ref("contactform")
        .orderByKey()
        .once("value")
        .then(messages => {
            var result = JSON.stringify(messages.val())
            res.end(result)
        })

})

exports.message = functions.https.onRequest(app);