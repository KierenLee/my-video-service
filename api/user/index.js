const { Code } = require("../code");
const { User } = require("../../db");
const { userCanView } = require("./utils");

const createUserApi = (app) => {
  app.get("/api/user/info", async (req, res) => {
    try {
      const { id = "" } = req.query;
      const users = await User.findAll({
        attributes: ["role"],
        where: { userName: id },
      });
      /** 查到用户信息 */
      if (users.length === 1) {
        res.send({
          code: Code.Success,
          data: {
            canView: userCanView(users[0].role),
          },
        });
        /** 未查到用户信息 */
      } else if (users.length === 0) {
        res.send({
          code: Code.NoneUser,
        });
        /** 查到多个用户，判断为异常 */
      } else {
        res.send({
          code: Code.MultiUsers,
        });
      }
    } catch (e) {
      console.error(e);
      res.send({
        code: Code.Error,
      });
    }
  });
};

module.exports = { createUserApi };
