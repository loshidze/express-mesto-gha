const Card = require('../models/card');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const UnauthorizedError = require('../errors/unauthorized-err');

const checkCard = (card, res) => {
  if (card) {
    return res.send(card);
  }
  throw new NotFoundError('Карточка с указанным _id не найдена');
};

const createCard = (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .then((dataCard) => {
      res.status(201).send(dataCard);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      }
      next(err);
    });
};

const getAllCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send(cards))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!(card.owner._id.toString() === req.user._id)) {
        throw new UnauthorizedError('Невозможно удалить чужую карточу');
      }
      return checkCard(card, res);
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => checkCard(card, res))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => checkCard(card, res))
    .catch(next);
};

module.exports = {
  createCard,
  getAllCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
