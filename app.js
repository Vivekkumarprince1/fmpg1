//app.js
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressSession = require("express-session");
const passport = require('passport');
const flash = require("connect-flash");
const cluster = require('cluster'); // Cluster module for multi-core usage
const os = require('os'); // To get the number of CPU cores

const roomdb = require('./routes/roomdb');
const propertyroutes = require('./routes/propertyroutes');
var indexRouter = require('./routes/index');
var usersRouter = require('./models/users');
const adminRoutes = require('./routes/adminroutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const forgotRoutes = require('./routes/forgot');
const contactroutes = require('./routes/contactroutes');
const ownerRoutes = require('./routes/ownerroutes');
const bookingRoutes = require('./routes/bookingroutes'); 


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session and flash setup
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: "hey hey",
  cookie: { secure: false }
}));

app.use(flash());

app.use('/api/bookings', bookingRoutes);
app.post('/api/bookings', (req, res) => {
  console.log('Received Headers:', req.headers);
  console.log('Received Body:', req.body);
  res.send('Received');
});



// Passport initialization
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(usersRouter.deserializeUser());


// Session-based message middleware
app.use((req, res, next) => {
  res.locals.successMessage = req.session.successMessage || null;
  res.locals.errorMessage = req.session.errorMessage || null;

  // Clear the messages after they are displayed
  req.session.successMessage = null;
  req.session.errorMessage = null;
  
  next();
});


// Routes setup
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/Room', roomdb );
app.use('/Property',propertyroutes);
app.use('/admin', adminRoutes);
app.use('/admin/analytics', analyticsRoutes);
app.use('/forgot', forgotRoutes);
app.use('/',contactroutes);
app.use('/owner', ownerRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Set the port and start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



module.exports = app;
