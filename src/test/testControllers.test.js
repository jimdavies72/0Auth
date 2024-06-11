const supertest = require("supertest");
const { createServer } = require("../utils/createServer");

app = createServer();

describe("test controllers", () => {
  describe("given the user is testing the server", () => {
    describe("when a test string is posted then", () => {
      it("shoud return 200 and the test string", async () => {
        //arrange
        const req = { testString: "test string one"}

        //act
        await supertest(app)
          .post("/test")
          .send(req)
        
        //assert
          .expect(200)
          .expect((res) => {
            expect(res.body.testString).toEqual("test string one")
          })
      });
    });
  });
});