const expect = require('chai').expect;

describe('Test', () => {
  it('Works', () => {expect(true).to.be.true;});
  it.skip('should fail', () => {
    expect(false).to.equal(true);
  });
});