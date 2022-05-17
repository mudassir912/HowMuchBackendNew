const { prisma } = require("../database.js");
const AuthServices = require("../services/authServices.js");
const { createResponse } = require("../utils/helperFunctions.js");

const Query = {
  loginUser: async (args, req, context) => {
    const response = await AuthServices.loginUser(req);
    return response;
  },
  getAllUsers: async (args, req, context) => {
    const response = await prisma.user.findMany();
    return createResponse(response, true, "All users");
  },
};

module.exports = {
  Query,
};
