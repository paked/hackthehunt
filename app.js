var express = require('express');
var fs = require('fs');
var multer  = require('multer');
var restler = require('restler');
var upload = multer({dest: 'uploads/'});

var app = express();
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'example.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/qr_scan', upload.single('qr'), function (req, res, next) {
    restler.post("http://api.qrserver.com/v1/read-qr-code?outputformat=json", {
        multipart: true,
        data: {
            file: restler.file(req.file.path, null, req.file.size, null, req.file.mimetype)
        }
    }).on("complete", function(data) {
        res.send(data);
    });

    console.log(req.file.size, req.file.mimetype, req.file.path);

    console.log(req.file);
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
