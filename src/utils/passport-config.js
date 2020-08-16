/**
 * ! PASSPORT CONFIGURATION
 * * STRATEGY
 * * PASSPORT-LOCAL
*/

const LocalStrategy = require('passport-local').Strategy,
    User = require('../models/UserModel'),
    bcrypt = require('bcrypt');
// ----------------------------------------------------- \\

const chalk = require('chalk'),
    log = console.log,
    msg = chalk.bold.blue,
    scs = chalk.bold.green,
    wrn = chalk.bold.yellow,
    err = chalk.bold.red;
// ----------------------------- \\

function initializePassport(passport) {
    passport.use(
        new LocalStrategy(function (username, password, done) {
            User.findOne({ username: username }, async function (error, user) {
                if (error) {
                    log('Passport - Err!: ' + wrn(error));
                    return done(error);
                }
                if (!user) {
                    log('Passport - User Not Found!');
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (!(await bcrypt.compare(password, user.password))) {
                    log(err('Passport - Wrong Password!'));
                    return done(null, false, { message: 'Incorrect password.' });
                }
                log('Passport - USER: ' + msg(user));
                return done(null, user);
            });
        })
    );

    passport.serializeUser(function (user, done) {
        // log('Passport - SERIALIZE USER: ' + msg(user));
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        log('Passport - DESERIALIZE USER: ' + msg(user));
        done(null, user);
    });
}

function checkAuthenticated(req, res, next) {
    log(msg('IS AUTHENTICATED: ') + req.isAuthenticated());
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}

module.exports = {
    initializePassport: initializePassport,
    checkAuthenticated: checkAuthenticated,
    checkNotAuthenticated: checkNotAuthenticated
};