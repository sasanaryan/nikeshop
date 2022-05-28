const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  
  const authHeader = req.get('Authorization');
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_KEY, (err, vrifyedUser) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user=vrifyedUser;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};





module.exports = {
  verifyToken
};
