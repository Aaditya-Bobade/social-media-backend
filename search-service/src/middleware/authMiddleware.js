const logger = require('../utils/logger');

const authenticateReq = (req, res, next) => {
  const userId = req.headers['x-user-id'];
  if(!userId){
    logger.warn('Access attempted without user ID');
    res.status(401).json({
      success: false,
      message: 'Authencation required! Please login to continue'
    })
  }
  req.user = {userId};
  next()
}

module.exports = {authenticateReq}