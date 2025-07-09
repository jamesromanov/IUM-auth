const { response } = require("./response");
const errorHandler = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((err) => {
      console.log(err);
      response(res, err?.parent?.detail || err.message, 500);
    });
  };
};

module.exports = errorHandler;
