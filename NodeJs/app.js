const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const newEvents = require('./routes/Events/newEvents')
const pastEvents = require('./routes/Events/pastEvents')

const app = express();//create a new instance of the app

mongoose.connect("mongodb+srv://peyman:"+ process.env.MONGO_ATLAS_PW +"@cluster1-lb4pq.mongodb.net/diaryApp?retryWrites=true", {useNewUrlParser: true})
.then(()=>{
  console.log('connected to database')
})
.catch(()=>{
  console.log('Connection Failed');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("NodeJs/images")));

//use this middleware to allow CORS Cross Origin. So that no matter what the domain/port server the request is coming from, this app will allow it. By setting that header to "*", it allows it
app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin', "*");//which domains are able to access the resources from backend
  //this will allow requests to be made with these special headers. The requests do not need to include these headers, but they can. and no other special header will be allowed
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization, multipart/form-data")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");//define what methods can be sent to the backend app. OPTIONS is important because by default it sends OPTIONS method along with any other
  //method, but if you explicity define which methods can be sent like GET, POST... and then not include "OPTIONS" the app will break.
  next();//should be able to continue
})

app.use('/api/newEvents', newEvents);
// app.use('/api/pastEvents', pastEvents);

app.use('/api/pastEvents', pastEvents);

module.exports = app;
