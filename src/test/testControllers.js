const Test = require("./testModel");

exports.addTestString = async (req, res) => {
  try {
    const testString = await Test.create(req.body)
    res.status(200).send({ test: testString })
  } catch (error){
    res.status(500).send({ error: error.message })
  }
}

exports.getTestString = async (req, res) => {
  try {
    const testString = await Test.findOne({});
    res.status(200).send({ test: testString})
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

exports.testLandingPage = async (req, res) => {
  try {
    res.set("Content-Type", "text/html");
    res.status(200).send('<h2>Test Landing Page</h2>');
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

exports.testLoggedInPage = async (req, res) => {
  try {
    res.set("Content-Type", "text/html");
    res.status(200).send("<h2>Test Logged In Page</h2>");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.testLoggedOutPage = async (req, res) => {
  try {
    res.set("Content-Type", "text/html");
    res.status(200).send("<h2>Test Logged Out Page</h2>");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};