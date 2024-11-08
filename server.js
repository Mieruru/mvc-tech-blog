// entry point for application
const path = require('path')

// import express, routes, and helpers
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const routes = require('./controllers')
const helpers = require('./utils/helpers')

// import sequelize and session store
const sequelize = require('./config/connection')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

// create express instance
const app = express()
const PORT = process.env.PORT || 3001 // set port

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers })

// define session variables
const sess = {
  secret: process.env.SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
}

app.use(session(sess))

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(routes)

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'))
})
