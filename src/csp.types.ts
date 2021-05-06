/*
 * Descriptions and other information taken from the Mozilla developer docs
 * @ https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
 */
type SchemeSource = 'http:' | 'https:' | 'data:' | 'mediastream:' | 'blob:' | 'filesystem:';
type HostSchemes = 'http://' | 'https://' | ''
type PortScheme = `:${number}` | ''
type HostNameScheme = `${string}.${string}`
type HostSource = `${HostSchemes}${HostNameScheme}${PortScheme}`
type ValidCrypto = 'nonce' | 'sha256' | 'sha384' | 'sha512'
type CryptoSources = `${ValidCrypto}-${string}`
type HttpDelineators = '/' | '?' | '#' | '\\'
type UriPath = `${HttpDelineators}${string}`

export type Source = 'self' | 'unsafe-eval' | 'unsafe-hashes' | 'unsafe-inline' | 'none' | HostSource | SchemeSource | CryptoSources
type Sources = Source | Source[]
export const directiveNames: Readonly<(keyof Directives)[]> = [
	'child-src',
	'frame-src',
	'worker-src',
	'connect-src',
	'font-src',
	'img-src',
	'manifest-src',
	'media-src',
	'object-src',
	'prefetch-src',
	'script-src',
	'script-src-elem',
	'script-src-attr',
	'style-src',
	'style-src-elem',
	'style-src-attr',
	'base-uri',
	'plugin-types',
	'sandbox',
	'form-action',
	'frame-ancestors',
	'navigate-to',
	'report-uri',
	'report-to',
	'block-all-mixed-content',
	'referrer',
	'require-sri-for',
	'require-trusted-types-for',
	'trusted-types',
	'upgrade-insecure-requests',
] as const;

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
] as const;
export type ReferrerHeaderOptions = typeof referrerHeaderOptions[number]

type ChildSource = {
	'child-src'?: Sources
	'frame-src'?: Sources
	'worker-src'?: Sources
}

type ReferrerPolicy = ''
| 'no-referrer'
| 'no-referrer-when-downgrade'
| 'origin'
| 'origin-when-cross-origin'
| 'same-origin'
| 'strict-origin'
| 'strict-origin-when-cross-origin'
| 'unsafe-url'
| 'none'

type SourceDirectives = {
	'connect-src'?: Sources
	'font-src'?: Sources
	'frame-src'?: Sources
	'img-src'?: Sources
	'manifest-src'?: Sources
	'media-src'?: Sources
	'object-src'?: Sources
	'prefetch-src'?: Sources
	'script-src'?: Sources
	'script-src-elem'?: Sources
	'script-src-attr'?: Sources
	'style-src'?: Sources
	'style-src-elem'?: Sources
	'style-src-attr'?: Sources
}

type SandboxOption =
/** Allows for downloads to occur without a gesture from the user. */
'allow-downloads-without-user-activation ' |
/** Allows the page to submit forms. If this keyword is not used, this operation is not allowed. */
'allow-forms' |
/** Allows the page to open modal windows. */
'allow-modals' |
/** Allows the page to disable the ability to lock the screen orientation. */
'allow-orientation-lock' |
/** Allows the page to use the Pointer Lock API. */
'allow-pointer-lock' |
/** Allows popups (like from window.open, target="_blank", showModalDialog).
 * If this keyword is not used, that functionality will silently fail. */
'allow-popups' |
/** Allows a sandboxed document to open new windows without forcing the sandboxing flags upon them.
 * This will allow, for example, a third-party advertisement to be safely sandboxed without
 * forcing the same restrictions upon a landing page. */
'allow-popups-to-escape-sandbox' |
/** Allows embedders to have control over whether an iframe can start a presentation session. */
'allow-presentation' |
/** Allows the content to be treated as being from its normal origin.
 * If this keyword is not used, the embedded content is treated as being from a unique origin. */
'allow-same-origin' |
/** Allows the page to run scripts (but not create pop-up windows).
 * If this keyword is not used, this operation is not allowed. */
'allow-scripts' |
/** Lets the resource request access to the parent's storage capabilities with the Storage Access API. */
'allow-storage-access-by-user-activation ' |
/** Allows the page to navigate (load) content to the top-level browsing context.
 * If this keyword is not used, this operation is not allowed. */
'allow-top-navigation' |
/** Lets the resource navigate the top-level browsing context, but only if initiated by a user gesture. */
'allow-top-navigation-by-user-activation'

type DocumentDirectives = {
	/**
	 * Restricts the URLs which can be used in a document's <base> element. */
	'base-uri'?: ActionSource | ActionSource[]

	/**
	 * Restricts the set of plugins that can be embedded into a document by
	 * limiting the types of resources which can be loaded.
	 * @deprecated */
	'plugin-types'?: `${string}/${string}` | `${string}/${string}`[] | 'none'

	/**
	 * Enables a sandbox for the requested resource similar to the <iframe> sandbox attribute. */
	'sandbox'?: SandboxOption
}

type ActionSource = Source | 'strict-dynamic' | 'report-sample'
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
type RequireTrustedTypePolicy = 'script'
type TrustedTypesPolicy = 'none' | 'allow-duplicates' | '*' | string
type OtherDirectives = {
	/** Prevents loading any assets using HTTP when the page is loaded using HTTPS.
		@deprecated */
	'block-all-mixed-content'?: boolean

	/** Used to specify information in the Referer (sic) header for links away from a page.
	 * Use the Referrer-Policy header instead.
		@deprecated */
	'referrer'?: ReferrerPolicy

	/** Requires the use of SRI for scripts or styles on the page.
		@deprecated */
	'require-sri-for'?: 'script' | 'style' | 'script style'

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

export type Directives =
	ChildSource
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
