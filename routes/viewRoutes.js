const express = require('express');
const viewsController = require('../controllers/viewsController')
const authControler = require('../controllers/authController')

const router = express.Router();

 

  router.get('/',authControler.isLoggedIn, viewsController.getOverview);
  router.get('/tour/:slug', authControler.isLoggedIn, viewsController.getTour);
  router.get('/login', authControler.isLoggedIn,viewsController.getLoginForm);
  router.get('/me', authControler.protect,viewsController.getAccount);

module.exports = router;