const express = require('express');
const app = express();

const ports = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({message: "Success"});
});

app.listen(ports, () => console.log(`Server is running on port ${ports}`));