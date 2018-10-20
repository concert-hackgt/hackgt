const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(bodyParser.json());
app.use(cors());

app.listen(process.env.PORT || 8000, () => {
    console.log('Listening on port', process.env.PORT || 8000);
});

app.get('/api', (req, res) => {
    
})