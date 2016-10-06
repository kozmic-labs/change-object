var test = require("prova");
var change = require("./");

test('changing a simple path', function (t) {
  var obj = { foo: 'bar', qux: 'eggs', pi: 3.14, quux: 777 };
  var changed = change(obj, {
    'foo': 'yolo',
    'quux': 888
  });

  t.plan(6);
  t.equal(obj.foo, 'bar');
  t.equal(obj.quux, 777);

  t.equal(changed.qux, 'eggs');
  t.equal(changed.pi, 3.14);
  t.equal(changed.foo, 'yolo');
  t.equal(changed.quux, 888);
});

test('changing a deep path', function (t) {
  var obj = { foo: 'bar', products: { eggs: ['white egg'], cheese: 123 } };
  var changed = change(obj, {
    'products.eggs[0]': 'brown egg',
    'products.cheese': 314
  });

  t.plan(5);
  t.equal(obj.products.eggs[0], 'white egg');
  t.equal(obj.products.cheese, 123);

  t.equal(changed.foo, 'bar');
  t.equal(changed.products.eggs[0], 'brown egg');
  t.equal(changed.products.cheese, 314);
});

test('providing custom clone function', function (t) {
  var c = change(function (obj) {
    return obj;
  });

  var obj = { foo: 'bar', qux: 'eggs', pi: 3.14, quux: 777 };
  c(obj, { 'foo': 'yolo' });

  t.plan(1);
  t.equal(obj.foo, 'yolo');
});
