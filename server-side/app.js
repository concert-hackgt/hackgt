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
    console.log("api");
    var run = async function() {
        var city = "New York";
        var a = await new Promise(resolve => {
            https.get(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&city=${city}`, (data) => {
                data.setEncoding('utf8');
                console.log(typeof(data));
                data.on('data', function (body) {
                    console.log(body);
                    resolve(body);
                });
            });
        });
        console.log(a);
        // console.log(typeof(a));
        // console.log(a);
        // var b = JSON.parse(a);
        // console.log(b);
        // res.send(a);
    } ()
});
