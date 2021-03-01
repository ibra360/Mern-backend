const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const Key = require("../config/key");
const optn = {};
optn.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
optn.secretOrKey = Key.secretOrKey;
module.exports = (passport) => {
  passport.use(
    "jwt-user",
    new JwtStrategy(optn, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
};
