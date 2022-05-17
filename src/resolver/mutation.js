const { prisma } = require("../database.js");
require('dotenv').config();
const AuthServices = require("../services/authServices.js");
const Mutation = {

    createUser: async (args, req) => {
      const response = await AuthServices.createUser(req)
      return response
    },
    changePassword: async (args, req) => {
      const response = await AuthServices.changePassword(req)
      return response
    },
    deleteUser: async (args, req) => {
      const response = await AuthServices.deleteUser(req)
      return response
    },
    verifyOtp: async (args, req) => {
      const response = await AuthServices.verifyOtp(req)
      return response
    },
    resendOtp: async (args, req) => {
      const response = await AuthServices.resendOtp(req)
      return response
    },
  };

  module.exports = {
    Mutation,
  }

