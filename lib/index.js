'use strict';

// MODULES //

var debug = require( 'debug' )( 'npm-author-dashboard:main' );
var list = require( 'npm-list-author-packages' );
var pkginfo = require( 'npm-registry-package-info' );
var getKeys = require( 'object-keys' ).shim();
var mustache = require( 'mustache' );
var template = require( './template' );
var badgeUrls = require( './urls.js' );
var getBadges = require( './get.js' );


// FIXME!
var fs = require( 'fs' );
var path = require( 'path' );


// VARIABLES //

var NUM_CONCURRENT_REQUESTS = 10; // heuristic


// TEMPLATES //

mustache.parse( template.html );


// BUILD //

/**
* FUNCTION: build( options )
*	Builds a dashboard.
*
* @param {Object} options - function options
* @param {String} options.username - author username
* @returns {Void}
*/
function build( options ) {
	list( options, onList );
} // end FUNCTION build()

/**
* FUNCTION: onList( error, list )
*	Callback invoked upon receiving a package list.
*
* @param {Error|Null} error - error object
* @param {String[]} list - package list
* @returns {Void}
*/
function onList( error, list ) {
	if ( error ) {
		throw error;
	}
	// TODO: remove
	list = list.slice( 0, 10 );
	pkginfo( {'packages': list}, onPkgs );
} // end FUNCTION onList()

/**
* FUNCTION: onPkgs( error, pkgs )
*	Callback invoked upon receiving package info.
*
* @param {Error|Null} error - error object
* @param {Object} pkgs - package info
* @returns {Void}
*/
function onPkgs( error, pkgs ) {
	var count;
	var cache;
	var keys;
	var len;
	var idx;
	var N;
	var i;
	if ( error ) {
		throw error;
	}
	// Get a list of successfully resolved packages:
	keys = getKeys( pkgs.data );
	len = keys.length;
	debug( 'Total packages: %d.', len );

	// Cache to store package results:
	cache = new Array( len );

	// Package id:
	idx = 0;

	// Number of completed requests:
	count = 0;

	// Determine how many concurrent requests should be made...
	if ( len < NUM_CONCURRENT_REQUESTS ) {
		N = len;
	} else {
		N = NUM_CONCURRENT_REQUESTS;
	}
	debug( 'Number of concurrent requests: %d.', N );

	debug( 'Resolving package badges...' );
	for ( i = 0; i < N; i++ ) {
		next();
	}

	/**
	* FUNCTION: next()
	*	Resolves package badges for the next package in the queue. Once all packages are resolved, invokes the provided callback.
	*
	* @private
	* @returns {Void}
	*/
	function next() {
		var urls;
		var pkg;
		var key;
		if ( count === len ) {
			debug( 'Resolved all packages.' );

			// TODO: replace with clbk

			var view = mustache.render( template.html, {
				// FIXME:
				'username': 'kgryte',
				'bootstrap': template.bootstrap,
				'styles': template.styles,
				'packages': cache
			});
			fs.writeFileSync( path.resolve( __dirname, '../index.html' ), view, 'utf8' );
			return;
		}
		if ( idx < len ) {
			key = keys[ idx ];

			debug( 'Resolving package badges for `%s` (%d)...', key, idx );

			pkg = pkgs.data[ key ];
			urls = badgeUrls( pkg );

			getBadges( urls, clbk( key, pkg.description, idx ) );

			idx += 1;
		}
	} // end FUNCTION next()

	/**
	* FUNCTION: clbk( key, desc, idx )
	*	Returns a callback to be invoked upon resolving a package's badges.
	*
	* @private
	* @param {String} key - package name
	* @param {String} desc - package description
	* @param {Number} idx - package index
	* @returns {Function} callback
	*/
	function clbk( key, desc, idx ) {
		/**
		* FUNCTION: clbk( error, badges )
		*	Callback to be invoked upon resolving a package's badges.
		*
		* @private
		* @param {Error|Null} error - error object
		* @param {Object[]} badges - array of badges
		* @returns {Void}
		*/
		return function clbk( error, badges ) {
			if ( error ) {
				throw error;
			}
			debug( 'Resolved package badges for `%s` (%d).', key, idx );
			cache[ idx ] = {
				'name': key,
				'desc': desc,
				'badges': badges
			};

			count += 1;
			debug( 'Resolved %d of %d packages.', count, len );
			next();
		}; // end FUNCTION clbk()
	} // end FUNCTION clbk()
} // end FUNCTION onPkgs()


// EXPORTS //

module.exports = build;
