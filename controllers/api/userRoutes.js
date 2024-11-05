const router = require('express').Router()
const { User } = require('../../models')

// GET all users
router.get('/', async (req, res) => {
  try {
    // gather all user objects, exclude password
    const userDb = await User.findAll({
      attributes: {
        exclude: ['password']
      }
    })

    // return all users
    res.json(userDb)

  } catch (err) {
    res.status(500).json(err)
  }
})

// POST new user
router.post('/', async (req, res) => {
  try {

    // push user object to database
    const userDb = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })

    // save session info using new user object
    req.session.save(() => {
      req.session.logged_in = true
      res.status(200).json(userDb)
    })

  } catch (err) {
    res.status(500).json(err)
  }
})

// login route
router.post('/login', async (req, res) => {
  try {
    // search database for user with matching email
    const userDb = await User.findOne({
      where: {
        email: req.body.email
      }
    })

    // throw bad request if response doesn't match or isn't found
    if (!userDb) {
      res.status(400).json({ message: `Incorrect email or password.` })
      return
    }

    // check password
    const passCheck = await userDb.checkPassword(req.body.password)

    // throw bad request if password doesn't match
    if (!passCheck) {
      res.status(400).json({ message: `Incorrect email or password.` })
      return
    }

    // save session info using new user object
    req.session.save(() => {
      req.session.logged_in = true
      req.session.user_id = userDb.id
      res.status(200).json({ user: userDb, message: `Login successful.` })
      res.redirect('/')
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

// logout route
router.post('logout', async (req, res) => {

  // terminate session if logged in
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end()
    })

    // not found if not logged in
  } else {
    res.status(404).end()
  }
})

module.exports = router