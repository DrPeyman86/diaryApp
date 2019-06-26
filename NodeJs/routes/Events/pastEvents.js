const express = require('express');
const Events = require('../../models/events')

const router = express.Router();

router.get('', async (req,res,next)=>{
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.currentPage;

  try {
    const eventsQuery = await Events.find({}, null, {skip: currentPage, limit: pageSize});

    return res.status(200).json({
      Status: 'Success',
      content: eventsQuery,
      eventCount: eventsQuery.length
    })
  } catch (e) {
    return res.status(401).json({
      Status: 'Error',
      content: e
    })
  }


  //console.log(eventsQuery);


})


module.exports = router;
