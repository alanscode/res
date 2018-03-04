const functions = require('firebase-functions');
const admin = require('firebase-admin')
const express = require('express')
var bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


var serviceAccount = require('./resume-3417c70dc983.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://resume-edfe8.firebaseio.com'
});

app.post('/contactform',(req,res) =>{
    if(req.body.secretkey != '@l@n') {
        res.end("Unauthorized Access")
        return
    }

    let message = req.body

   admin.database().ref("contactform").push(message)
   res.end("OK")
})

exports.message = functions.https.onRequest(app);
