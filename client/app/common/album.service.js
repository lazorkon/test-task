'use strict';

/**
 * @constructor
 */
function AlbumService($http, apiError) {
  'ngInject';

  this.getList = getList;

  /**
   * @param {Number?} userId
   * @returns {*}
   */
  function getList(userId) {
    var options = {};
    if (userId) {
      options.params = {};
      options.params.userId = userId;
    }
    return $http.get('/api/albums', options).then(response => response.data, apiError.handle);
  }
}

export default AlbumService;
