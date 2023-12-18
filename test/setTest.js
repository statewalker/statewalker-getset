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
    let source = {};
    let obj = set(source, path, value);
    expect(source !== obj).to.be(true);
    expect(obj).to.eql(control);

    // source = obj;
    // obj = set(source, path, value);
    // expect(source !== obj).to.be(true);
    // expect(obj).to.eql(control);
  }

})