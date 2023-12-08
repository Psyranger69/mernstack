require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const categoryRoutes = require('./routes/categories'); 


// express app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();
});

// routes
app.use('/api/categories', categoryRoutes);

// connect to db
mongoose.connect(process.env.MONG_URI)
.then(()=>{
    app.listen(process.env.PORT, () => {
        console.log("Connected to db and Listening on port "+process.env.PORT);
    });
})
.catch((error) => {
    console.log(error);
});

