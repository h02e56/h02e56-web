var fs = require('fs')
var path = require('path')
// var trumpet = require('trumpet');

var Handlebars = require('app/handlebars')
var index = require("../views/index.hbs");

var encode = require('he').encode;

module.exports = function (req, res, params) {
    
    layout(res).end('welcome!');

    function layout (res) {
	    res.setHeader('content-type', 'text/html');
	    var tr = trumpet();
	    read('layout.html').pipe(tr).pipe(res);
	    return tr.createWriteStream('#body');
	}

	function read (file) {
	    return fs.createReadStream(path.join('./static', file));
	}
};