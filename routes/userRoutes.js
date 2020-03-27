const express = require('express');
const userController =require('../controllers/userController')
const authController =require('../controllers/authController')


const router = express.Router();

router.get('/me', 
authController.protect,
userController.getMe,
userController.getUser)
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

//Protect all routes after this middleware
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);

router.patch('/updateMe',  userController.updateMe);
router.delete('/deleteMe',  userController.deleteMe);

router.use(authController.restrictTo('admin'));

//Routs
router
.route('/')
.get(userController.getAllUsers)
.post(userController.createUser);

router
.route('/:id')
.get(userController.getUser)
.patch(userController.updateUser)
.delete(userController.deleteUser);



module.exports = router;