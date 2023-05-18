const userRouter = require('./src/users/routes')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())
app.use('/', userRouter)

app.listen(4000, () => {
  console.log('Running an API server at http://localhost:4000')
})
