import { default as expect } from 'expect.js';
import * as getset from '../src/index.js';

describe('getset: getters', () => {

  it('should be able to return the root value', () => {
    test(
      { a: { b: { c: { d: 'Hello' } } } },
      '',
      { a: { b: { c: { d: 'Hello' } } } },
    );
  });

  it('should be able to get the deepest values', () => {
    test(
      { a: { b: { c: { d: 'Hello' } } } },
      'a.b.c.d',
      'Hello'
    );
  })

  it('should be able to get intermediate object values', () => {
    test(
      { a: { b: { c: { d: 'Hello' } } } },
      'a.b',
      { c : { d : 'Hello' } }
    );
  });

  it('return undefined for non-existing paths', () => {
    test(
      { a: { b: { c: { d: 'Hello' } } } },
      'a.b.c.d.e',
      undefined
    );
    test(
      { a: { b: { c: { d: 'Hello' } } } },
      'a.b.x',
      undefined
    );
    test(
      { a: { b: { c: { d: 'Hello' } } } },
      'foobar',
      undefined
    );
  })

  it('should return index-based values', () => {
    test(
      { a: { b: { c: { d: 'Hello' } } } },
      'a.b.c.d.1',
      'e'
    );
  })

  function test(obj, path, control) {
    const getter = getset.newGetter(path);
    const value = getter(obj);
    expect(value).to.eql(control);
  }


})

describe('getset: setters', () => {

  it('should be able to set "deep" values', () => {
    test(
      '',
      'Hello',
      'Hello'
    );
  });

  it('should be able to set "deep" values', () => {
    test(
      'a',
      { b: { c: { d: 'Hello' } } },
      { a: { b: { c: { d: 'Hello' } } } },
    );
  });

  it('should be able to set "deep" values', () => {
    test(
      'a.b.c.d',
      'Hello',
      { a: { b: { c: { d: 'Hello' } } } },
    );
  });
  function test(path, value, control) {
    const setter = getset.newSetter(path);
    const obj = setter({}, value);
    expect(obj).to.eql(control);
  }

})