var layout = require('layout')
var encode = require('he').encode;

module.exports = function (req, res, params) {
    layout(res).end('welcome!');
};