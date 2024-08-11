const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

createToken = (payload, expiresIn) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

setCookie = (res, name, token, options = {}) => {
  res.cookie(name, token, { httpOnly: true, secure: true, ...options });
};

clearCookie = (res, name) => {
  res.clearCookie(name);
};

module.exports = { createToken, verifyToken, setCookie, clearCookie };
