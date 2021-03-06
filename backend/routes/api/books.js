/* API for routes to add books to databse */
const express = require('express')
const router = express.Router()

const Book = require('../../models/Book')

router.get('/test', (req, res) => res.json({msg: 'backend works'}))

// @route GET /api/books
// @desc Get books (public)
router.get('/', (req, res) => {
  Book.find()
    .then(info => res.json(info))
    .catch(err => res.status(404).json({msg: 'no books found'}))
})

// @route POST /api/books
// @desc Create new book (public)
router.post('/', (req, res) => {
  const newBook = new Book({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
  })

  newBook.save().then(info => res.json(info))
})

// @route DELETE /api/books
// @desc Delete book (public)
router.delete('/', (req, res) => {
  Book.findOneAndRemove({_id: req.body.id}).then(() => {
    res.json({success: true})
  })
})

// @route UPDATE /api/books/update/:id
// @desc Update book (public)
router.post('/update/:id', (req, res) => {
  Book.findOneAndUpdate(
    {_id: req.params.id},
    {
      $set: {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
      },
    },
    {new: true},
  )
    .then(info => {
      res.json(info)
    })
    .catch(err => res.status(400).json({msg: 'update failed'}))
})

module.exports = router