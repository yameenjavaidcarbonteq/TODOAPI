const {
    ARGUMENT_INVALID,
    ARGUMENT_NOT_PROVIDED,
    ARGUMENT_OUT_OF_RANGE,
    CONFLICT,
    INTERNAL_SERVER_ERROR,
    NOT_FOUND,
  } = require('./');
  
  class ExceptionBase extends Error {
    constructor(message) {
      super(message);
      Error.captureStackTrace(this, this.constructor);
      this.name = this.constructor.name;
    }
  }
  
  class ArgumentInvalidException extends ExceptionBase {
    constructor() {
      super();
      this.code = ARGUMENT_INVALID;
    }
  }
  
  class ArgumentNotProvidedException extends ExceptionBase {
    constructor() {
      super();
      this.code = ARGUMENT_NOT_PROVIDED;
    }
  }
  
  class ArgumentOutOfRangeException extends ExceptionBase {
    constructor() {
      super();
      this.code = ARGUMENT_OUT_OF_RANGE;
    }
  }
  
  class ConflictException extends ExceptionBase {
    constructor() {
      super();
      this.code = CONFLICT;
    }
  }
  
  class NotFoundException extends ExceptionBase {
    static message = 'Not found';
  
    constructor(message = NotFoundException.message) {
      super(message);
      this.code = NOT_FOUND;
    }
  }
  
  class InternalServerErrorException extends ExceptionBase {
    static message = 'Internal server error';
  
    constructor(message = InternalServerErrorException.message) {
      super(message);
      this.code = INTERNAL_SERVER_ERROR;
    }
  }
  
  module.exports = {
    ArgumentInvalidException,
    ArgumentNotProvidedException,
    ArgumentOutOfRangeException,
    ConflictException,
    NotFoundException,
    InternalServerErrorException,
  };
  