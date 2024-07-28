const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const categoryRoute = require('./routes/categories')
const multer = require('multer')
const path = require('path')
const cors = require('cors')

app.use(express.json())
app.use('/images', express.static(path.join(__dirname,'/images')))
app.use(cors())

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
}

const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null, 'images')
  },
  filename: (req,file,cb) => {
    cb(null,req.body.name)
  }
})

const upload = multer({storage})
app.post('/api/upload', upload.single("file"), (req, res) => {
  res.status(200).json('file has been uploaded')
})

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)
app.use('/api/categories', categoryRoute)

app.listen('5000',() => {
    console.log('Server running on port 5000...')
})