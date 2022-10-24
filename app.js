const path = require('path');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const port = 8080;

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI = process.env.MONGODBURI;

const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const { log } = require('console');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false, store: store }));

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes)

app.use(errorController.get404);

mongoose.connect(MONGODB_URI)
    .then(() => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'Ben',
                    email: 'ben@gmail.com',
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        })
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    })
    .catch(err => {
        console.log(err);
    })