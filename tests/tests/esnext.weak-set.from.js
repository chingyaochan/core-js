import { createIterable } from '../helpers/helpers';

QUnit.test('WeakSet.from', assert => {
  const { from } = WeakSet;
  assert.isFunction(from);
  assert.arity(from, 1);
  assert.name(from, 'from');
  assert.looksNative(from);
  assert.nonEnumerable(WeakSet, 'from');
  assert.ok(WeakSet.from() instanceof WeakSet);
  const array = [];
  assert.ok(WeakSet.from([array]).has(array));
  assert.ok(WeakSet.from(createIterable([array])).has(array));
  const object = {};
  const context = {};
  WeakSet.from([object], function (element, index) {
    assert.same(element, object);
    assert.same(index, 0);
    assert.same(this, context);
    return element;
  }, context);
  assert.throws(() => {
    return from({});
  });
  let arg = null;
  function F(it) {
    return arg = it;
  }
  from.call(F, createIterable([1, 2, 3]), it => it ** 2);
  assert.deepEqual(arg, [1, 4, 9]);
});
