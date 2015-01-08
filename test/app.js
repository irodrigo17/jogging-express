var supertest = require('supertest');
var app = require('../app.js');

// TODO: setup a testing db

describe('signup endpoint', function(){

  it('should validate required parameters', function(done){

    var expectedError = {
      "error": {
        "message": "Validation failed",
        "name": "ValidationError",
        "errors": {
          "password": {
            "message": "Path `password` is required.",
            "name": "ValidatorError",
            "path": "password",
            "type": "required"
          },
          "email": {
            "message": "Path `email` is required.",
            "name": "ValidatorError",
            "path": "email",
            "type": "required"
          },
          "username": {
            "message": "Path `username` is required.",
            "name": "ValidatorError",
            "path": "username",
            "type": "required"
          }
        },
        "status": 400
      }
    };

    supertest(app)
    .post('/api/users/signup')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(expectedError)
    .expect(400, done);
  });

  it('should validate email uniqueness', function(done){
    throw new Error('implement me');
  });

  it('should validate username uniqueness', function(done){
    throw new Error('implement me');
  });

  it('should validate email format', function(done){
    throw new Error('implement me');
  });

  it('should validate password length', function(done){
    throw new Error('implement me');
  });

  it('should return user if signup is successful', function(done){

    var username = 'test-' + new Date();
    var email = username + '@email.com';
    var user = {
      username: username,
      email: email,
      password: 'password',
      name: 'name'
    };

    // TODO: check expected id length only
    var expectedUser = {
      id: '5498cb4dd7c48b2604a1f688',
      username: user.username,
      email: user.email,
      name: user.name
    };

    supertest(app)
    .post('/api/users/signup')
    .send(user)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(expectedUser)
    .expect(400, done);
  });

});


describe('signin endpoint', function(){

  it('should validate required parameters', function(done){
    throw new Error('implement me');
  });

  it('should validate username and password match', function(done){
    throw new Error('implement me');
  });

  it('should return access token if username and password match', function(done){
    throw new Error('implement me');
  });

});


describe('create jog endpoint', function(){

  it('should validate authentication', function(done){
    throw new Error('implement me');
  });

  it('should validate required parameters', function(done){
    throw new Error('implement me');
  });

  it('should return created jog with id and userId', function(done){
    throw new Error('implement me');
  });

});


describe('list jogs endpoint', function(){

  it('should validate authentication', function(done){
    throw new Error('implement me');
  });

  it('should list jogs created by authenticated user', function(done){
    throw new Error('implement me');
  });

  it('should filter jogs by date', function(done){
    throw new Error('implement me');
  });

  it('should paginate results', function(done){
    throw new Error('implement me');
  });

});


describe('show jog endpoint', function(){

  it('should validate authentication', function(done){
    throw new Error('implement me');
  });

  it('should validate authorization', function(done){
    throw new Error('implement me');
  });

  it('should show a jog', function(done){
    throw new Error('implement me');
  });

});


describe('update jog endpoint', function(){

  it('should validate authentication', function(done){
    throw new Error('implement me');
  });

  it('should validate authorization', function(done){
    throw new Error('implement me');
  });

  it('should update updatable fields only', function(done){
    throw new Error('implement me');
  });

  it('should return the updated jog', function(done){
    throw new Error('implement me');
  });

});


describe('delete jog endpoint', function(){

  it('should validate authentication', function(done){
    throw new Error('implement me');
  });

  it('should validate authorization', function(done){
    throw new Error('implement me');
  });

  it('should delete a jog', function(done){
    throw new Error('implement me');
  });

});


describe('get stats endpoint', function(){

  it('should validate authentication', function(done){
    throw new Error('implement me');
  });

  it('should return weekly stats', function(done){
    throw new Error('implement me');
  });

});


describe('update user endpoint', function(){

  it('should validate authentication', function(done){
    throw new Error('implement me');
  });

  it('should validate authorization', function(done){
    throw new Error('implement me');
  });

  it('should update allowed fields only', function(done){
    throw new Error('implement me');
  });

  it('should return the updated user', function(done){
    throw new Error('implement me');
  });

});


describe('delete user endpoint', function(){

  it('should validate authentication', function(done){
    throw new Error('implement me');
  });

  it('should validate authorization', function(done){
    throw new Error('implement me');
  });

  it('should delete user and jogs', function(done){
    throw new Error('implement me');
  });

  it('should invalidate all user tokens', function(done){
    throw new Error('implement me');
  });

});
