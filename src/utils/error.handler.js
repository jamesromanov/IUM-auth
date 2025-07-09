const errorHandler = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((err) => {
      res.status(500).json({ status: "Faliled", message: err.message });
    });
    next();
  };
};

module.exports = errorHandler;
