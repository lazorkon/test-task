'use strict';

/**
 * @constructor
 */
function ApiError($q, toastr) {
  'ngInject';

  this.handle = handle;

  function handle(response) {
    toastr.error(response.message || 'Something went wrong', 'API Error');
    return $q.reject(response);
  }
}

export default ApiError;
