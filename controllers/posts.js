// server.js
const Place = require('../models/Place')


// Create post
exports.create = (req, res) => {
    // console.log("REQ PARAMS", req.params)
    // let { place_id } = req.params;
    Place.findById(req.params.place_id, (err, place) => {
        if(err) return res.render('places', { success: false, err });
        console.log("what place was found? ", place)
        // let a =  {fruit:"apple"} 
        // let b = {color:"red"}
        // let c = {...a, ...b};
        // console.log("req.body", req.body)
        // console.log("req.user", req.user)

        place.posts.push({...req.body, ...{author:req.user}});  //When using through the site instead of postman
        // place.post.push({...req.body, ...{author:"5bbb8ab6f26d0f7dafe310d3"}}) //For use when creating posts in PostMan
        place.save((err, place) => {
            if (err) res.render({ success: false, err })
            res.redirect(`/places/${place._id}`)
            
        })
    })
}

// NEW PROPERTY

exports.new = (req, res) => {
        let { place_id, id} = req.params;

        res.render('places/posts/new', {place_id})

};


// Show post
exports.show = (req, res) => {
    let { place_id, id } = req.params;
    
    Place.findById(place_id, (err, place) => {
        if (err) res.render({ success: false, err });

        if (place.posts.id(id)) {
            let post = place.posts.id(id)
            res.render('places/posts/showpost', { success: true, place_id, post })
        } else {
            res.render('posts/showpost', { success: false, payload: "Post does not exist." })
        }
    })
}


exports.edit = (req, res) => {
    let { place_id, post_id} = req.params;
    Place.findById(place_id, (err, place) => {
        if (err) res.json({success: false, payload: err});
        let post = place.posts.id(post_id);
        if(post) {
            res.render('places/posts/edit', { post, place_id});
        } else {
            res.json({ success: false, payload: "Post does not exist"});
        }
    })
}

// Update Post
exports.update = (req, res) => {
    let { place_id, post_id } = req.params;
    let { body } = req;
    Place.findById(place_id, (err, place) => {
        // if (err) res.json({ success: false, err });
        let post = place.posts.id(post_id)
       
        // If fight exists...
        if (post) {

            for (let key in body) { post[key] = body[key]}
            place.save((err, place) => {
                if (err) res.json({ success: false, err});
                res.redirect(`/places/${place_id}/posts/${post_id}`)
            });
        } else {
            res.json({ success: false, payload: "Post does not exist."})
        }
    })
        
    }



// Delete Post
exports.delete = (req, res) => {
    let { place_id, id } = req.params;
    Place.findById(place_id, (err, place) => {
        if (err) res.json({ success: false, err });

        let post = place.posts.id(id);
        if (post) {
            post.remove();
            place.save((err, post) => {
                if (err) res.render({ success: false, err });
                // res.json({ success: true, payload: place });
                res.redirect(`/places/${place_id}`)
            })
        } else {
            res.json({ success: false, payload: "Post does not exist." })
        }
    })
}

