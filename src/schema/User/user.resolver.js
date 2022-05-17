const { prisma } = require("../../database");
const AuthServices = require("../../services/authServices");
const { createResponse } = require("../../utils/helperFunctions");
const {relations} = require("../../utils/relationsHelper");
const {PostHelper} = require("../../utils/postHelper");

const UserResolver = {
  Query: {
    loginUser: async (args, req, context) => {
      const response = await AuthServices.loginUser(req);
      return response;
    },
    getAllUsers: async (args, req, context) => {
      const response = await prisma.user.findMany();
      return createResponse(response, true, "All users");
    },
    getUserById: async (args, req, context) => {
      const response = await prisma.user.findUnique({
        where: {
          id: req.id,
        },
        include : relations.user()
      });

      response.posts = PostHelper.makeData(response.posts, req);
      console.log(response);
      return createResponse(response, true, "User");
    },
  },
  Mutation: {
    createUser: async (args, req) => {
      const response = await AuthServices.createUser(req);
      return response;
    },
    socialMediaLogin: async (args, req) => {
      const response = await AuthServices.socialMediaLogin(req);
      return response;
    },
    forgotPassword: async (args, req) => {
      const response = await AuthServices.forgotPassword(req);
      return response;
    },
    changePassword: async (args, req) => {
      const response = await AuthServices.changePassword(req);
      return response;
    },
    deleteUser: async (args, req) => {
      const response = await AuthServices.deleteUser(req);
      return response;
    },
    verifyOtp: async (args, req) => {
      const response = await AuthServices.verifyOtp(req);
      return response;
    },
    resendOtp: async (args, req) => {
      const response = await AuthServices.resendOtp(req);
      return response;
    },
    resetPassword: async (args, req) => {
      const response = await AuthServices.resetPassword(req);
      return response;
    },
    updateProfile: async (args, req) => {
      const response = await AuthServices.updateProfile(req);
      return response;
    },
    updateSettings: async (args, req) => {
      const response = await AuthServices.updateSettings(req.settings, req.id);
      return response;
    },
    updateSocial: async (args, req) => {
      const response = await AuthServices.updateSocial(req.social, req.id);
      return response;
    },
    logout: async (args, req) => {
      const response = await AuthServices.logout(req);
      return response;
    },
  },
};

module.exports = {
  UserResolver,
};
