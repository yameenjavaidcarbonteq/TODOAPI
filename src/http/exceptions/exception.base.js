const { RequestContextService } = require('@libs/application/context/AppRequestContext');

/**
 * @typedef {Object} SerializedException
 * @property {string} message
 * @property {string} code
 * @property {string} correlationId
 * @property {string} [stack]
 * @property {string} [cause]
 * @property {*} [metadata]
 */

/**
 * Base class for custom exceptions.
 *
 * @abstract
 * @class ExceptionBase
 * @extends {Error}
 */
class ExceptionBase extends Error {
  /**
   * @param {string} message
   * @param {Error} [cause]
   * @param {*} [metadata]
   */
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    
  }

  toJSON() {
    return {
      message: this.message,
      code: this.code,
      stack: this.stack,
      
    };
  }
}

module.exports = {
  ExceptionBase,
};
