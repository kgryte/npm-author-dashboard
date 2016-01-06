'use strict';

// MODULES //

var parse = require( 'url' ).parse;
var npmv = require( 'shields-badge-url-npm-version' );
var npmd = require( 'shields-badge-url-npm-downloads' );
var codecov = require( 'shields-badge-url-codecov' );
var coveralls = require( 'shields-badge-url-coveralls' );
var david = require( 'shields-badge-url-david' );
var travisci = require( 'shields-badge-url-travisci' );
var ghissues = require( 'shields-badge-url-github-issues' );
var ghsocial = require( 'shields-badge-url-github-social' );


// VARIABLES //

var STYLE = 'flat';
var FORMAT = 'svg';


// GITHUB SLUG //

/**
* FUNCTION: getRepo( url )
*	Converts a Github repo URL to an object.
*
* @private
* @param {String} url - repo url
* @returns {Object}  repo info
*/
function getRepo( url ) {
	var path = parse( url ).pathname.split( '/' );
	return {
		'owner': path[ 1 ],
		'repo': path[ 2 ].slice( 0, -4 )
	};
} // end FUNCTION getRepo()


// BADGE URLS //

/**
* FUNCTION: urls( pkg )
*	Returns badge URLs.
*
* @param {Object} pkg - package json
* @returns {Object} badge hash
*/
function urls( pkg ) {
	var latest;
	var repo;
	var out;

	out = {};

	// NPM version...
	out.version = npmv({
		'package': pkg.name,
		'style': STYLE,
		'format': FORMAT
	});

	// NPM downloads...
	out.downloads = npmd({
		'package': pkg.name,
		'style': STYLE,
		'format': FORMAT,
		'period': 'monthly'
	});

	// Repository info:
	repo = getRepo( pkg.repository.url );

	// Travis CI...
	out.build = travisci({
		'owner': repo.owner,
		'repo': repo.repo,
		'style': STYLE,
		'format': FORMAT
	});

	// Latest package version:
	latest = pkg.versions[ pkg[ 'dist-tags' ].latest ];

	// Codecov...
	if ( latest && latest.devDependencies ) {
		if ( latest.devDependencies[ 'codecov.io' ] ) {
			out.coverage = codecov({
				'owner': repo.owner,
				'repo': repo.repo,
				'style': STYLE,
				'format': FORMAT
			});
		}
		else if ( latest.devDependencies[ 'coveralls' ] ) {
			out.coverage = coveralls({
				'owner': repo.owner,
				'repo': repo.repo,
				'style': STYLE,
				'format': FORMAT
			});
		}
	}
	// David...
	out.dependencies = david({
		'owner': repo.owner,
		'repo': repo.repo,
		'style': STYLE,
		'format': FORMAT,
		'deps': 'main'
	});
	out.devDependencies = david({
		'owner': repo.owner,
		'repo': repo.repo,
		'style': STYLE,
		'format': FORMAT,
		'deps': 'dev'
	});

	// Github issues...
	out.issues = ghissues({
		'owner': repo.owner,
		'repo': repo.repo,
		'style': STYLE,
		'format': FORMAT
	});

	// Github stars...
	out.stars = ghsocial({
		'owner': repo.owner,
		'repo': repo.repo,
		'style': STYLE,
		'format': FORMAT,
		'action': 'star'
	});

	// Github forks...
	out.forks = ghsocial({
		'owner': repo.owner,
		'repo': repo.repo,
		'style': STYLE,
		'format': FORMAT,
		'action': 'fork'
	});

	// Github watchers...
	out.watchers = ghsocial({
		'owner': repo.owner,
		'repo': repo.repo,
		'format': FORMAT,
		'style': STYLE,
		'action': 'watch'
	});

	return out;
} // end FUNCTION urls()


// EXPORTS //

module.exports = urls;
