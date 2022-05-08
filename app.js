const express = require('express');
const config = require('./config/config');
const userRouter = require('./routes/routes');

const app = express();

const ports = config.ports;

app.use(express.urlencoded({extended: true}));
app.use(express.json());



app.get("/", (req, res) => {
    res.status(200).json({message: "Success"});
});

app.use("/user", userRouter);

app.listen(ports, () => console.log(`Server is running on port ${ports}`));