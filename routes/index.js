const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const undefinedPathRouter = require('./undefinedPath');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('/*', undefinedPathRouter);

module.exports = router;
