const express = require('express');
const authMiddleware=require("../middlewares/auth.middleware.js");
const foodController=require("../controller/food.controller.js");
const multer = require('multer');
const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
   
})


router.post("/create",authMiddleware.authFoodPartnerMiddleware, upload.single('video'), foodController.createFood)
router.get("/getfoods",authMiddleware.authFoodUserMiddleware, foodController.getFoods)


router.post("/like/:id",authMiddleware.authFoodUserMiddleware, foodController.toggleLike)
router.post("/comment/:id",authMiddleware.authFoodUserMiddleware, foodController.addComment)
router.get("/comments/:id",authMiddleware.authFoodUserMiddleware, foodController.getComments)
router.post("/share/:id",authMiddleware.authFoodUserMiddleware, foodController.shareFood)
router.post("/save/:id",authMiddleware.authFoodUserMiddleware, foodController.toggleSaveFood)


module.exports = router;