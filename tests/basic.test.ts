import { Directives, ReportTo } from '../src/csp.types.js';
import { CspDirectives } from '../src/index.js';
import { createHash } from 'crypto';
const sample64Hash = (algorithm: string) => {
	const hash = createHash(algorithm);
	hash.update('hello world');
	return hash.digest('base64');
};

describe('new CspDirectives()',() => {
	it('Instantiates', () => {
		const inst = jest.fn(() => new CspDirectives());
		const res = inst();
		expect(inst).toHaveBeenCalled();
		expect(inst).toHaveReturned();
		expect(res).toMatchObject({
			CSP:{},
			ReportOnly: false,
			ReportTo: [],
			ReferrerHeader: 'strict-origin-when-cross-origin',
		});
	});
	it('Defaults Refferer to depricated referrer directive if present',() => {
		const inst = new CspDirectives({
			'referrer': 'strict-origin',
		});
		expect(inst.ReferrerHeader).toBe('strict-origin');
	});
	describe('.headers',() => {
		it('returns on empty',() => {
			const inst = new CspDirectives();
			const getHeaders = jest.spyOn(inst,'getHeaders');
			const headers = inst.getHeaders();
			expect(getHeaders).toHaveReturned();
			expect(headers).toMatchObject({
				'Content-Security-Policy-Report-Only': '',
				'Content-Security-Policy': '',
				'Report-To': '',
				'Referrer-Policy': 'strict-origin-when-cross-origin',
			});
		});
		it('returns boolean directives',() => {
			const csp: Directives = {
				'upgrade-insecure-requests': true,
			};
			const inst = new CspDirectives(csp,[],csp);
			const getHeaders = jest.spyOn(inst,'getHeaders');
			const headers = inst.getHeaders();
			expect(getHeaders).toHaveReturned();
			expect(headers).toMatchObject({
				'Content-Security-Policy-Report-Only': 'upgrade-insecure-requests;',
				'Content-Security-Policy': 'upgrade-insecure-requests;',
				'Report-To': '',
				'Referrer-Policy': 'strict-origin-when-cross-origin',
			});
		});
		it('returns on all set',() => {
			const sampleSha256 = `sha256-${sample64Hash('sha256')}` as const;
			const csp: Directives = {
				'child-src': 'none',
				'frame-src': 'unsafe-eval',
				'connect-src': 'example.com',
				'font-src': 'https:',
				'img-src': 'self',
				'manifest-src': 'https://example.com',
				'media-src': sampleSha256,
				'object-src': 'example.com:443',
				'prefetch-src': sampleSha256,
				'script-src': sampleSha256,
				'script-src-elem': sampleSha256,
				'script-src-attr': sampleSha256,
				'style-src': sampleSha256,
				'style-src-elem': sampleSha256,
				'style-src-attr': sampleSha256,
				'base-uri': 'strict-dynamic',
				'form-action': 'report-sample',
				'frame-ancestors': 'self',
				'navigate-to': sampleSha256,
				'report-to': 'hello',
				'referrer': 'strict-origin',
				'trusted-types': sampleSha256,
			};
			const endpoint = 'https://example.com' as const;
			const reportTo: ReportTo[] = [
				{
					max_age: 12000,
					group: 'hello',
					endpoints: [{url:endpoint}],
				},
			];
			const result = Object.entries(csp).map(([k,v]) => `${k} '${v}';`).join(' ');
			const inst = new CspDirectives(csp,reportTo,csp,'strict-origin');
			const getHeaders = jest.spyOn(inst,'getHeaders');
			const headers = inst.getHeaders();
			expect(getHeaders).toHaveReturned();
			expect(headers).toMatchObject({
				'Content-Security-Policy-Report-Only': result,
				'Content-Security-Policy': result,
				'Report-To': JSON.stringify(reportTo),
				'Referrer-Policy': 'strict-origin',
			});
		});
		it('Throws on invalid "report-to" group name',() => {
			const inst = new CspDirectives({
				'report-to': 'invalid',
			});
			jest.spyOn(inst,'getHeaders');
			try {
				inst.getHeaders();
			} catch (_) {
				'nothing';
			}
			expect(inst.getHeaders).toThrowError();
		});
	});
});
