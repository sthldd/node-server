const express = require('express')
const multer = require('multer')
const cors = require('cors')
const upload = multer({dest:"uploads/"})

const app = express()

app.get('/', (req, res)=> {
  res.send('hello nodejs')
})
app.options('/upload', cors())
app.post('/upload', cors(), upload.single('file'), function (req, res) {
  res.json({
    key: req.file.filename
  })
})
app.get('/preview/:key', cors(), function (req, res) {
  res.sendFile(`uploads/${req.params.key}`, {
    root: __dirname,
    headers: {
      'Content-Type': 'image/jpeg',
    },
  }, (error) => {
    if (error) {
      res.status(404).send('Not found')
    }
  })
})

var port = process.env.PORT || 3000
app.listen(port)