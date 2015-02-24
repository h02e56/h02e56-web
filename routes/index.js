var fs = require('fs')
var path = require('path')


var JSONStream = require('JSONStream')
var handlebars = require('handlebars-stream');
var through = require('through2')

module.exports = function (req, res, params) {

	var dataStream = readData();
    var tmpl = readTemplate('index.hbs')

    var JSONparser = JSONStream.parse('data')  
    var ht = handlebars(tmpl)    
 	
 	layout(res)
    
    function layout (res) {
	    res.setHeader('content-type', 'text/html');
	    dataStream.pipe(JSONparser).pipe(ht).pipe(res)     
	}

	function readTemplate (file) {
	    return fs.readFileSync('./static/' + file).toString();
	}

	function readData() {
		return fs.createReadStream('./data/data.json')
	}

	
	
	
};