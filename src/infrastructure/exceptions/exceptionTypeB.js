class ExceptionTypeB extends Error {
  constructor(message) {
    super(message);
    this.name = "ExceptionTypeB");
  }
}

module.exports = ExceptionTypeB;