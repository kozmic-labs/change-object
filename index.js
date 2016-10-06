var set = require("set-object-path");

module.exports = change;

function change (obj, changes, cloneFn) {
  if (arguments.length == 1 && typeof obj == 'function') {
    return custom(obj);
  }

  var clone = (cloneFn || defaultCloneFn)(obj);

  var path;
  for (path in changes) {
    set(clone, path, changes[path]);
  }

  return clone;
}

function defaultCloneFn (obj) {
  return JSON.parse(JSON.stringify(obj));
}

function custom (cloneFn) {
  return function (obj, changes) {
    return change(obj, changes, cloneFn);
  };
}
