const { initUser, User } = require("./user");

// 数据库初始化方法
async function init() {
  await initUser();
}

// 导出初始化方法和模型
module.exports = {
  init,
  User,
};
