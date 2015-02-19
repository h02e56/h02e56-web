var env = process.env.NODE_ENV || 'production'

var alloc = require('tcp-bind');
var minimist = require('minimist');
var argv = minimist(process.argv.slice(2), {
    alias: { p: 'port', u: 'uid', g: 'gid' },
    default: { port: require('is-root')() ? 80 : 8000 }
});
var fd = alloc(argv.port);
if (argv.gid) process.setgid(argv.gid);
if (argv.uid) process.setuid(argv.uid);

var http = require('http');
var ecstatic = require('ecstatic')(__dirname + '/static');
var body = require('body/any');
var xtend = require('xtend');
var path = require('path');

var config = require('./config.js')
var browserSync = require('browser-sync')

var router = require('routes')();

router.addRoute('/', require('./routes/index.js'))

var server = http.createServer(function (req, res) {
    var m = router.match(req.url);
    if (m) m.fn(req, res, m.params);
    else ecstatic(req, res)
});
server.listen({ fd: fd }, function () {
    if(env === 'development') fireBrowserSync()
    console.log('listening on :' + server.address().port);
});

function post (fn) {
    return function (req, res, params) {
        if (req.method !== 'POST') {
            res.statusCode = 400;
            res.end('not a POST\n');
        }
        body(req, res, function (err, pvars) {
            fn(req, res, xtend(pvars, params));
        });
    };
}

//browser sync stuff
function fireBrowserSync () {
  browserSync({
    proxy: 'localhost:' + argv.port,
    files: [
        './static/js/build.js',
        './routes/*.js',
        './static/css/*.css',
        './static/*.hbs',
        './data/*.json' 
    ]
  });
}
