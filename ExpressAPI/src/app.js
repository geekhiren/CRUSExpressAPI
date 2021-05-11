const express = require("express");
require("./db/conn");
const Student = require("./models/students");
const router = require("./routers/student");
const studentRouter = require("./routers/student");

const cors = require("cors");
const corsOptions ={
    origin:'http://localhost:4200', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(studentRouter);
app.use(cors(corsOptions));


app.listen(port, () => {
    console.log('Connection is setup at', { port });
});



