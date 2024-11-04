// import model
const { User } = require('../models/User')

// array of seed user data
const seedUsers = [
  {
    name: 'SampleUser01',
    email: 'SampleUser01@techblog.com',
    password: 'samplePass01',
  },
  {
    name: 'SampleUser02',
    email: 'SampleUser02@techblog.com',
    password: 'samplePass02',
  },
  {
    name: 'SampleUser03',
    email: 'SampleUser03@techblog.com',
    password: 'samplePass03',
  }
]

// bulk-create users in database
const userData = () => User.bulkCreate(seedUsers)

// export module
module.exports = userData