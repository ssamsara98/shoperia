const expressAsyncHandler = require('express-async-handler');

class UserController {
  static getProfile = expressAsyncHandler(async (req, res) => {
    const result = {
      data: req.user,
      meta: {
        status: res.statusCode,
      },
    };
    return res.json(result);
  });
}

module.exports = UserController;
