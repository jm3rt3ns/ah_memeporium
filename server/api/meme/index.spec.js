'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var memeCtrlStub = {
  index: 'memeCtrl.index',
  show: 'memeCtrl.show',
  create: 'memeCtrl.create',
  upsert: 'memeCtrl.upsert',
  patch: 'memeCtrl.patch',
  destroy: 'memeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var memeIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './meme.controller': memeCtrlStub
});

describe('Meme API Router:', function() {
  it('should return an express router instance', function() {
    memeIndex.should.equal(routerStub);
  });

  describe('GET /api/memes', function() {
    it('should route to meme.controller.index', function() {
      routerStub.get
        .withArgs('/', 'memeCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/memes/:id', function() {
    it('should route to meme.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'memeCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/memes', function() {
    it('should route to meme.controller.create', function() {
      routerStub.post
        .withArgs('/', 'memeCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/memes/:id', function() {
    it('should route to meme.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'memeCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/memes/:id', function() {
    it('should route to meme.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'memeCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/memes/:id', function() {
    it('should route to meme.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'memeCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
