const User = require('./User')
const Post = require('./Post')

// define table relationships
// user can have many posts associated
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

// post belongs to one user
Post.belongsTo(User, {
  foreignKey: 'user_id'
})


module.exports = { User, Post }