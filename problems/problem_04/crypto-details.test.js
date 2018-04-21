const { expect } = require('chai');
const { stub } = require('sinon');
const { cryptoDetails } = require('./crypto-details');

const mockRequest = (mock) => {
  return Promise.resolve({
    json: () => mock
  });
}

describe('crypto-details', () => {
  const ethMock = {
    "coin": {
      "btc": 0.06884161, 
      "name": "Ethereum", 
      "rank": 2, 
      "ticker": "eth", 
      "usd": 604.62
    }
  };

  const xrpMock = {
    "coin": {
      "btc": 0.00009794, 
      "name": "Ripple", 
      "rank": 3, 
      "ticker": "xrp", 
      "usd": 0.861046
    }
  };

  beforeEach(() => {
    this.fetch = stub(global, 'fetch');
    this.fetch.onCall(0).returns(mockRequest(ethMock));
    this.fetch.onCall(1).returns(mockRequest(xrpMock));
  });

  afterEach(() => {
    global.fetch.restore();
  });

  it('should return data from api', (done) => {
    cryptoDetails(['eth', 'xrp'])
      .then((actualResult) => {
        let expectedResult = [].concat(ethMock).concat(xrpMock);
        expect(actualResult).to.deep.equal(expectedResult);
        done();
      });
  })
});

