## API Report File for "@fluidframework/synthesize"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

// @public
export type AsyncFluidObjectProvider<O, R = undefined> = AsyncOptionalFluidObjectProvider<O> & AsyncRequiredFluidObjectProvider<R>;

// @public
export type AsyncOptionalFluidObjectProvider<T> = T extends undefined ? Record<string, never> : {
    [P in keyof T]?: Promise<T[P] | undefined>;
};

// @public
export type AsyncRequiredFluidObjectProvider<T> = T extends undefined ? Record<string, never> : {
    [P in keyof T]: Promise<NonNullable<Exclude<T[P], undefined | null>>>;
};

// @public
export class DependencyContainer<TMap> implements IFluidDependencySynthesizer {
    constructor(...parents: (IFluidDependencySynthesizer | undefined)[]);
    has(type: string, excludeParents?: boolean): boolean;
    // (undocumented)
    get IFluidDependencySynthesizer(): this;
    register<T extends keyof TMap = keyof TMap>(type: T, provider: FluidObjectProvider<Pick<TMap, T>>): void;
    synthesize<O, R = undefined | Record<string, never>>(optionalTypes: FluidObjectSymbolProvider<O>, requiredTypes: Required<FluidObjectSymbolProvider<R>>): AsyncFluidObjectProvider<O, R>;
    unregister(type: keyof TMap): void;
}

// @public
export type FluidObjectProvider<T> = NonNullable<T> | Promise<NonNullable<T>> | ((dependencyContainer: IFluidDependencySynthesizer) => NonNullable<T>) | ((dependencyContainer: IFluidDependencySynthesizer) => Promise<NonNullable<T>>);

// @public
export type FluidObjectSymbolProvider<T> = {
    [P in keyof T]?: P;
};

// @public (undocumented)
export const IFluidDependencySynthesizer: keyof IProvideFluidDependencySynthesizer;

// @public
export interface IFluidDependencySynthesizer extends IProvideFluidDependencySynthesizer {
    has(type: string): boolean;
    synthesize<O, R = undefined | Record<string, never>>(optionalTypes: FluidObjectSymbolProvider<O>, requiredTypes: Required<FluidObjectSymbolProvider<R>>): AsyncFluidObjectProvider<O, R>;
}

// @public (undocumented)
export interface IProvideFluidDependencySynthesizer {
    // (undocumented)
    IFluidDependencySynthesizer: IFluidDependencySynthesizer;
}


// (No @packageDocumentation comment for this package)

```