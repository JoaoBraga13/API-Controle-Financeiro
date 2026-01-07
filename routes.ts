const express = require('express')

const router = express.Router()

router.get('/', (req: any, res: any) => {
  res.send('Hello World')
})

module.exports = router
