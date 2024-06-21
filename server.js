const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 3000;

app.use(cors('*'))
app.use(express.json())

//Routes
const roomRoutes = require('./routes/RoomRoutes')
const authRoutes = require('./routes/auth')
app.use('/api',roomRoutes)
app.use('/api',authRoutes)

mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    app.listen(PORT,()=>{
        console.log(`listening on ${PORT}`)
    })
}).catch(err=> console.log(err))