///<reference path="../../../typings/tsd.d.ts" />
var connect = require("connect")
    , serveStatic = require("serve-static")
    , http = require("http")
    , compression = require("compression")
    ;

var app = connect();
app.use(serveStatic(__dirname, {
    "index": ["static/index.html"]
}));
app.use(compression());

http.createServer(app).listen(3000);
