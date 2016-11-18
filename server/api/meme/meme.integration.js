'use strict';

var app = require('../..');
import request from 'supertest';

var newMeme;

describe('Meme API:', function() {
  describe('GET /api/memes', function() {
    var memes;

    beforeEach(function(done) {
      request(app)
        .get('/api/memes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          memes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      memes.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/memes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/memes')
        .send({
          name: 'New Meme',
          info: 'This is the dank new meme!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newMeme = res.body;
          done();
        });
    });

    it('should respond with the newly created meme', function() {
      newMeme.name.should.equal('New Meme');
      newMeme.info.should.equal('This is the brand new meme!!!');
    });
  });

  describe('GET /api/memes/:id', function() {
    var meme;

    beforeEach(function(done) {
      request(app)
        .get(`/api/memes/${newMeme._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          meme = res.body;
          done();
        });
    });

    afterEach(function() {
      meme = {};
    });

    it('should respond with the requested meme', function() {
      meme.name.should.equal('New Meme');
      meme.info.should.equal('This is the brand new meme!!!');
    });
  });

  describe('PUT /api/memes/:id', function() {
    var updatedMeme;

    beforeEach(function(done) {
      request(app)
        .put(`/api/memes/${newMeme._id}`)
        .send({
          name: 'Updated Meme',
          info: 'This is the updated meme!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedMeme = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMeme = {};
    });

    it('should respond with the original meme', function() {
      updatedMeme.name.should.equal('New Meme');
      updatedMeme.info.should.equal('This is the brand new meme!!!');
    });

    it('should respond with the updated meme on a subsequent GET', function(done) {
      request(app)
        .get(`/api/memes/${newMeme._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let meme = res.body;

          meme.name.should.equal('Updated Meme');
          meme.info.should.equal('This is the updated meme!!!');

          done();
        });
    });
  });

  describe('PATCH /api/memes/:id', function() {
    var patchedMeme;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/memes/${newMeme._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Meme' },
          { op: 'replace', path: '/info', value: 'This is the patched meme!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedMeme = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedMeme = {};
    });

    it('should respond with the patched meme', function() {
      patchedMeme.name.should.equal('Patched Meme');
      patchedMeme.info.should.equal('This is the patched meme!!!');
    });
  });

  describe('DELETE /api/memes/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/memes/${newMeme._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when meme does not exist', function(done) {
      request(app)
        .delete(`/api/memes/${newMeme._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
