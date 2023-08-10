class CustomError {
  static createError({ name = "Error", cause, message, code }) {
    console.log("customError")
    const error = new Error(message, { cause });
    console.log(error)
    error.name = name;
    error.code = code;

    throw error;
  }
}

module.exports = CustomError;


