const { UserRole } = require("../../constants");

const userCanView = (role) => role !== UserRole.Tourist;

module.exports = { userCanView };
