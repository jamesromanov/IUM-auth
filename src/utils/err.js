const err = (err, req, res, next) => {
  res.status(500).json({ status: "Failed", err: err });
};

module.exports = err;
