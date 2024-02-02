const { Router } = require('express');
const fs = require('fs');
const faultTypeRouter = new Router();

const instance = fs.readFileSync('./data/faultCollection.json', 'utf8');

faultTypeRouter.get('/', (req, res) => {
    res.json(JSON.parse(instance));
}).all((req, res, next) => {
    res.status(404).send('Resource not found');
});

module.exports = faultTypeRouter;