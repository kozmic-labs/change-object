## change-object

Clone and change given object paths.

## Install

```bash
$ npm install change-object
```

## Usage

A simple example:

```js
var change = require('change-object')
var state = {
  loading: true,
  start: 0,
  end: 15
};

var updated = change(state, { loading: false })

updated.loading
// => false

updated
// => { loading: false, start: 0, end: 15 }
```

It supports changing [deep paths](http://github.com/kozmic-labs/change-object-path):

```js
var state = {
  products: { eggs: [{ kind: 'white egg', amount: 250 }] }
}

var updated = change(state, {
  'products.eggs[0].kind': 'brown egg'
})

updated
// => products: { eggs: [{ kind: 'brown egg', amount: 250 }] }

updated.products.eggs[0].kind
// => brown egg
```

## Custom Clonning

By default, it'll clone your object by stringifying & parsing method, which may not fit your use case if you got functions in your object. It's preferred for performance reasons, and you can of course choose your own clonning function by simply calling it with a clonning function:

```js
var change = require('change-object')(customCloneFn)

function customCloneFn (obj) {
  return {...}
}
```
