/**
 * Adding a `code` string with a custom status code for every
 * exception is a good practice, since when that exception
 * is transferred to another process `instanceof` check
 * cannot be performed anymore so a `code` string is used instead.
 * code constants can be stored in a separate file so they
 * can be shared and reused on a receiving side (code sharing is
 * useful when developing fullstack apps or microservices)
 */
const ARGUMENT_INVALID = 'GENERIC.ARGUMENT_INVALID';
const ARGUMENT_OUT_OF_RANGE = 'GENERIC.ARGUMENT_OUT_OF_RANGE';
const ARGUMENT_NOT_PROVIDED = 'GENERIC.ARGUMENT_NOT_PROVIDED';
const NOT_FOUND = 'GENERIC.NOT_FOUND';
const CONFLICT = 'GENERIC.CONFLICT';
const INTERNAL_SERVER_ERROR = 'GENERIC.INTERNAL_SERVER_ERROR';


module.exports = {
    ARGUMENT_INVALID,
    ARGUMENT_OUT_OF_RANGE,
    ARGUMENT_NOT_PROVIDED,
    NOT_FOUND,
    CONFLICT,
}
