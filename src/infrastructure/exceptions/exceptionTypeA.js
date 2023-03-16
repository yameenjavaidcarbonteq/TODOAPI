class ExceptionTypeA extends Error {
  constructor(message) {
    super(message);
    this.name = "ExceptionTypeA";
  }
}

module.exports = ExceptionTypeA;