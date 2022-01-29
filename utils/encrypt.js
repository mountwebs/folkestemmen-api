const { createHmac } = require('crypto');

const encrypt = (input) => {
  return createHmac('sha256', process.env.HMAC_KEY).update(input).digest('hex');
};

module.exports = encrypt;
