require('dotenv').config()
const express = require("express")
const cors = require('cors')
const app = express()
const port = 8000
const userRouter = require("./routes/user.routes")
const foodRouter = require('./routes/food.routes')

require('./config/mongoose.config')

app.use('/public/uploads', express.static('public/uploads'))
app.use(express.json(), express.urlencoded({ extended: true }))
app.use(cors())
app.use('/api/users', userRouter)
app.use('/api/foods', foodRouter)

app.listen(port, () => console.log(`The server is all fired up on port ${port}`))