var supertest = require('supertest');
var app = require('../app.js');

// TODO: mock mongo db or setup testing db
// TODO: test bad body
// TODO: test bad HTTP method
// TODO: test bad headers
// TODO: test bad email format
// TODO: test duplicated username
// TODO: test duplicated email
// TODO: test password length
// TODO: test optional name


describe('GET /users', function(){
  it('should throw several validation errors on signup', function(done){

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
});

describe('GET /users', function(){
  it('should signup correctly', function(done){

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

it('should fail', function(done) {
  throw new Error('missing tests');
});

