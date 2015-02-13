var fs = require('fs')
var path = require('path')

var handlebars = require('handlebars-stream');

module.exports = function (req, res, params) {
    
    var template = read('index.hbs')
	
	layout(res)
    
    function layout (res) {
	    res.setHeader('content-type', 'text/html');
	    var strm = handlebars(template)
	    strm.write({title: 'josep boada solass'})
	    strm.on('data', function (chunk){
	    	res.end(chunk)
	    })
	}

	function read (file) {
	    return fs.readFileSync('./static/' + file).toString();
	}
};