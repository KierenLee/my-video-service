const { Sequelize, DataTypes } = require("sequelize");
const { UserRole } = require("../constants");

// 从环境变量中读取数据库配置
const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;

const [host, port] = MYSQL_ADDRESS.split(":");

const sequelize = new Sequelize("nodejs_demo", MYSQL_USERNAME, MYSQL_PASSWORD, {
  host,
  port,
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: UserRole.Tourist,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// 数据库初始化方法
async function initUser() {
  await User.sync({ alter: true });
}

// 导出初始化方法和模型
module.exports = {
  initUser,
  User,
};
