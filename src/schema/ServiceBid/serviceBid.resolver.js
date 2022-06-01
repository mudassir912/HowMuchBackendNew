const { prisma } = require("../../database");
const {
  createResponse,
  createError,
  mergePaginationRecord,
} = require("../../utils/helperFunctions");
const ServiceBidServices = require("../../services/ServiceBidServices");

const ServiceBidResolver = {
  Query: {

    GetAllServiceBid: async (args, req) => {
      try {
        const response = await ServiceBidServices.GetAllServiceBids(
          req.pagination,
            req
        );

        return mergePaginationRecord(response);
      } catch (error) {
        return createError(401, error);
      }
    },

    GetAllAdminServiceBid: async (args, req) => {
      try {
        const response =
          await ServiceBidServices.GetAllAdminServiceBids(
            req.pagination
          );

        return mergePaginationRecord(response);
      } catch (error) {
        return createError(401, error);
      }
    },
  },
  Mutation: {
    CreateServiceBid: async (args, req) => {
      try {
        return await ServiceBidServices.CreateServiceBid(req);
      } catch (error) {
        return createError(401, error);
      }
    },

    UpdateServiceBid: async (args, { data, where }) => {
      try {
        return await ServiceBidServices.UpdateServiceBid(data, where);
      } catch (error) {
        return createError(401, error);
      }
    },

    DeleteServiceBid: async (args, req) => {
      try {
        return await ServiceBidServices.DeleteServiceBid(req);
      } catch (error) {
        return createError(401, error);
      }
    },
    
  },
};

module.exports = {
   ServiceBidResolver: ServiceBidResolver,
};
