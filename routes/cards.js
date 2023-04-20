const cardsRouter = require('express').Router();
const {
  createCard,
  getAllCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.put('/:cardId/likes', likeCard);
cardsRouter.delete('/:cardId/likes', dislikeCard);
cardsRouter.delete('/:cardId', deleteCard);
cardsRouter.get('/', getAllCards);
cardsRouter.post('/', createCard);

module.exports = cardsRouter;
