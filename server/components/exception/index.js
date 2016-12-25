'use strict';

/**
 * note: we can not use es2015 class here because babel brake inheritance for errors ("new HTTPError instanceof HTTPError" will return false)
 * @see http://stackoverflow.com/questions/33870684/why-doesnt-instanceof-work-on-instances-of-error-subclasses-under-babel-node
 * @param code
 * @param message
 * @constructor
 */
function HTTPError(code, message) {
  Error.call(this, message);
  this.code = code;
}
HTTPError.prototype = Object.create(Error.prototype);
HTTPError.prototype.constructor = HTTPError;

export {
  HTTPError
};
