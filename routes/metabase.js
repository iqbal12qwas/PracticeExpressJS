const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    var jwt = require("jsonwebtoken");
    var METABASE_SITE_URL = "http://172.17.62.84:3000";
    var METABASE_SECRET_KEY = "45eefc864c3f55f2602a8a77afb1a9593f337b149dc624c7853ba75d60b5a055";

    var payload = {
        resource: { dashboard: 65 },
        params: {}
    };
    var token = jwt.sign(payload, METABASE_SECRET_KEY);

    var iframeUrl = METABASE_SITE_URL + "/embed/dashboard/" + token + "#bordered=true&titled=true";

    var test = "test 1"
    res.render("../views/metabase.html", { name: iframeUrl, test: test });
});

module.exports = router;