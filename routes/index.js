var fs = require('fs')
var path = require('path')

var through2 = require('through2')

var JSONStream = require('JSONStream')
var handlebars = require('handlebars-stream');

module.exports = function (req, res, params) {
    
    var template = read('index.hbs')
	
	layout(res)
    
    function layout (res) {
	    res.setHeader('content-type', 'text/html');
	    
	    var dataStream = readData();
	     // var parser = JSONStream.parse(['data', true])

	     var tmpl = read('index.hbs')
	     var tr = handlebars(tmpl)
	     
	     
	    tr.pipe(res)

	    tr.end(JSON.parse(dataStream).data)


	    
	}

	function read (file) {
	    return fs.readFileSync('./static/' + file).toString();
	}

	function readData() {
		// return fs.createReadStream('./data/data.json')
		return fs.readFileSync('./data/data.json')
	}
};