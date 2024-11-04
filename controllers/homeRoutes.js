const router = require('express').Router()
const { User, Post } = require('../models')

// impport auth middleware
const withAuth = require('../utils/auth')

// GET blog posts
router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      loggedIn: req.session.loggedIn
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

// GET login route
router.get('/login', async (req, res) => {
  if (req.session.loggedIn) {
    // redirect to homepage if logged in
    res.redirect('/')
    return
  }

  // go to login page if not logged in
  res.render('login')
})

module.exports = router