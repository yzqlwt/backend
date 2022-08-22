var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    const content = {
        "version": "1.0",
        "response": {
            "open_mic": false,
            "to_speak":{
                "type": 0,
                "text": "好嘞，您稍等"
            }
        },
        "is_session_end": true
    }
    res.send(content);
});

module.exports = router;
