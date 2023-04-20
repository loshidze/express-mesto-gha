const undefinedPathRouter = require('express').Router();

const undefinedPath = (req, res) => {
  res.status(404).send({ message: 'путь не найден' });
};

undefinedPathRouter.all('/', undefinedPath);

module.exports = undefinedPathRouter;
