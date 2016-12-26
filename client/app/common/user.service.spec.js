'use strict';

import angular from 'angular';

import commonModule from './index';

describe('Service: UserService', function() {
  beforeEach(angular.mock.module(commonModule));

  var userService;
  var $httpBackend;

  const apiUserList = [
    {id: 1, name: 'Some User 1', email: 'user1@example.com'},
    {id: 2, name: 'Some User 2', email: 'user2@example.com'},
    {id: 2, name: 'Some User 3', email: 'user3@example.com'},
  ];

  beforeEach(inject(function(_$httpBackend_, _userService_) {
    $httpBackend = _$httpBackend_;
    $httpBackend.when('GET', '/api/users')
      .respond(apiUserList);

    userService = _userService_;
  }));

  it('should return list of users', function() {
    userService.getList().then(function(data) {
      data.should.eql(apiUserList);
    });
    $httpBackend.flush();
  });
});
