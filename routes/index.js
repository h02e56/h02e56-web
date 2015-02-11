var fs = require('fs')
var path = require('path')

var handlebars = require('handlebars-stream');

module.exports = function (req, res, params) {
    
    var template = read('index.hbs')
	
	layout(res)
    
    function layout (res) {
	    res.setHeader('content-type', 'text/html');
	    var temp = handlebars(template)
	    temp.write({date: new Date()})
	    temp.on('data', function (chunk){
	    	res.end(chunk)
	    })
	}

	function read (file) {
	    return fs.readFileSync('./static/' + file).toString();
	}
};