const Food = require('../models/food.model')

exports.addFood = async (req, res) => {
    try {
        const { name, description, rating } = req.body

        if (!req.auth || !req.auth.userId) {
            return res.status(403).send('User not authenticated ')
        }

        let picture
        if (req.file) {
            picture = req.file.path
        } else {
            picture = ''
        }
  
      const newFood = new Food({
        user: req.auth.userId, 
        name,
        description,
        rating,
        picture,
      })
  
      const savedFood = await newFood.save()
      res.json(savedFood)
    } catch (err) {
      console.error(err)
      res.status(500).send('Server Error')
    }
  }
  
  exports.getFoods = async (req, res) => {
    try {
      const foods = await Food.find({ user: req.auth.userId })
      res.status(200).json(foods)
      
    } catch (err) {
      console.error(err)
      res.status(500).send('Server Error')
    }
  }

  exports.getFoodById = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id)
        if (!food) return res.status(404).send('Food not found')
        res.json(food)
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
}


    exports.updateFoodById = async (req, res) => {
        try {
          const { name, description, rating } = req.body
          console.log('Form Data Received:', { name, description, rating })
          let update = { name, description, rating }
      
          if (req.file) {
            update.picture = req.file.path
          } 
      
          const food = await Food.findByIdAndUpdate(req.params.id, update, { new: true })
          if (!food) {
            return res.status(404).send('Food not found')
          }
          res.json(food)
        } catch (err) {
          console.error(err)
          res.status(500).send('Server Error')
        }
      }

    
    exports.deleteFoodById = async (req, res) => {
        try {
            const food = await Food.findByIdAndDelete(req.params.id)
            if (!food) return res.status(404).send('Food not found')
            res.send('Food deleted successfully')
        } catch (err) {
            console.error(err)
            res.status(500).send('Server Error')
        }
    }