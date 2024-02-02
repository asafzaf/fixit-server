const { Router } = require('express');
const fs = require('fs');
const spaceTypeRouter = new Router();

const instance = fs.readFileSync('./data/spaceType.json', 'utf8');

spaceTypeRouter.get('/', (req, res) => {
    res.json(JSON.parse(instance));
}).all((req, res, next) => {
    res.status(404).send('Resource not found');
});

module.exports = spaceTypeRouter;