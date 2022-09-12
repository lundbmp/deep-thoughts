const jwt = require("jsonwebtoken");

const secret = "pleasedonttell";
const expiration = "2h";

module.exports = {
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    // separate bearer from tokenvalue
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    // return req if no token
    if (!token) {
      return req;
    }

    try {
      // decode token
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("invalid token");
    }

    // updated req object
    return req;
  },
};
