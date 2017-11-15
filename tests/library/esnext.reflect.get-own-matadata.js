QUnit.test('Reflect.getOwnMetadata', assert => {
  const { defineMetadata, getOwnMetadata } = core.Reflect;
  const { create } = core.Object;
  assert.isFunction(getOwnMetadata);
  assert.arity(getOwnMetadata, 2);
  assert.throws(() => {
    return getOwnMetadata('key', undefined, undefined);
  }, TypeError);
  assert.same(getOwnMetadata('key', {}, undefined), undefined);
  let object = {};
  defineMetadata('key', 'value', object, undefined);
  assert.same(getOwnMetadata('key', object, undefined), 'value');
  let prototype = {};
  object = create(prototype);
  defineMetadata('key', 'value', prototype, undefined);
  assert.same(getOwnMetadata('key', object, undefined), undefined);
  assert.same(getOwnMetadata('key', {}, 'name'), undefined);
  object = {};
  defineMetadata('key', 'value', object, 'name');
  assert.same(getOwnMetadata('key', object, 'name'), 'value');
  prototype = {};
  object = create(prototype);
  defineMetadata('key', 'value', prototype, 'name');
  assert.same(getOwnMetadata('key', object, 'name'), undefined);
});
