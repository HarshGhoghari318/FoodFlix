const express = require('express');
const authController = require('../controller/auth.controllers.js');
const { authFoodUserMiddleware, authFoodPartnerMiddleware } = require('../middlewares/auth.middleware');
const { route } = require('./food.routes.js');
const router = express.Router();


//user routes
router.post('/user/register', authController.registerUser)
router.post('/user/login', authController.loginUser)
router.get('/user/logout', authController.logoutUser)
router.get('/user/me', authFoodUserMiddleware, authController.getMe)
router.post('/user/follow/:id', authFoodUserMiddleware, authController.toggleFollowPartner)

//food partner routes
router.post('/foodpartner/register', authController.registerFoodPartner)
router.post('/foodpartner/login', authController.loginFoodPartner)
router.get('/foodpartner/logout', authController.logoutFoodPartner)
router.get('/foodpartner/:id', authController.getFoodPartner)
router.get('/foodpartner/search/:search', authController.getFoodPartnerByName)

router.get('/me',authFoodPartnerMiddleware,authController.getTokenPartner)



module.exports = router;