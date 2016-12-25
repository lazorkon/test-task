'use strict';

/**
 * @constructor
 */
function UserService($http, apiError) {
  'ngInject';

  this.getList = getList;

  function getList() {
    return $http.get('/api/users').then(response => response.data, apiError.handle);
  }
}

export default UserService;
