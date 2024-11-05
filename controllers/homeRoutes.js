const router = require('express').Router()
const { User, Post } = require('../models')

// impport auth middleware
const withAuth = require('../utils/auth')

// GET blog posts
router.get('/', async (req, res) => {
  try {

    // return all posts, include user
    const postData = await Post.findAll({
      include: [{ model: User, attributes: { exclude: ['password'] } }]
    })

    // translate data into handlebars readable
    const posts = postData.map((posts) => posts.get({ plain: true }))

    // render posts to template
    res.render('posts', { posts })

  } catch (err) {
    res.status(500).json(err)
  }
})

// GET registration route
router.get('/register', async (req, res) => {
  try {

    res.render('register')

  } catch (err) {
    res.status(500).json(err)
  }
})

// GET login route
router.get('/login', async (req, res) => {
  if (req.session.logged_in) {
    // redirect to homepage if logged in
    res.redirect('/')
    return
  }

  // go to login page if not logged in
  res.render('login')
})

module.exports = router