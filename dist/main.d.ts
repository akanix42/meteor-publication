declare const publications: {
    [name: string]: AbstractPublication<any, any>;
};
export { publications };
export interface ISubscription {
    stop(): void;
    ready(): boolean;
    subscriptionId: string;
}
export declare abstract class AbstractPublication<T, TCollections> {
    readonly collections?: TCollections | undefined;
    name: string;
    methodToRun: (data?: T) => void;
    constructor(name: string, methodToRun: (data?: T) => void, collections?: TCollections | undefined);
    subscribe(data?: T): ISubscription;
    withData(data?: T): PublicationAndData<T, TCollections>;
}
export declare class PublicationAndData<TData, TCollections> {
    publication: AbstractPublication<TData, TCollections>;
    private data?;
    constructor(publication: AbstractPublication<TData, TCollections>, data?: TData | undefined);
    subscribe(): ISubscription;
}
export declare class PublicationWithoutArgs<TCollections> extends AbstractPublication<void, TCollections> {
    constructor(name: string, methodToRun: () => void, collections?: TCollections);
    subscribe(): ISubscription;
    withData(): PublicationAndData<void, TCollections>;
}
export default class Publication<T, TCollections> extends AbstractPublication<T, TCollections> {
    constructor(name: string, methodToRun: (data: T) => void, collections?: TCollections);
    subscribe(data: T): ISubscription;
    withData(data: T): PublicationAndData<T, TCollections>;
}
