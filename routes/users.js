const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { updateProfile, getMe } = require('../controllers/users');

router.get('/me', getMe);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().email().required(),
    }),
  }),
  updateProfile
);

module.exports = router;
