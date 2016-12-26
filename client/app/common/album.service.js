'use strict';

/**
 * @constructor
 */
function AlbumService($http, apiError) {
  'ngInject';

  this.getList = getList;

  /**
   * @param {Number?} userId
   * @param {{withPhotos: Boolean}?} options
   * @returns {*}
   */
  function getList(userId, options) {
    var httpOptions = {params: {}};
    httpOptions.paramSerializer = '$httpParamSerializerJQLike';
    if (userId != null) {
      httpOptions.params.filter = {userId};
    }
    if (options) {
      httpOptions.params.options = options;
    }
    return $http.get('/api/albums', httpOptions).then(response => response.data, apiError.handle);
  }
}

export default AlbumService;
