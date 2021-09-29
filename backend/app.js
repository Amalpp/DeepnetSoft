const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cookieParser = require("cookie-parser");
const cors = require("cors");

// routes
const userRoutes = require("./routes/user");
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
//Middlewares

app.use(express.json());
app.use(cookieParser());
app.use(cors());



const CONNECTION_URL = 'mongodb+srv://amal:amal*123@cluster0.abtle.mongodb.net/Test?retryWrites=true&w=majority'
const PORT = process.env.PORT || 8000; 

app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);



// //Starting a server

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(PORT,() => console.log(`server running on port: ${PORT}`)))
    .catch((error)=> console.log(error.message));
