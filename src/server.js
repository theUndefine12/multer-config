import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import 'colors'
import fileRoutes from './Multer/multer.routes.js'
import {fileURLToPath} from 'url'
import path from 'path'

dotenv.config()


const app = express()
const port = process.env.PORT || 1111
const mongoUrl = process.env.URL 

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


app.use(express.json())
app.use('/api', fileRoutes)


const bootstrap = async() => {
    await mongoose.connect(mongoUrl)
    .then(console.log('MongoDb is connected'.bgGreen))

    app.listen(port, () => {
        console.log(`Server is start on port ${port}`.bgBlue)
    })
}

bootstrap()