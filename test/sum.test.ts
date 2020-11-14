import sum from '../src/sum';
import * as assert from 'assert';
import * as chai from 'chai'
describe('test sum',()=>{
  it('1+1=2',()=>{
    assert.equal(sum(1,1),2);
  })
  it('2+2=4',()=>{
    chai.expect(2+2).to.be.equal(4);
  })
});