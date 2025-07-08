const express = require('express')
const app = express()

const cors= require('cors')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth')

dotenv.config()

app.use(cors())
app.use(express.json())

app.get('/' , (req,res) => {
    res.send('Server running at 5000')
})

app.use('/api/auth' , authRoutes)

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Authentication backend running');
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
}).catch(err => console.error(err));