var express = require('express');
var router = express.Router();

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

router.use(passport.initialize());

passport.use(new FacebookStrategy({
  clientID : '369042800498666',
  clientSecret : 'c1ffc22bada25c5a61d7ceba6da85979',
  callbackURL: 'https://eebd6803.ap.ngrok.io/authFacebook/done',
  profileFields: ['id', 'name', 'email', 'photos']
}, function(accessToken, refreshToken, profile, done){
  return done(null, profile);
}))

passport.serializeUser(function(profile,done){
  return done(null, profile);
})

passport.deserializeUser(function(profile,done){
  return done(null, profile);
})

router.get('/authFacebook', passport.authenticate('facebook'));
router.get('/authFacebook/done', 
passport.authenticate('facebook', {
  failureRedirect: '/'
}),function(req,res){
  return res.json(req.user);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
