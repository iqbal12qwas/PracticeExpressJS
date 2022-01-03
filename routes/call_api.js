const express = require('express');

const router = express.Router();
var request = require('request');

router.get('/with_params', function (req, res, next) {
    var params = "?start=2013-09-01&end=2013-09-05"
    request.get({
        url: 'https://api.coindesk.com/v1/bpi/currentprice.json' + params,
        headers: {
            "content-type": "application/json"
        },
    }, (err, response, body) => {
        if (err) {
            res.send(err);
        } else {
            res.send(body);
        }
    });
});


router.get('/', function (req, res, next) {
    request.get({
        url: 'https://catfact.ninja/fact',
        headers: {
            "content-type": "application/json"
        },
    }, (err, response, body) => {
        if (err) {
            res.send(err);
        } else {
            res.send(body);
        }
    });
});



module.exports = router;