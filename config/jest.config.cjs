const {jsWithTs} = require('ts-jest/presets');
const config =
/** @type {import('@jest/types').InitialOptions} */
{
	'rootDir':'../',
	'preset': 'ts-jest/presets/js-with-ts',
	testEnvironment: 'node',
	moduleFileExtensions: ['ts', 'js'],
	'testMatch': [
		'**/src/**/*.test.[tj]s',
		'**/test*/**/*.[tj]s',
	],
	'transform': {
		...jsWithTs.transform,
	},
	resolver: '<rootDir>/config/jest-resolver.cjs',
	'coverageReporters': [
		'text-summary',
		'json', 'lcov', 'text', 'clover',
	],
	'bail': true,
	globals: {
		'ts-jest': {
		},
	},
};
module.exports = config;
