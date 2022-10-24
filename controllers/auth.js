const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAutheticated: req.session.user
    });
};

exports.postLogin = (req, res, next) => {
    User.findById('635281a9a666c8a588fd58c6')
        .then(user => {
            req.session.isLoggedIn = true;
            req.session.user = user;
            req.session.save((err) => {
                res.redirect('/');
            });
        })
        .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};