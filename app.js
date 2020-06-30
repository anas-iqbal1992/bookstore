
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

require("./database/connect");
require("./src/bootstrap")(app);

const  PORT =  process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening to post ${PORT}`));