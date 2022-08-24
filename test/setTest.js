import { default as expect } from 'expect.js';
import set from '../src/set.js';

describe('set', () => {

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
    const obj = set({}, path, value);
    expect(obj).to.eql(control);
  }

})