declare const publications: {
    [name: string]: AbstractPublication<any>;
};
export { publications };
export interface ISubscription {
    stop(): void;
    ready(): boolean;
    subscriptionId: string;
}
export declare abstract class AbstractPublication<T> {
    name: string;
    methodToRun: (data?: T) => void;
    constructor(name: string, methodToRun: (data?: T) => void);
    subscribe(data?: T): ISubscription;
    withData(data?: T): PublicationAndData<T>;
}
export declare class PublicationAndData<TData> {
    publication: AbstractPublication<TData>;
    private data;
    constructor(publication: AbstractPublication<TData>, data?: TData);
    subscribe(): ISubscription;
}
export declare class PublicationWithoutArgs<TResult> extends AbstractPublication<void> {
    constructor(name: string, methodToRun: () => void);
    subscribe(): ISubscription;
    withData(): PublicationAndData<void>;
}
export default class Publication<T> extends AbstractPublication<T> {
    constructor(name: string, methodToRun: (data: T) => void);
    subscribe(data: T): ISubscription;
    withData(data: T): PublicationAndData<T>;
}
export interface SomeThing {
    (abc: string): void;
}
declare const x: SomeThing;
export { x };
