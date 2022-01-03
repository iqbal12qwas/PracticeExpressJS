const express = require('express');
const session = require('express-session');
const con = require("../connection.js");

const router = express.Router();

const crypto = require('crypto');

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');

    return hash;
};

router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

router.get('/', (req, res) => {
    res.send('Username : ' + req.session.username);
});

//Auth Sign In
router.post('/', function (req, res) {
    var username = req.body.username;
    var password = getHashedPassword(req.body.password);
    if (username && password) {
        con.query('SELECT * FROM tb_account WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                res.send('Login Success');
            } else {
                res.send('Incorrect Username and/or Password!');
            }
            res.end();
        });
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
});

module.exports = router;