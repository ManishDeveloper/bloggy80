const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

//connect db 
require("./config/db");

//middleware
app.use(express.json())
app.use(cors());

//routes
app.use('/api/users',require("./routes/users"));
app.use('/api/posts',require("./routes/posts"));

//Deployment
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'/frontend/build')));

    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

//start server
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{console.log(`Server is running on ${PORT}`)});