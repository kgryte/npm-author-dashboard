'use strict';

// MODULES //

var debug = require( 'debug' )( 'npm-author-dashboard:request' );
var http = require( 'http' );
var https = require( 'https' );


// REQUEST //

/**
* FUNCTION: request( url, clbk )
*	Requests a resource from a remote endpoint.
*
* @param {String} url - remote endpoint
* @param {Function} clbk - callback to invoke upon fetching a resource
* @returns {Void}
*/
function request( url, clbk ) {
	var body;
	var get;
	var req;
	var err;
	if ( /^https/.test( url ) ) {
		get = https.request;
	} else {
		get = http.request;
	}
	debug( 'Request url: %s', url );
	req = get( url, onResponse );
	req.on( 'error', onError );
	req.end();

	/**
	* FUNCTION: onError( error )
	*	Event listener invoked upon encountering an error.
	*
	* @private
	* @param {Error} error - error object
	* @returns {Void}
	*/
	function onError( error ) {
		debug( 'Error encountered while attempting to make request: %s', error.message );
		clbk( error );
	} // end FUNCTION onError()

	/**
	* FUNCTION: onResponse( response )
	*	Callback invoked upon receiving a response.
	*
	* @private
	* @param {Object} response - HTTP response object
	* @returns {Void}
	*/
	function onResponse( response ) {
		if ( response.statusCode !== 200 ) {
			err = {
				'status': response.statusCode,
				'message': ''
			};
		}
		debug( 'Received response.' );
		debug( 'Response status: %d', response.statusCode );
		debug( 'Response headers: %s', JSON.stringify( response.headers ) );

		body = '';

		response.setEncoding( 'utf8' );
		response.on( 'data', onData );
		response.on( 'end', onEnd );
	} // end FUNCTION onResponse()

	/**
	* FUNCTION: onData( chunk )
	*	Event listener invoked upon receiving response data.
	*
	* @private
	* @param {String} chunk - data chunk
	* @returns {Void}
	*/
	function onData( chunk ) {
		body += chunk;
	} // end FUNCTION onData()

	/**
	* FUNCTION: onEnd()
	*	Event listener invoked upon a response end.
	*
	* @private
	* @returns {Void}
	*/
	function onEnd() {
		if ( err ) {
			err.message = body;
			return onError( err );
		}
		clbk( null, body );
	}
} // end FUNCTION request()


// EXPORTS //

module.exports = request;
