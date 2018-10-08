// server.js
const Place = require('../models/Place')


// Get all Places
exports.index = (req,res) => {
    Place.find({}, (err, places) => {
        if(err) return console.log(err) 
        res.json({ success: true, payload: places})
        // res.render('places/index', { success: true, payload: places})
    })
}


// Create a new place
exports.create = (req, res) => {
    Place.create(req.body, (err, place) => {
        if(err) return res.json({ success: false, err });
        res.json({success: true, payload: place});
    })
}

// SHOW A PLACE
exports.show = (req,res) => {
    Place.findById(req.params.id, (err, places) => {
        if(err) return console.log(err) 
        res.json({ success: true, payload: places})
        // res.render('cities/index', { success: true, payload: places})
    })
}

// UPDATE A PLACE
exports.update = (req,res) => {
    Place.findByIdAndUpdate(req.params.id, req.body, (err, updatePlaces) => {
        if(err) return console.log(err) 
        res.json({ success: true, payload: updatePlaces})
        // res.render('cities/index', { success: true, payload: places})
    })
}

// DELETE A PLACE
exports.delete = (req,res) => {
    Place.findByIdAndRemove(req.params.id, (err, places) => {
        if(err) return console.log(err) 
        res.json({ success: true, payload: places})
       
    })
}