const express = require('express')
const router = express.Router()
const userRoute = require('./src/routes/user.routes')


router.get('/', (req: any, res: any) => {
  res.send('Hello World')
})

router.use('/users', userRoute)

module.exports = router
