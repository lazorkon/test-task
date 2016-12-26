'use strict';

import angular from 'angular';

import commonModule from './index';

describe('Service: AlbumService', function() {
  beforeEach(angular.mock.module(commonModule));

  var albumService;
  var $httpBackend;

  function generateAlbumList(userId) {
    userId = userId || 2;
    return [1, 2, 3].map((albumId) => {
      var title = `Some Album ${albumId}`;
      var photos = [1, 2, 3, 4, 5].map((photoId) => ({albumId: albumId, id: photoId, title: `photo ${photoId}`}));
      return {userId, albumId, title, photos};
    });
  }

  beforeEach(inject(function(_$httpBackend_, _albumService_) {
    $httpBackend = _$httpBackend_;

    $httpBackend.when('GET', /\/api\/albums(?:\?.+)?/)
      .respond(function (method, url, data, headers, params) {
        return generateAlbumList(params.userId);
      });

    // $httpBackend.expectGET('/api/albums?userId=7')
    //   .respond(function (method, url, data, headers, params) {
    //     return generateAlbumList(params.userId);
    //   });

    albumService = _albumService_;
  }));

  it('should return list of albums', function() {
    var userId = 7;
    albumService.getList(userId).then(function(data) {
      data.should.eql(generateAlbumList(userId));
    });
    $httpBackend.flush();
  });
});
