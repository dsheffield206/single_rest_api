### Code Fellows D49 Week 3 Assignment - Create A Single Resource REST API with Authentication

#### Single Resource REST API - Summary
+ This is project creates a single resource REST API that is backed by MongoDB.
+ This API adds the Mongo feature of collection count and sort.
+ index.js runs the program.
+ server.js represents the server file.
+ routes/team_routes.js is our router for the API.
+ models/team.js represents the schema for our collection (of LSU players).
+ We are using [MongoDB](https://www.mongodb.org/), plus [Mongoose](http://mongoosejs.com/) and [Body-Parser](https://www.npmjs.com/package/body-parser).
+ test/team_test.js includes a Mocha / Chai tests.

#### PART 2 - Add Authentication to the REST API - Summary
+ The second step to this project adds authentication using BasicHTTP and Tokens to the single resource API.
+ The program uses an asynchronous version of the [bcrypt](https://www.npmjs.com/package/bcrypt) hashing functions and provides validation to make sure that all incoming usernames are unique.
+ Part 2 - Auth - also removes the 'pyramids of doom' by using event emitters.
+ routes/user_routes.js is the new user auth for the API.
+ models/user.js represents the new user schema that makes sure that all usernames are uniqe.
+ lib/http_basic.js splits the username and password using [bcrypt](https://www.npmjs.com/package/bcrypt) hashing.
+ lib/eat_auth.js decodes the toke to verify a user upon login using [eat](https://www.npmjs.com/package/eat).
+ test/user_tests.js provides Mocha / Chai testing for the new js logic added for Part 2.
