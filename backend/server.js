const express = require("express");
const app = express();
const cors = require("cors");

//connect db 
require("./config/db");

//middleware
app.use(express.json())
app.use(cors());

//routes
app.use('/api/users',require("./routes/users"));
app.use('/api/posts',require("./routes/posts"));



//start server
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{console.log(`Server is running on ${PORT}`)});