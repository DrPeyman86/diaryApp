const express = require('express');
const Events = require('../../models/events')

const router = express.Router();//call the router constructor

router.post("", (req,res,next)=>{
  console.log('body: ', req.body);

  const event = new Events({
    type: req.body.eventType,
    date: req.body.eventDate,
    name: req.body.eventName,
    comments: req.body.eventComment
  })
  //console.log(event);
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
    //console.log(error);
    res.status(500).json({
      message: error.message
    })
  })

})





module.exports = router;//export the router so that it can be used where this file was called from. in app.js
