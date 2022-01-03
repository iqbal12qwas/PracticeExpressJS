const express = require('express');
const upload = require('express-fileupload');

const router = express.Router();

router.use(upload());

router.post('/', (req, res) => {
if (req.files) {
    var file = req.files.file;
        console.log(file);
        var filename = file.name;

        file.mv('./uploads/' + filename, function (err) {
            if (!err) {
                res.send("Upload Success");
            } else {
                console.log(err);
            }
        })
    }
});

router.put('/', (req, res) => {
 if (req.files) {
        var file = req.files.file;
        console.log(file);
        var filename = file.name;

        file.mv('./uploads/' + filename, function (err) {
            if (!err) {
                res.send("Upload Success");
            } else {
                console.log(err);
            }
        })
    }
});

module.exports = router;