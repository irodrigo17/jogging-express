# Jogging API

This is a RESTful API for the [Jogging app](https://github.com/irodrigo17/jogging-demo-app).

It's built on top of a [Node.js](http://nodejs.org/) stack, using [Express.js](http://expressjs.com/) as the basic HTTP framework.

Storage is handled by [MongoDB](http://www.mongodb.org/) through [Mongoose](http://mongoosejs.com/).

## TODOs

#### Features

- PATCH /api/users/:userId
- DELETE /api/users/:userId
- PATCH /api/jogs/:jogId
- POST /api/users/sigout
- Filter jogs by dates
- Weekly stats endpoint
- Email verification
- Password reset
- Invalidate token
- Social auth (Facebook/Twitter)

#### Quality

- Error handling
- Documentation
- Tidy up (check TODOs in the code)
- SSL
- Complete tests (coverage)
- Deployment
- Automate stuff (Grunt)
- Linter
- Static analysis
- CI
- Code quality metrics
