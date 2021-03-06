const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../../db/models");

module.exports = (app) => {
  app.use(session({ secret: "flora", resave: true, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());

  //Configurando passport
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      function (email, password, done) {
        User.findOne({
          where: { email: email },
        })
          .then((user) => {
            if (!user) {
              return done(null, false, {
                message: "Incorrect email or password ",
              }); // user not found
            }
            user.hashPassword(password, user.salt).then((hash) => {
              if (hash !== user.password) {
                return done(null, false, {
                  message: "Incorrect email or password ",
                }); // invalid password
              }
              done(null, user); // success :D
            });
          })
          .catch(done);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findByPk(id).then((user) => done(null, user));
  });
};
