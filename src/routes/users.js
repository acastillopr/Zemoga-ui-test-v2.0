const router = require('express').Router();
const User = require('../models/User');
const passport = require('passport');

router.get('/users/signin', (req, res) => {
  res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/signin',
  failureFlash: true
}));

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
  });

  router.post('/users/signup', async (req, res) => {
    const { nameUser, email, password, confirm_password} = req.body;
    const errors = [];
    if(nameUser <= 0 || email <=0 || password <= 0){
      errors.push({text: 'The fields cannot be empty'})
    }
    if(password != confirm_password){
      errors.push({text: 'The passwords dont match'})
    }
    if(password.length < 4) {
      errors.push({text: 'Password must be at least 4 characters'});
    }
    if(errors.length>0){
      res.render('users/signup', {errors, nameUser, email, password, confirm_password});
    }else{
      const emailUser = await User.findOne({email: email});
      if(emailUser){
        req.flash('error_msg', 'An User with the email already exist');
        res.redirect('/users/signup');
      }
      const newUser = new User({nameUser, email, password});
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash('success_msg', 'User Created');
      res.redirect('/users/signin');
    }
  });
  
router.get('/users/logout', (req, res) => {
req.logout();
res.redirect('/');
});


module.exports = router;