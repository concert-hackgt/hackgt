const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const http = require('http');
const https = require('https');
const apiKey = "k8X97RqaamacWzZnyGrG7SJAAyhZwh9j"
require('dotenv').config();

app.use(bodyParser.json());
app.use(cors());

app.listen(process.env.PORT || 8000, () => {
    console.log('Listening on port', process.env.PORT || 8000);
});

app.get('/api', (req, res) => {
    var run = async function() {
        var city = "New York";
        var a = await new Promise(resolve => {
            https.get(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&city=${city}`, (data) => {
                data.setEncoding('utf8');
                data.on('data', function (body) {
                    resolve(body);
                });
            });
        })
        res.send(a);
    }()
});