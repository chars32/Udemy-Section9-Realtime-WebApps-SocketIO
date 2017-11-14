const expect = require('expect');

const {isRealString} = require('./validation.js');
// Test al validation.js
describe('isRealString', () => {
  it('should reject non-string values', () => {
    var res = 123;

    expect(isRealString(res)).toBeFalsy();
  });

  it('should reject string with only spaces', () => {
    var res = '   ';

    expect(isRealString(res)).toBeFalsy();
  });

  it('should allow string with non-space characters', () => {
    var res = "Carlos     ";

    expect(isRealString(res)).toBeTruthy();
  });
})