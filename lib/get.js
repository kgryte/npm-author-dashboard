'use strict';

// MODULES //

var debug = require( 'debug' )( 'npm-author-dashboard:get' );
var getKeys = require( 'object-keys' ).shim();
var request = require( './request.js' );


// GET //

/**
* FUNCTION: get( urls, done )
*	Retrieves badges.
*
* @param {Object} urls - badge urls
* @param {Function} done - callback to invoke upon retrieving all badges
* @returns {Void}
*/
function get( urls, done ) {
	var count;
	var cache;
	var keys;
	var len;
	var key;
	var i;

	keys = getKeys( urls );
	len = keys.length;

	cache = new Array( len );

	debug( 'Total badges: %d.', len );
	count = 0;
	for ( i = 0; i < len; i++ ) {
		key = keys[ i ];
		cache[ i ] = {
			'name': key,
			'url': urls[ key ].url,
			'badge': null,
			'message': null
		};
		debug( 'Requesting badge `%s` (%d)...', key, i );
		request( urls[ key ].image, onBadge( key, i ) );
	}

	/**
	* FUNCTION: onBadge( key, idx )
	*	Returns a callback to be invoked upon receiving a badge.
	*
	* @private
	* @param {String} key - badge name
	* @param {Number} idx - badge index
	* @returns {Function} callback
	*/
	function onBadge( key, idx ) {
		/**
		* FUNCTION: onBadge( error, badge )
		*	Callback to be invoked upon receiving a badge.
		*
		* @private
		* @param {Error|Null} error - error object
		* @param {String} badge - badge HTML
		* @returns {Void}
		*/
		return function onBadge( error, badge ) {
			debug( 'Processing badge `%s` (%d) response...', key, idx );

			if ( error ) {
				cache[ idx ].message = error.message;
			} else {
				cache[ idx ].badge = badge;
			}
			debug( 'Badge `%s` (%d) processed.', key, idx );
			next();
		}; // end FUNCTION onBadge()
	} // end FUNCTION onBadge()

	/**
	* FUNCTION: next( error )
	*	Callback invoked upon processing a badge.
	*
	* @private
	* @param {Error|Null} error - error object
	* @returns {Void}
	*/
	function next( error ) {
		if ( error ) {
			return done( error );
		}
		count += 1;
		debug( 'Request %d of %d complete.', count, len );
		if ( count < len ) {
			return;
		}
		debug( 'Completed all badge requests.' );
		done( null, cache );
	} // end FUNCTION next()
} // end FUNCTION get()


// EXPORTS //

module.exports = get;
