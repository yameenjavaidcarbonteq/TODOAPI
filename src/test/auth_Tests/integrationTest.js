require('module-alias/register');
url = "/api/auth/google/callback?code=4%2F0AVHEtk7drwzW4TgPxk-8aCgnoaBQFAvgFLkjOH1WGKGZQghzqomBUB71vf7O8XegJ_WLuA&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+openid&authuser=2&hd=lhr.nu.edu.pk&prompt=consent"
const app = require("../../http/bootstrap/app");
const chai = require  ('chai');
const chaiHttp = require  ('chai-http');
chai.use(chaiHttp);
const { expect } = chai;

describe("Google Authentication", () => {
  it("Should save information sent from google api", async () => {
    const res = await chai.request(app).get(url);
    expect(res.status).to.equal(200);
  });
});