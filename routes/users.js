const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { updateProfile, getMe } = require('../controllers/users');

router.get('/me', getMe);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: false },
      }),
    }),
  }),
  updateProfile
);

module.exports = router;
