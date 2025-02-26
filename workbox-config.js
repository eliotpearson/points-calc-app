module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{mp3,png}'
	],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};