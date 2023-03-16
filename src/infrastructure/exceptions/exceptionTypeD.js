class ExceptionTypeD extends Error {
    constructor(message) {
      super(message);
      this.name = "ExceptionTypeD";
    }
}

module.exports = ExceptionTypeD;