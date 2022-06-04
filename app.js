const express = require('express');
const config = require('./config/config');
const { userRouter } = require('./routes/routes');
const CommonResponse = require('./model/response/CommonResponse');
const http = require('./constants/http');

const app = express();

const ports = config.ports;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req, res) => {
    const commonResponse = new CommonResponse();
    commonResponse.statusCode = 200;
    commonResponse.statusMessage = "Success";
    res.status(http.HTTP_SUCCESS_CODE).send(commonResponse);
});

app.use("/user", userRouter);

app.use((req, res, next) => {
    const commonResponse = new CommonResponse();
    commonResponse.statusCode = 404;
    commonResponse.statusMessage = "Not Found";
    res.status(http.HTTP_SUCCESS_CODE).send(commonResponse);
});

app.listen(ports, () => console.log(`Server is running on port ${ports}`));

module.exports = app;