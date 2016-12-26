'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var userCtrlStub = {
  index: 'userCtrl.index',
  show: 'userCtrl.show',
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy(),
};

var routerFactory = proxyquire('../../components/helpers/routerFactory', {
  express: {
    Router() {
      return routerStub;
    }
  },
});

// require the index with our stubbed out modules
var userIndex = proxyquire('./index.js', {
  '../../components/helpers/routerFactory': routerFactory,
  './user.controller': userCtrlStub
});

describe('User API Router:', function () {
  it('should return an express router instance', function () {
    userIndex.should.equal(routerStub);
  });

  describe('GET /api/users', function () {
    it('should route to user.controller.index', function () {
      routerStub.get
        .withArgs('/', 'userCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/users/:id', function () {
    it('should route to user.controller.show', function () {
      routerStub.get
        .withArgs('/:id', 'userCtrl.show')
        .should.have.been.calledOnce;
    });
  });

});
