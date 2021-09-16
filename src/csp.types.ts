/*
 * Descriptions and other information taken from the Mozilla developer docs
 * @ https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
 */
// Scheme Source Definition
export const schemeSource = ['http:', 'https:', 'data:', 'mediastream:', 'blob:', 'filesystem:'] as const;
type SchemeSource = typeof schemeSource[number];

// Hosts Source Definition
type HostProtocolSchemes = `${string}://` | ''
type PortScheme = `:${number}` | '' | ':*'
/** Can actually be any string, but typed with `string.string` to restrict the combined optional types from all just bing `string` */
type HostNameScheme = `${string}.${string}` | `${string}`
type HostSource = `${HostProtocolSchemes}${HostNameScheme}${PortScheme}`

// Crypto Source Definition
export const validHashes = ['sha256', 'sha384', 'sha512'] as const;
export const validCrypto = ['nonce', ...validHashes] as const;
type ValidCrypto = typeof validCrypto[number];
type CryptoSources = `${ValidCrypto}-${string}`

// URI Definition
export const httpDelineators = ['/', '?', '#', '\\'] as const;
type HttpDelineators = typeof httpDelineators[number];
type UriPath = `${HttpDelineators}${string}`

// Base Source Directives
export const baseSources = ['self', 'unsafe-eval', 'unsafe-hashes', 'unsafe-inline', 'none'] as const;
type BaseSources = typeof baseSources[number]

// Combined all source directives
export const source = [...baseSources, ...schemeSource] as const;
export type Source = BaseSources | HostSource | SchemeSource | CryptoSources
type Sources = Source | Source[]

export const referrerHeaderOptions = [
	/**
	 * The Referer header will be omitted entirely. No referrer information is sent along with requests. */
	'no-referrer',
	/**
	 * Send the origin, path, and querystring in Referer when the protocol security level stays the same or improves (HTTP→HTTP, HTTP→HTTPS, HTTPS→HTTPS). Don't send the Referer header for requests to less secure destinations (HTTPS→HTTP, HTTPS→file). */
	'no-referrer-when-downgrade',
	/** Send the origin (only) in the Referer header.
	 * For example, a document at https://example.com/page.html will send the referrer https://example.com/. */
	'origin',
	/**
	 * Send the origin, path, and query string when performing a same-origin request to the same protocol level. Send origin (only) for cross origin requests and requests to less secure destinations. */
	'origin-when-cross-origin',
	/**
	 * Send the origin, path, and query string for same-origin requests. Don't send the Referer header for cross-origin requests. */
	'same-origin',
	/**
	 * Send the origin (only) when the protocol security level stays the same (HTTPS→HTTPS). Don't send the Referer header to less secure destinations (HTTPS→HTTP). */
	'strict-origin',
	/**
	 * Send the origin, path, and querystring when performing a same-origin request. For cross-origin requests send the origin (only) when the protocol security level stays same (HTTPS→HTTPS). Don't send the Referer header to less secure destinations (HTTPS→HTTP).
	 * * NOTE
	 * * This is the default policy if no policy is specified,
	 * * or if the provided value is invalid (see spec revision November 2020).
	 * * Previously the default was no-referrer-when-downgrade. */
	'strict-origin-when-cross-origin', // default
	/**
	 * Send the origin, path, and query string when performing any request, regardless of security.
	 * * Warning
	 * * This policy will leak potentially-private information from HTTPS resource URLs to insecure origins.
	 * * Carefully consider the impact of this setting. */
	'unsafe-url',
	'none',
] as const;
export type ReferrerHeaderOptions = typeof referrerHeaderOptions[number]

type ChildDirectives = {
	'child-src'?: Sources
	'frame-src'?: Sources
	'worker-src'?: Sources
}

type SourceDirectives = {
	'connect-src'?: Sources
	'default-src'?: ActionSource | ActionSource[]
	'font-src'?: Sources
	'frame-src'?: Sources
	'img-src'?: Sources
	'manifest-src'?: Sources
	'media-src'?: Sources
	'object-src'?: Sources
	'prefetch-src'?: Sources
	'script-src'?: ActionSource | ActionSource[]
	'script-src-elem'?: Sources
	'script-src-attr'?: Sources
	'style-src'?: Sources
	'style-src-elem'?: Sources
	'style-src-attr'?: Sources
}


export const sandboxDirectives = [
	/** Allows for downloads to occur without a gesture from the user. */
	'allow-downloads-without-user-activation ',
	/** Allows the page to submit forms. If this keyword is not used, this operation is not allowed. */
	'allow-forms',
	/** Allows the page to open modal windows. */
	'allow-modals',
	/** Allows the page to disable the ability to lock the screen orientation. */
	'allow-orientation-lock',
	/** Allows the page to use the Pointer Lock API. */
	'allow-pointer-lock',
	/** Allows popups (like from window.open, target="_blank", showModalDialog).
	 * If this keyword is not used, that functionality will silently fail. */
	'allow-popups',
	/** Allows a sandboxed document to open new windows without forcing the sandboxing flags upon them.
	 * This will allow, for example, a third-party advertisement to be safely sandboxed without
	 * forcing the same restrictions upon a landing page. */
	'allow-popups-to-escape-sandbox',
	/** Allows embedders to have control over whether an iframe can start a presentation session. */
	'allow-presentation',
	/** Allows the content to be treated as being from its normal origin.
	 * If this keyword is not used, the embedded content is treated as being from a unique origin. */
	'allow-same-origin',
	/** Allows the page to run scripts (but not create pop-up windows).
	 * If this keyword is not used, this operation is not allowed. */
	'allow-scripts',
	/** Lets the resource request access to the parent's storage capabilities with the Storage Access API. */
	'allow-storage-access-by-user-activation ',
	/** Allows the page to navigate (load) content to the top-level browsing context.
	 * If this keyword is not used, this operation is not allowed. */
	'allow-top-navigation',
	/** Lets the resource navigate the top-level browsing context, but only if initiated by a user gesture. */
	'allow-top-navigation-by-user-activation',

] as const;
type SandboxOption = typeof sandboxDirectives[number]

type PluginSource = `${string}/${string}` | 'none'

type DocumentDirectives = {
	/**
	 * Restricts the URLs which can be used in a document's <base> element. */
	'base-uri'?: ActionSource | ActionSource[]

	/**
	 * Restricts the set of plugins that can be embedded into a document by
	 * limiting the types of resources which can be loaded.
	 * @deprecated */
	'plugin-types'?: PluginSource | PluginSource[]

	/**
	 * Enables a sandbox for the requested resource similar to the <iframe> sandbox attribute. */
	'sandbox'?: SandboxOption
}

export const actionSource = ['strict-dynamic', 'report-sample'] as const;
type ActionSource = Source | typeof actionSource[number]


type FrameSource = HostSource | SchemeSource | 'self' | 'none'

/**
 * Navigation directives govern to which locations a user can navigate or submit a form, for example.
 */
type NavigationDirectives = {
	/**
	 * Restricts the URLs which can be used as the target of a form submissions from a given context. */
	'form-action'?: ActionSource | ActionSource[]
	/**
	 * Specifies valid parents that may embed a page using <frame>, <iframe>, <object>, <embed>, or <applet>. */
	'frame-ancestors'?: FrameSource | FrameSource[]
	/**
	 * Restricts the URLs to which a document can initiate navigation by any means,
	 * including <form> (if form-action is not specified), <a>, window.location, window.open, etc.
	 * @experimental */
	'navigate-to'?: ActionSource | ActionSource[]
}

/**
 * Reporting directives control the reporting process of CSP violations.
 * See also the Content-Security-Policy-Report-Only header.
 */
type ReportingDirectives = {
	/** @deprecated */
	'report-uri'?: UriPath
	/** @experimental */
	'report-to'?: ReportTo['group']
}
/** Disallows using strings with DOM XSS injection sink functions,
 * and requires matching types created by Trusted Type policies. */
export const requireTrustedTypePolicy = ['script'] as const;
type RequireTrustedTypePolicy = typeof requireTrustedTypePolicy[number];

export const trustedTypesPolicy = ['none', 'allow-duplicates', '*'] as const;
type TrustedTypesPolicy = typeof trustedTypesPolicy[number] | string

export const sriPolicy = ['script', 'style', 'script style'] as const;
type SriPolicy = typeof sriPolicy[number]

type OtherDirectives = {
	/** Prevents loading any assets using HTTP when the page is loaded using HTTPS.
		@deprecated */
	'block-all-mixed-content'?: boolean

	/** Used to specify information in the Referer (sic) header for links away from a page.
	 * Use the Referrer-Policy header instead.
		@deprecated */
	'referrer'?: ReferrerHeaderOptions

	/** Requires the use of SRI for scripts or styles on the page.
		@deprecated */
	'require-sri-for'?: SriPolicy

	/** Enforces Trusted Types at the DOM XSS injection sinks. */
	'require-trusted-types-for'?: RequireTrustedTypePolicy

	/** Used to specify an allow-list of Trusted Types policies.
	 * Trusted Types allows applications to lock down
	 * DOM XSS injection sinks to only accept non-spoofable,
	 * typed values in place of strings. */
	'trusted-types'?: TrustedTypesPolicy | TrustedTypesPolicy[]

	/** Instructs user agents to treat all of a site's insecure URLs (those served over HTTP)
	 * as though they have been replaced with secure URLs (those served over HTTPS).
	 * This directive is intended for web sites with large numbers of insecure legacy
	 * URLs that need to be rewritten. */
	'upgrade-insecure-requests'?: boolean
}


export const directiveValuesByCategory = {
	hostSource: [
		{
			displayName: 'Hostname/URL Source',
			consumes: {
				'Port': 'number',
				'Hostname': 'string',
				'Protocol': 'string://',
			},
			compose: (args: {
				'Port'?: number,
				'Hostname'?: string,
				'Protocol'?: HostProtocolSchemes,
			}) => <HostSource>(
				(args?.Protocol || '') +
				(args?.Hostname || '') +
				(args?.Port
					? ':' + args?.Port
					: ''
				)
			),
		},
	],
	schemeSource,
	cryptoSource: [
		{
			displayName: 'Crypto Nonce/Hash Source',
			consumes: {
				'Hash': 'string',
				'Algorithm': validCrypto,
			},
			compose: (args: {Hash:string,Algorithm: ValidCrypto}) => <CryptoSources>`${args.Algorithm}-${args.Hash}`,
		},
	],
	baseSources,
	primitiveSourceBool: [
		true,
		false,
	],
	primitiveSourceString: [
		{
			displayName: 'Any String',
			consumes: {
				'String': 'string',
			},
			compose: (args: {String:string}) => args.String,
		},
	],
	trustedTypesPolicy,
	requireTrustedTypePolicy,
	sriPolicy,
	referrerHeaderOptions,
	uriPath: [
		{
			displayName: 'URI Source',
			consumes: {
				'Beginning Delineator': httpDelineators,
				'Remaining Path': 'string',
			},
			compose: (args: {'Beginning Delineator':HttpDelineators,'Remaining Path': string}) =>
				<UriPath>`${args['Beginning Delineator']}${args['Remaining Path']}`,
		},
	],
	actionSource,
	pluginSource: [
		{
			displayName: 'Plugin MIME Type Source',
			consumes: {
				'MIME Category': 'string',
				'MIME Implementation': 'string',
			},
			compose: (args: {'MIME Category':string,'MIME Implementation': string}) =>
				<PluginSource>`${args['MIME Category']}/${args['MIME Implementation']}`,
		},
		'none',
	],
	frameSource:[
		'self',
		'none',
	],
	sandboxDirectives,
} as const;

export const directiveMap: Readonly<Record<(keyof Directives),Readonly<(keyof typeof directiveValuesByCategory)[]>>> = {
	'child-src': ['hostSource','schemeSource','cryptoSource','baseSources'],
	'default-src': ['hostSource', 'schemeSource', 'cryptoSource', 'baseSources', 'actionSource'],
	'frame-src': ['hostSource','schemeSource','cryptoSource','baseSources'],
	'worker-src': ['hostSource','schemeSource','cryptoSource','baseSources'],
	'connect-src': ['hostSource','schemeSource','cryptoSource','baseSources'],
	'font-src': ['hostSource','schemeSource','cryptoSource','baseSources'],
	'img-src': ['hostSource','schemeSource','cryptoSource','baseSources'],
	'manifest-src': ['hostSource','schemeSource','cryptoSource','baseSources'],
	'media-src': ['hostSource','schemeSource','cryptoSource','baseSources'],
	'object-src': ['hostSource','schemeSource','cryptoSource','baseSources'],
	'prefetch-src': ['hostSource','schemeSource','cryptoSource','baseSources'],
	'script-src': ['hostSource','schemeSource','cryptoSource','baseSources', 'actionSource'],
	'script-src-elem': ['hostSource','schemeSource','cryptoSource','baseSources'],
	'script-src-attr': ['hostSource','schemeSource','cryptoSource','baseSources'],
	'style-src': ['hostSource','schemeSource','cryptoSource','baseSources'],
	'style-src-elem': ['hostSource','schemeSource','cryptoSource','baseSources'],
	'style-src-attr': ['hostSource','schemeSource','cryptoSource','baseSources'],
	'base-uri': ['hostSource','schemeSource','cryptoSource','baseSources','actionSource'],
	'plugin-types': ['pluginSource'],
	'sandbox': ['sandboxDirectives'],
	'form-action': ['hostSource','schemeSource','cryptoSource','baseSources','actionSource'],
	'frame-ancestors': ['hostSource','schemeSource','frameSource'],
	'navigate-to': ['hostSource','schemeSource','cryptoSource','baseSources','actionSource'],
	'report-uri': ['uriPath'],
	'report-to': ['primitiveSourceString'],
	'block-all-mixed-content': ['primitiveSourceBool'],
	'referrer': ['referrerHeaderOptions'],
	'require-sri-for': ['sriPolicy'],
	'require-trusted-types-for': ['requireTrustedTypePolicy'],
	'trusted-types': ['trustedTypesPolicy','primitiveSourceString'],
	'upgrade-insecure-requests': ['primitiveSourceBool'],
} as const;

export type Directives =
	ChildDirectives
	& SourceDirectives
	& OtherDirectives
	& ReportingDirectives
	& NavigationDirectives
	& DocumentDirectives

export type ReportTo = {
	group: string;
	max_age: number;
	endpoints: {url:UrlString}[]
}
