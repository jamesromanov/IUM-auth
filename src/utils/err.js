const err = (err, req, res, next) => {
  res.status(500).json({ status: "Failed", message: err });
};

module.exports = err;
