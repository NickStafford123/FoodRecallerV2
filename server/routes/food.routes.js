const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = require('../config/multer.config')
const foodController = require('../controllers/food.controller')
const isAuthenticated = require('../middlewares/auth')

router.post('/add', upload, isAuthenticated, foodController.addFood)

router.get('/getAllFoods', isAuthenticated, foodController.getFoods)

router.get('/:id', isAuthenticated, foodController.getFoodById)

router.put('/:id', isAuthenticated, foodController.updateFoodById)

router.delete('/:id', upload, isAuthenticated, foodController.deleteFoodById)

module.exports = router