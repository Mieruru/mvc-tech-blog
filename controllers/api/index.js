const router = require('express').Router()

const userRoutes = require('./userRoutes')
// const postRoutes = require('./postRoutes')

router.use('/users', userRoutes)
// router.use('/postes', postRoutes)

module.exports = router