## Alpha API Report File for "@fluidframework/tinylicious-driver"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

// @alpha
export const createTinyliciousCreateNewRequest: (documentId?: string) => IRequest;

// @alpha
export class InsecureTinyliciousTokenProvider implements ITokenProvider {
    constructor(
    scopes?: ScopeType[] | undefined);
    // (undocumented)
    fetchOrdererToken(tenantId: string, documentId?: string): Promise<ITokenResponse>;
    // (undocumented)
    fetchStorageToken(tenantId: string, documentId: string): Promise<ITokenResponse>;
}

// @alpha
export class InsecureTinyliciousUrlResolver implements IUrlResolver {
    constructor(port?: number, endpoint?: string);
    // (undocumented)
    getAbsoluteUrl(resolvedUrl: IResolvedUrl, relativeUrl: string): Promise<string>;
    // (undocumented)
    resolve(request: IRequest): Promise<IResolvedUrl>;
}

// (No @packageDocumentation comment for this package)

```
