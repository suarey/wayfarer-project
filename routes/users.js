const
  express = require('express'),
  usersRouter = new express.Router(),
  passport = require('passport')

// render login view
usersRouter.get('/login', (req, res) => {
  res.render('login', { message: req.flash('loginMessage')})
})

usersRouter.post('/login', passport.authenticate('local-login', {
  successRedirect: "/users/profile", 
  failureRedirect: "/users/login"
}));

// render signup view
usersRouter.get('/signup', (req, res) => {
  res.render('signup', {message: req.flash('signupMessage')})
})

usersRouter.post('/signup', passport.authenticate('local-signup', {
  successRedirect: "/users/profile", 
  failureRedirect: "/users/signup"
}));

usersRouter.get('/profile', isLoggedIn, (req, res) => {
  // Renders the users profile (only if they are currently logged in)
    res.render('profile', {user: req.user});
});


usersRouter.get('/profile/edit', isLoggedIn, (req,res) => {
    res.render('editProfile');
})

usersRouter.patch('/profile', isLoggedIn, (req, res) => {
  // checking to see if the request body has a truthy password key (meaning they are trying to change their password)
  // If not, remove it from the request body so that our app doesn't try to hash an empty password string
  if(!req.body.password) delete req.body.password;
  // Take the remaining key/value pairs from the request body, and merge them into the current user object
  Object.assign(req.user, req.body);
  // Finally save the current user 
  req.user.save(( err, updatedUser) => {
    if(err) return console.log(err);
    res.redirect('/users/profile');

  })
})


usersRouter.get('/logout', (req, res) => {
  // Destroy the session, and redirect the user back to the homepage
    req.logout();
    res.redirect('/');
})

// A method used to authorize a user BEFORE allowing them to proceed to the profile page
function isLoggedIn(req, res, next) {
  // if the user is authenticated, proceed to the request route
    if (req.isAuthenticated()) return next()
    // Otherwise, return them to the login page
    res.redirect('/users/login');
}

module.exports = usersRouter