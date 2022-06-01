const { prisma } = require("../../database");
const {
  createResponse,
  createError,
  mergePaginationRecord,
} = require("../../utils/helperFunctions");
const ServiceServices = require("../../services/ServiceServices");

const ServiceResolver = {
  Query: {
    GetServiceById: async (args, req) => {
      try {
        return await ServiceServices.GetServiceById(req);
      } catch (error) {
        return createError(401, error);
      }
    },
    GetAllServices: async (args, req) => {
      try {

        const response = await ServiceServices.GetAllServices(
          req.pagination,
          req.where,
          req
        );
        return mergePaginationRecord(response);
      } catch (error) {
        return createError(401, error);
      }
    },
  },
  Mutation: {
    CreateService: async (args, req) => {
      try {
        return await ServiceServices.CreateService(req);
      } catch (error) {
        return createError(401, error);
      }
    },
    UpdateService: async (args, { data, where }) => {
      try {
        return await ServiceServices.UpdateService(data, where);
      } catch (error) {
        return createError(401, error);
      }
    },
    DeleteService: async (args, req) => {
      try {
        return await ServiceServices.DeleteService(req);
      } catch (error) {
        return createError(401, error);
      }
    },
  },
};

module.exports = {
  ServiceResolver: ServiceResolver,
};
