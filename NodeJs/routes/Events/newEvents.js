const express = require('express');
const Events = require('../../models/events')

const router = express.Router();//call the router constructor

router.post("", (req,res,next)=>{
  //console.log('body: ', req);

  const event = new Events({
    type: req.body.eventtype,
    date: req.body.eventDate,
    name: req.body.eventName,
    comments: req.body.eventComments
  })
  console.log(event);
  event.save().then((createdEvent)=>{
    res.status(200).json({
      message: 'Event created successfully',
      event: {
        ...createdEvent,
        id: createdEvent._id
      }
    })
  })
  .catch(error=>{
    res.status(500).json({
      message: 'Body not valid'
    })
  })

})





module.exports = router;//export the router so that it can be used where this file was called from. in app.js
