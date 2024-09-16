const chai = require  ('chai');
const chaiHttp = require  ('chai-http');

const app = require  ('../http/bootstrap/app');
chai.use(chaiHttp);
const { expect } = chai;

describe('Server', () => {
  it('should get welcome message', async () => {
    const res = await chai.request(app)
      .get('/api');
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal(
      'Welcome to Todo API Carbonteq.'
    );
  });
});