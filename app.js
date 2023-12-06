const express = require('express');
const path = require('path');
const router = require('./routes/myRouter');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

// This line for POST method to see inside object
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({ secret: "mysession", resave: false, saveUninitialized: false }));

// Middleware check login status
const checkLoginStatus = (req, res, next) => {
    if (req.session && req.session.login) {
        res.locals.username = req.session.username;
    }
    next();
};

// Use the middleware for all routes
app.use(checkLoginStatus);

// Use routes
app.use(router);

// for static folder => public
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
