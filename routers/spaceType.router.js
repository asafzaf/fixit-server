const { Router } = require('express');
const spaceTypeController = require('../controllers/spaceType.controller');
const spaceTypeRouter = new Router();

spaceTypeRouter.get('/', spaceTypeController.getAllSpaceTypes);

module.exports = spaceTypeRouter;