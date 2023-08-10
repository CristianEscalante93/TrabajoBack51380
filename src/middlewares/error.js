const {EError}= require("../errors/enums.js");

module.exports = (error, req, res, next) => {

  console.log(error);

  switch (error.code) {
    case EError.INCOMPLETE_FIELD_ERROR:
      res.status(400).send({
        status: 'error',
        error: error.name,
        cause: error.cause,
      });
      break;

    default:
      res.send({
        status: 'error',
        error: 'Unhandler error',
      });
      break;
  }
};
