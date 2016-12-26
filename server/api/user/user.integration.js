'use strict';

import {assert} from 'chai';
import app from '../..';
import request from 'supertest';

describe('User API:', function () {

  describe('GET /api/users', function () {
    var users;

    beforeEach(function (done) {
      request(app)
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          users = res.body;
          done();
        });
    });

    afterEach(function () {
      users = null;
    });

    it('should respond with a list of users', function (done) {
      assert.isArray(users, 'is array');
      assert.isAtLeast(users.length, 10, 'list length is at lest 10');
      var user = users[0];
      assert.isObject(users[0], 'first user is object');
      assert.property(users[0], 'id', 'first user has id');
      assert.property(users[0], 'name', 'first user has name');
      assert.property(users[0], 'email', 'first user has email');
      assert.propertyVal(users[0], 'id', 1, 'first user id is 1');
      done();
    });

  });


  describe('GET /api/users/2', function () {
    var user;

    beforeEach(function (done) {
      request(app)
        .get('/api/users/2')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          user = res.body;
          done();
        });
    });

    afterEach(function () {
      user = {};
    });

    it('should respond with the correct user', function() {
      assert.isObject(user, 'is object');
      assert.property(user, 'id', 'has id');
      assert.property(user, 'name', 'has name');
      assert.property(user, 'email', 'has email');
      assert.propertyVal(user, 'id', 2, 'id is 2');
      assert.propertyVal(user, 'name', 'Ervin Howell', 'name is Ervin Howell');
      assert.propertyVal(user, 'email', 'Shanna@melissa.tv', 'email is Shanna@melissa.tv');
    });

  });

  describe('GET /api/users/0', function () {
    it('should respond with a 404 for unknown id', function (done) {
      request(app)
        .get('/api/users/0')
        .expect(404)
        .end(done);
    });
  });
});
