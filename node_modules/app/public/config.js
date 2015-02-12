/*
just set config depending on env
 */

var env = process.env.NODE_ENV || 'development'

if(env === 'development'){
	var config = {

	}
	
}else if(env === 'production'){
	var config = {

	}
}

module.exports = config