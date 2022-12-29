require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose'); 
const session = require('express-session');
const flash = require('connect-flash');
const morgan = require('morgan');
const moment = require('moment');
const ExpressError = require('./utils/ExpressError');

const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/convert';
const PORT = process.env.PORT || 3000;

const app = express();

const indexRoutes = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

const sessionConfig = {
    secret: process.env.SECRET || "WWa9PzMT7iH9Bc,G9n1wv8-.@'.|$~",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: false,
        secure: false,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());
app.locals.moment = moment;

app.use((req, res, next) => {
    res.locals.currentUser = req.session.admin;
    res.locals.errorMessage = req.flash('errorMessage');
    res.locals.successMessage = req.flash('successMessage');
    next();
});

app.use(indexRoutes);

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Internal Server Error!'
    console.log("==========================ERROR START==============================");
    console.log(err);
    console.log("==========================ERROR END==============================");
    res.status(statusCode).render('error', { err });
});

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
});