const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../7-http_express');

chai.use(chaiHttp);
chai.should();

describe('More complex HTTP server using Express', () => {
  describe('/ endpoint', () => {
    it('Returns the right content', (done) => {
      chai.request(app)
        .get('/')
        .end((error, response) => {
          chai.expect(response.text).to.equal('Hello Holberton School!');
          chai.expect(response.statusCode).to.equal(200);
          done();
        });
    });
  });
});
