// import model
const { Post } = require('../models')

// array of seed post data
const seedPosts = [
  {
    title: 'Sample Title 01',
    post_content: 'Sample text 01 here.',
    user_id: 1,
  },
  {
    title: 'Sample Title 02',
    post_content: 'Sample text 02 here.',
    user_id: 2,
  },
  {
    title: 'Sample Title 03',
    post_content: 'Sample text 03 here.',
    user_id: 3,
  },
]

// bulk-create posts in database
const postData = () => Post.bulkCreate(seedPosts)

// export module
module.exports = postData