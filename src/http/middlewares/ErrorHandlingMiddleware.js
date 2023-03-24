
//* eslint-disable no-query-reassign *
// eslint-disable-next-line no-unused-vars
const errorHandlingMiddlware = function (err, req, res, next) {
  err.statusCode = err.statusCode || 404;
  return err.customMessage || err.message
    ? res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.customMessage || err.message
      })
    : res.status(err.statusCode).json({ status: err.statusCode, message: err });
}

module.exports = {
  errorHandlingMiddlware
};

