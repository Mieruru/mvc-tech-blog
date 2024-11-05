// sequelize connection
const sequelize = require('../config/connection')

// import models
// const { User, Post } = require('../models')

// import seed data
const userData = require('./userData.js')
const postData = require('./postData.js')

// seed database
const seedDatabase = async () => {
  await sequelize.sync({ force: true })

  await userData()

  await postData()

  process.exit(0)
}

seedDatabase()