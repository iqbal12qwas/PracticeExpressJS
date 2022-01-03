const express = require('express');
const con = require("../connection.js");

const router = express.Router();

const crypto = require('crypto');

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');

    return hash;
};

//Get All Account 
router.get('/', (req, res) => {
    con.query('SELECT * FROM tb_account', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

router.get('/parsing_value', (req, res) => {
    res.render("../views/value.html");
});

//Get Account by ID
router.get('/:id', (req, res) => {
    con.query('SELECT * FROM tb_account WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});


//Delete Account by ID
router.delete('/:id', (req, res) => {
    con.query('DELETE FROM tb_account WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send('Deleted Success');
        } else {
            console.log(err);
        }
    })
});

//Post Account
router.post('/', (req, res) => {
    var acc = req.body;
    var values = [];
    for (var i = 0; i < acc.length; i++) {
        values.push([acc[i].name, acc[i].email, acc[i].username, getHashedPassword(acc[i].password)]);
    }
    con.query('INSERT INTO `tb_account`(`name`, `email`, `username`, `password`) VALUES ?', [values], (err, rows, fields) => {
        if (!err) {
            res.send('Inserted account : ' + rows);
        } else {
            console.log(err);
        }
    })
});

//Update Account
router.patch('/', (req, res) => {
    var acc = req.body;
    con.query('UPDATE `tb_account` SET `name`= ?, `email`= ?, `username`= ?, `password`= ? WHERE `id` = ?',
        [acc.name, acc.email, acc.username, getHashedPassword(acc.password), acc.id], (err, rows, fields) => {
            if (!err) {
                res.send('Update Data Succsess ID : ' + acc.id);
            } else {
                console.log(err);
            }
        })
});

module.exports = router;