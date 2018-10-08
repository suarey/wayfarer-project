// require('dotenv').config()

const 
    express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    ejsLayouts = require('express-ejs-layouts'),
    flash = require('connect-flash'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    MongoDBStore = require('connect-mongodb-session')(session),
    passport = require('passport'),
    passportConfig = require('./config/passport'),
    methodOverride = require('method-override'),
    placesRouter = require('./routes/places.js'),
    usersRouter = require('./routes/users.js'),
    logger = require('morgan');

// Environment port
    const
	port = process.env.PORT || 3000,
	mongoConnectionString = process.env.MONGODB_URI || 'mongodb://localhost/passport-authentication'


mongoose.connect(mongoConnectionString, (err) => {
    console.log(err || `Connected to MONGODB (passport-authentication)`);
})


// will store session information as a 'sessions' collection in Mongo
const store = new MongoDBStore({
    uri: mongoConnectionString,
    collection: 'sessions'
  });


// Middleware
app.use(logger('dev'))
// Allows us to parse the body object attached to requests for form data.
app.use(express.json())
// app.use(express.static('public')) // ONLY FOR SPA
app.use(cookieParser()) // interpret cookies that are attached to requests
app.use(express.urlencoded({extended: true})) // interpret standard form data in requests
app.use(flash()) // set and reset flash messages
app.use(methodOverride('_method')) // Allows use to use 'PATCH', 'PUT', and 'DELETE' in HTML forms

// ejs configuration
app.set('view engine', 'ejs')
app.use(ejsLayouts)


// session and passport
app.use(session({
	secret: "randomString", 
	cookie: { maxAge: 600000 }, 
	resave: true,
	saveUninitialized: false, 
	store: store
}));

// This is initializing middleware
app.use(passport.initialize());
// Keeping track of session
app.use(passport.session());

app.use((req, res, next) => {
	app.locals.currentUser = req.user;
	app.locals.loggedIn = !!req.user

	next();
})

//root route
app.get('/', (req,res) => {
	res.render('index')
})

app.use('/users', usersRouter)
app.use('/places', placesRouter);

app.listen(port, (err) => {
	console.log(err || "Server running on port " + port)
})