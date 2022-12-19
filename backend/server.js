const express = require('express')
const cors = require('cors')
const PORT = 9000;
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

const reviewuserrouter = require('./Routers/ReviewRouter')
app.use('/api/', reviewuserrouter)

const connectDB = require('./Database/dbconnect')
connectDB()
app.listen(PORT, (err) => {
    if (err) throw err;
    else {
        console.log("Server runs on " + PORT)
    }
})
