const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    })
    await user.save()
    res.status(201).send('User created')
  } catch (error) {

    if (error.code === 11000){
      res.status(400).send('Username already exists')
    } else if (error.name === 'ValidationError') {
      let errors = []

      for (let field in error.errors) {
        errors.push(error.errors[field].message)
      }
      
      return res.status(400).json({ errors: errors })
    } else {
      console.error(error)
      return res.status(500).send(error.message)
    }

    
  }
}

const loginUser = async (req, res) => {
  const user = await User.findOne({ username: req.body.username })
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })
    res.json({ token })
  } else {
    res.status(400).send('Invalid credentials')
  }
}

module.exports = {
  registerUser,
  loginUser,
}