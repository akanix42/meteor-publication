import { Meteor } from './meteor-import';

const publications: { [name: string]: AbstractPublication<any, any>; } = {};
export { publications };


export interface ISubscription {
  stop(): void;
  ready(): boolean;
  subscriptionId: string;
}

export abstract class AbstractPublication<T, TCollections> {
  name: string;
  methodToRun: (data?: T) => void;

  constructor(name: string, methodToRun: (data?: T) => void, readonly collections?: TCollections) {
    this.name = name;
    this.methodToRun = methodToRun;

    if (Meteor.isServer) {
      Meteor.publish(this.name, methodToRun);
    }
    publications[this.name] = this;
  }

  subscribe(data?: T): ISubscription {
    console.log('subscribing: ')
    const options = {
      onStop: function (error) {
        if (error)
          console.log(error)
      }
    };
    return (data === undefined || data === null)
      ? Meteor.subscribe(this.name, options)
      : Meteor.subscribe(this.name, data, options);
  }

  withData(data?: T): PublicationAndData<T, TCollections> {
    return new PublicationAndData(this, data);
  }
}

export class PublicationAndData<TData, TCollections> {
  constructor(public publication: AbstractPublication<TData, TCollections>, private data?: TData) { }

  subscribe(): ISubscription {
    return this.publication.subscribe(this.data);
  }
}

export class PublicationWithoutArgs<TResult, TCollections> extends AbstractPublication<void, TCollections> {
  constructor(name: string, methodToRun: () => void, collections?: TCollections) {
    super(name, methodToRun, collections);
  }

  subscribe() {
    return super.subscribe();
  }

  withData() {
    return super.withData();
  }
}

export default class Publication<T, TCollections> extends AbstractPublication<T, TCollections> {
  constructor(name: string, methodToRun: (data: T) => void, collections?: TCollections) {
    super(name, methodToRun, collections);
  }

  subscribe(data: T) {
    return super.subscribe(data);
  }

  withData(data: T) {
    return super.withData(data);
  }
}
