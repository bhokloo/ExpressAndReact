const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient
require("");


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

// parse requests of content-type - application/json
app.use(bodyParser.json());

//install azure cosmos db
// Configuring the database
//MongoDB is a schema-less NoSQL document database.
const configDb = require('./config/database.config');


//Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
//It manages relationships between data, provides schema validation, 
//and is used to translate between objects in 
//code and the representation of those objects in MongoDB.
const mongoose = require('mongoose');

//we use moongose default mongoose mpromise implementation
//promise is just an enhancement to callback functions 
mongoose.Promise = global.Promise;

//connecting to DB
mongoose.connect(configDb.url, {
    useNewUrlParser : true , 
    useUnifiedTopology: true
}).then(() => console.log("success")).catch(err => {
    console.log(err);
    process.exit();
});


require('./app/routes/note.route')(app);

const Note = require('../demo/app/models/note.model');

app.get('/', (req,res) => res.sendFile(__dirname + '/form.html'));
// app.get('/indra', (req,res) => indra());   
app.get('/json', (req,res) => res.json({"hello":"world"}));

app.listen(8090, () => console.log("Responding....."));
