const mongoose = require('mongoose')

const FoodSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
      },
      picture: {
        type: String, 
        required: false, 
      }
}, {timestamps: true})

module.exports = mongoose.model('Food', FoodSchema)