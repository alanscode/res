const functions = require('firebase-functions');
const admin = require('firebase-admin')
const express = require('express')
var bodyParser = require('body-parser');
const cors = require('cors')({origin: true});

const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors)

admin.initializeApp(functions.config().firebase)

app.post('/contactform',(req,res) =>{
    if(req.body.alan != '@l@n') {
        
        res.end("Unauthorized Access")
        return
    }
    
    delete req.body.alan

    let message = req.body

   admin.database().ref("contactform").push(message)
   res.end("OK")
})

exports.message = functions.https.onRequest(app);
