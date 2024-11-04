// import sequelize
const Sequelize = require('sequelize')
require('dotenv').config()

let sequelize

// Create a new Sequelize instance
if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL)
} else {

}
sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
})

// Export the sequelize instance
module.exports = sequelize