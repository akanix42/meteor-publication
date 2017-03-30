# Installation
`meteor npm i --save meteor-publication'

# Usage

Create a publication:
```js
import Publication from 'meteor-publication';

export default new Publication('foo', function(now) {
  return Collection.stuff.find({someField: now.getDate()});
});
```

Use the publication you created:
```js
import fooPublication from './foo';

fooPublication.subscribe(new Date());
```

This replaces the traditional way of creating and calling Meteor publications:
```js
import { Meteor } from 'meteor/meteor';

// Create a publication
Meteor.publish('foo', function(now) {
  return Collection.stuff.find({someField: now.getDate()});
});

// Subscribe to the publication
Meteor.subscribe('foo', new Date());
```
This removes reliance on magic strings and enables type checking if you use TypeScript (see below).

## API 
  `Publication#subscribe`: returns a standard Meteor subscription object with stop(), and ready() methods, and the subscriptionId property.

  `Publication#withData`: returns an object with a subscribe method that, when called,  will subscribe with the data you supplied in this call.

## Notes for TypeScript:
This module comes with typings. Visual Studio Code supports full type inference:
``` typescript
import Publication from 'meteor-publication';

const fooPublication = new Publication('foo', function(now: Date) {
  return now.getDate();
});
fooPublication.call(1); // Error since you are passing a number instead of a date
```

TypeScript currently doesn't support inference if you have 0 arguments, so this will give you an error:
``` typescript
import Publication from 'meteor-publication';

const fooPublication = new Publication('foo', function() {
  return 1;
});
fooPublication.call(); // Error because TypeScript still thinks you should pass an argument.
```

Instead, use the `PublicationWithoutArgs` class:
``` typescript
import {PublicationWithoutArgs} from 'meteor-publication';

const fooPublication = new PublicationWithoutArgs('foo', function() {
  return 1;
});
fooPublication.call(); // All good
```
