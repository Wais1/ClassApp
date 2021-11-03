/* If in production, use production keys, otherwise, use development */
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./keys_prod')
  } else {
    module.exports = require('./keys_dev')
}