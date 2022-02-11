const router = require('express').Router();
const User = require('../models/UserModel');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_PASSPHRASE
    ).toString(),
  });
  // Here we could (should) do some data validation and send  00 errors with what is missing ex.
  // should have try catch here in case db is not happy
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).json('wrong user');

    const originalPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_PASSPHRASE
    ).toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password)
      return res.status(401).json('wrong password');

    const accessToken = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.JWT_SEC,
      { expiresIn: '3d' }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
