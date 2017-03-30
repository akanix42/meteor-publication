import { Meteor } from './meteor-import';
import meteorSubscribe from './meteor-call-with-promise';

const publications: { [name: string]: AbstractPublication<any>; } = {};
export { publications };


export interface ISubscription {
  stop(): void;
  ready(): boolean;
  subscriptionId: string;
}

export abstract class AbstractPublication<T> {
  name: string;
  methodToRun: (data?: T) => void;

  constructor(name: string, methodToRun: (data?: T) => void) {
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

  withData(data?: T): PublicationAndData<T> {
    return new PublicationAndData(this, data);
  }
}

export class PublicationAndData<TData> {
  constructor(public publication: AbstractPublication<TData>, private data?: TData) { }

  subscribe(): ISubscription {
    return this.publication.subscribe(this.data);
  }
}

export class PublicationWithoutArgs<TResult> extends AbstractPublication<void> {
  constructor(name: string, methodToRun: () => void) {
    super(name, methodToRun);
  }

  subscribe() {
    return super.subscribe();
  }

  withData() {
    return super.withData();
  }
}

export default class Publication<T> extends AbstractPublication<T> {
  constructor(name: string, methodToRun: (data: T) => void) {
    super(name, methodToRun);
  }

  subscribe(data: T) {
    return super.subscribe(data);
  }

  withData(data: T) {
    return super.withData(data);
  }
}

export interface SomeThing {
  (abc: string): void;
}

const x: SomeThing = function (abc: string) {
  console.log(abc);
}

export { x }