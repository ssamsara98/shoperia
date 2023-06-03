import expressAsyncHandler from 'express-async-handler';

class UserController {
  getProfile = expressAsyncHandler(async (req, res) => {
    const result = {
      data: req.user,
      meta: {
        status: res.statusCode,
      },
    };
    res.json(result);
    return;
  });
}

// module.exports = UserController;
// export default UserController;
export const userController = new UserController();
