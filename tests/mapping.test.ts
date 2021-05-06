import { DirectiveMap } from '../src/index.js';

function isObject (obj: unknown): obj is Record<PropertyKey,unknown> {
	return Object.prototype.toString.call(obj) === '[object Object]';
}
function hasOwnProperty<T> (obj: T, prop: PropertyKey): prop is keyof T {
	return Object.prototype.hasOwnProperty.call(obj, prop);
}

describe('DirectiveMap.get()',() => {
	describe('Dynamic Options',() => {
		it('Handles Hostname/URL Source',() => {
			const src = DirectiveMap.get('child-src');
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const start: any = undefined;
			const result = src?.values.reduce((_,v) => {
				if (
					isObject(v) &&
					hasOwnProperty(v,'displayName') &&
					v.displayName === 'Hostname/URL Source'
				) {
					return v?.compose?.({
						'Hostname': 'example.com',
						'Port': 443,
						'Protocol':'https://',
					});
				}
				return _;
			},start);
			expect(result).toBe('https://example.com:443');
		});
		it('Crypto Nonce/Hash Source',() => {
			const src = DirectiveMap.get('child-src');
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const start: any = undefined;
			const result = src?.values.reduce((_,v) => {
				if (
					isObject(v) &&
					hasOwnProperty(v,'displayName') &&
					v.displayName === 'Crypto Nonce/Hash Source'
				) {
					return v?.compose?.({
						'Algorithm':'sha256',
						'Hash':'SomeBase64String',
					});
				}
				return _;
			},start);
			expect(result).toBe('sha256-SomeBase64String');
		});
		it('Handles URI Source',() => {
			const src = DirectiveMap.get('child-src');
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const start: any = undefined;
			const result = src?.values.reduce((_,v) => {
				if (
					isObject(v) &&
					hasOwnProperty(v,'displayName') &&
					v.displayName === 'URI Source'
				) {
					return v?.compose?.({
						'Beginning Delineator':'/',
						'Remaining Path':'send/reports/to',
					});
				}
				return _;
			},start);
			expect(result).toBe('/send/reports/to');
		});
		it('Handles Plugin MIME Type Source',() => {
			const src = DirectiveMap.get('child-src');
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const start: any = undefined;
			const result = src?.values.reduce((_,v) => {
				if (
					isObject(v) &&
					hasOwnProperty(v,'displayName') &&
					v.displayName === 'Plugin MIME Type Source'
				) {
					return v?.compose?.({
						'MIME Category':'application',
						'MIME Implementation':'xml',
					});
				}
				return _;
			},start);
			expect(result).toBe('application/xml');
		});
		it('Handles Any String',() => {
			const src = DirectiveMap.get('child-src');
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const start: any = undefined;
			const result = src?.values.reduce((_,v) => {
				if (
					isObject(v) &&
					hasOwnProperty(v,'displayName') &&
					v.displayName === 'Any String'
				) {
					return v?.compose?.({
						'String':'hello world',
					});
				}
				return _;
			},start);
			expect(result).toBe('hello world');
		});
	});
});
