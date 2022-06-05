const express = require('express');
const csvToJson = require('csvtojson');
const findRestaurent = require('./findRestaurent');
const formatRestaurents = require('./formatRestaurents');

const app = express()
const port = 3000;
let formatedMetaData = null;

app.get('/open-restaurents', (req, res) => {
    const url = new URL('http://localhost' + req.url);
    const time = url.searchParams.get('time');
    const day = url.searchParams.get('day');
    if (!time || !day)
    {
        res.send('Parameters Missing!');
    }
    else {
        const restaurents = findRestaurent(day, time, formatedMetaData);
        if (restaurents.length)
        {
            res.send(restaurents);
        }
        else
        {
            res.send('No restaurents found!');
        }
    }
});

app.listen(port, () => {
    const filePath = './meta/index.csv';
    csvToJson().fromFile(filePath).then(result => {
        if (result && result.length)
        {
            formatedMetaData = formatRestaurents(result);
        }
        else
        {
            console.log('Error in reading restautents');
        }
    });
    console.log(`Restaurents API running ${port}!`)
});