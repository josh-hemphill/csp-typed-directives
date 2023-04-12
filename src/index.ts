import {
	directiveMap,
	Directives,
	ReportTo,
	ReferrerHeaderOptions,
	referrerHeaderOptions,
	directiveValuesByCategory,
	validHashes,
	validCrypto,
	Source,
	actionSource,
	baseSources,
	trustedTypesPolicy,
	requireTrustedTypePolicy,
	sriPolicy,
	sandboxDirectives,
} from './csp.types.js';

export type ValidSource = Source;
type ReportTos = ReportTo | ReportTo[]
function normalizeArrayString<T> (arrS: T[] | T): T[] {
	return Array.isArray(arrS) ? arrS : [arrS];
}
export const ValidHashes = validHashes;
export const ValidCrypto = validCrypto;
export const directiveNamesList = <(keyof typeof directiveMap)[]>Object.keys(directiveMap);
type DirectiveName = keyof typeof directiveMap;
type DirectiveValue = typeof directiveMap[DirectiveName]
type DirectiveMapPair = [DirectiveName,DirectiveValue]
type CategoryValue = FlatArray<(typeof directiveValuesByCategory[DirectiveValue[number]]),1>
type DirectiveResult = {
	values: Partial<CategoryValue>[]
	categories: DirectiveValue
}
export const DirectiveMap = new Map<DirectiveName,DirectiveResult>(Object.entries(directiveMap).map((dPair) => {
	const [k,v] = <DirectiveMapPair>dPair;
	return [k,{
		get values (): Partial<CategoryValue>[] {
			return this.categories.map((category) => directiveValuesByCategory[category]).flat(1);
		},
		categories: v,
	}];
}));
export const referrerHeaderOptionsList = referrerHeaderOptions;
export type DirectivesObj = Directives;
export type ReportToObj = ReportTo;
export type ReferrerHeaderOptionsList = ReferrerHeaderOptions;
export type CspDirectiveHeaders = {
	'Content-Security-Policy-Report-Only': string
	'Content-Security-Policy': string
	'Report-To': string
	'Referrer-Policy': string
}

const PolicySet = new Set([
	...actionSource,
	...baseSources,
	...trustedTypesPolicy,
	...requireTrustedTypePolicy,
	...sriPolicy,
	...referrerHeaderOptions,
	...actionSource,
	...sandboxDirectives,
]);
function isQuotedPolicy (policy: string): boolean {
	if (policy === '*') return false;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	if (PolicySet.has(policy)) return true;
	if (validCrypto.some((v) => policy.startsWith(`${v}-`))) return true;
	return false;
}

export class CspDirectives {
	public CSP: Directives;
	public ReportOnly: Directives | false;
	public ReportTo: ReportTos;
	public ReferrerHeader: ReferrerHeaderOptions;
	constructor (
		csp?: Directives,
		sendReportsTo?: ReportTos,
		reportSubset?: Directives,
		referrerHeaderOverride?: ReferrerHeaderOptions,
	){
		this.CSP = csp || {};
		this.ReportOnly = reportSubset || false;
		this.ReportTo = sendReportsTo || [];
		this.ReferrerHeader = referrerHeaderOverride || 'strict-origin-when-cross-origin';
		function inReferrerOptions (r: string): r is ReferrerHeaderOptions {
			return referrerHeaderOptions.some((v) => v === r);
		}
		if (!referrerHeaderOverride && csp?.referrer && inReferrerOptions(csp.referrer)) {
			this.ReferrerHeader = csp.referrer;
		}
	}
	checkReportTo (): void {
		const reportTo = this.CSP?.['report-to'];
		if (reportTo === undefined) return;
		else {
			const reportsTo = normalizeArrayString(this.ReportTo);
			if (!reportsTo.some((v) => v.group === reportTo)) {
				throw Error('Undefined ReportTo group specified in policy "report-to"');
			}
		}
	}
	getHeaders (): CspDirectiveHeaders {
		this.checkReportTo();
		const results = {
			'Content-Security-Policy-Report-Only':'',
			'Content-Security-Policy':'',
			'Report-To': normalizeArrayString(this.ReportTo).length ? JSON.stringify(this.ReportTo) : '',
			'Referrer-Policy':this.ReferrerHeader,
		};
		directiveNamesList.forEach((directive) => {
			let result = '';
			const getRes = (obj: Directives) => {
				let res = '';
				if (typeof obj[directive] !== 'boolean') {
					res = normalizeArrayString(obj[directive]).map((v) => {
						if (typeof v === 'string') {
							// if (v.includes(':') || v.includes('.')) debugger;
							return isQuotedPolicy(v) ? ` '${v}'` : ` ${v}`;
						}
						return;
					}).join('');
				}
				result = ` ${directive}${res};`;
			};
			if (this.CSP[directive]) {
				getRes(this.CSP);
				results['Content-Security-Policy'] += result;
			}
			if (this.ReportOnly && this.ReportOnly[directive]) {
				results['Content-Security-Policy-Report-Only'] += result || (getRes(this.ReportOnly),result);
			}
		});
		results['Content-Security-Policy-Report-Only'] =
			results['Content-Security-Policy-Report-Only'].trim();
		results['Content-Security-Policy'] =
			results['Content-Security-Policy'].trim();
		return results;
	}
}
