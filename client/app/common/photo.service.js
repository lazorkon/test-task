'use strict';

/**
 * @constructor
 */
function PhotoService($http, apiError, toastr) {
  'ngInject';

  this.getList = getList;
  this.create = create;

  /**
   * @param {Number?} albumId
   * @returns {*}
   */
  function getList(albumId) {
    var options = {};
    if (albumId) {
      options.params = {};
      options.params.albumId = albumId;
    }
    return $http.get('/api/photos', options).then(response => response.data, apiError.handle);
  }

  function create(data) {
    return $http.post('/api/photos', data).then(response => {
      toastr.success(response.message || 'Photo has been Created', 'Success');
      return response.data;
    }, apiError.handle);
  }
}

export default PhotoService;
