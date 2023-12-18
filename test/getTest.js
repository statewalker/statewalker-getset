import { default as expect } from 'expect.js';
import get from '../src/get.js';

describe('get', () => {

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
      { c: { d: 'Hello' } }
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

  it('should return undefined for non-existing paths', () => {
    test(
      { a: { b: { c : 'Hello' } } },
      'a.b.c.d.1',
      undefined
    );
  })

  function test(obj, path, control) {
    const value = get(obj, path);
    expect(value).to.eql(control);
  }


})
