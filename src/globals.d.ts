type HostSchemes = 'http://' | 'https://'
type PortScheme = `:${number}` | ''
type HostNameScheme = `${string}.${string}` | string
type HostSource = `${HostSchemes}${HostNameScheme}${PortScheme}`
type HttpDelineators = '/' | '?' | '#' | '\\'
type OptionalPath = `${HttpDelineators}${string}` | ''
declare type UrlString = `${HostSource}${OptionalPath}`;

declare type Obj = Record<string | number | symbol,unknown>
