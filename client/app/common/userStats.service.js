'use strict';

/**
 * @constructor
 */
function UserStatsService($http, apiError) {
  'ngInject';

  this.getCounts = getCounts;

  function getCounts() {
    return $http.get('/api/user-stats').then(response => response.data, apiError.handle);
  }
}

export default UserStatsService;
