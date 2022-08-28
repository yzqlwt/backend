var express = require('express');
const { Client } = require('ssh2');
const { json } = require("express");
var router = express.Router();

/* GET users listing. */
// router.get('/', function (req, res, next) {
//     const content = {
//         "version": "1.0",
//         "response": {
//             "open_mic": false,
//             "to_speak":{
//                 "type": 0,
//                 "text": "好嘞，您稍等"
//             }
//         },
//         "is_session_end": true
//     }
//     res.json(content);
// });



router.post('/', function (req, res, next) {
    const conn = new Client();
    conn.on('ready', () => {
        console.log('Client :: ready');
        conn.exec('node wakeup/wakeup.js', (err, stream) => {
            if (err) throw err;
            stream.on('close', (code, signal) => {
                console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                conn.end();
            }).on('data', (data) => {
                console.log('STDOUT: ' + data);
            }).stderr.on('data', (data) => {
                console.log('STDERR: ' + data);
            });
        });
    }).connect({
        host: 'www.yzqlwt.com',
        port: 10004,
        username: 'yzqlwt',
        password: 'xuanli0912_'
    });
    const content = {
        "version": "1.0",
        "response": {
            "open_mic": false,
            "not_understand": false,
            "to_speak": {
                "type": 0,
                "text": "好嘞，您稍等"
            }
        },
        "is_session_end": true
    }
    res.json(content);
});

module.exports = router;