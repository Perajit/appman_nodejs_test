const { expect } = require('chai');
const { stub } = require('sinon');
const src = require('./bangkok-forecast');
const mock = require('./bangkok-forecast.test.mock');
const expected = require('./bangkok-forecast.test.expected');

const mockRequest = (mock) => {
  return Promise.resolve({
    json: () => mock
  });
}

describe('bangkok-forecase', () => {
  describe('bangkokForecast', () => {
    beforeEach(() => {
      this.fetch = stub(global, 'fetch');
      this.fetch.returns(mockRequest(mock));

      this.convertData = stub(src, 'convertData');
      this.convertData.returns(expected);
    });

    afterEach(() => {
      global.fetch.restore();
    });

    it('should return converted data from api', (done) => {
      src.bangkokForecast()
        .then((actualResult) => {
          expect(actualResult).to.deep.equal(expected);
          done();
        });
    });
  });

  describe('convertData', () => {
    it('should convert data correctly', () => {
      let actualResult = src.convertData(mock);
      expect(actualResult).to.deep.equal(expected);
    });
  });
});

