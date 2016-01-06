'use strict';

// MODULES //

var fs = require( 'fs' );


// TEMPLATE //

var template = {};

template.html = fs.readFileSync( __dirname + '/template.html', 'utf8' );

template.bootstrap = fs.readFileSync( __dirname + '/bootstrap.css', 'utf8' );

template.styles = fs.readFileSync( __dirname + '/styles.css', 'utf8' );


// EXPORTS //

module.exports = template;
