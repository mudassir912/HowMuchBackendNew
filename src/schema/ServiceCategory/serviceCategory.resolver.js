const { prisma } = require("../../database");
const {
  createResponse,
  createError,
  mergePaginationRecord,
} = require("../../utils/helperFunctions");
const ServiceCategoryServices = require("../../services/ServiceCategoryServices");

const ServiceCategoryResolver = {
  Query: {
    GetServiceCategoryById: async (args, req) => {
      try {
        return await ServiceCategoryServices.GetServiceCategoryById(req);
      } catch (error) {
        return createError(401, error);
      }
    },
    GetAllServiceCategories: async (args, req) => {
      try {
        const response = await ServiceCategoryServices.GetAllServiceCategories(
          req.pagination,
            req
        );

        return mergePaginationRecord(response);
      } catch (error) {
        return createError(401, error);
      }
    },

    GetAllAdminServiceCategories: async (args, req) => {
      try {
        const response =
          await ServiceCategoryServices.GetAllAdminServiceCategories(
            req.pagination
          );

        return mergePaginationRecord(response);
      } catch (error) {
        return createError(401, error);
      }
    },
  },
  Mutation: {
    CreateServiceCategory: async (args, req) => {
      try {
        return await ServiceCategoryServices.CreateServiceCategory(req);
      } catch (error) {
        return createError(401, error);
      }
    },

    UpdateServiceCategory: async (args, { data, where }) => {
      try {
        return await ServiceCategoryServices.UpdateServiceCategory(data, where);
      } catch (error) {
        return createError(401, error);
      }
    },
    DeleteServiceCategory: async (args, req) => {
      try {
        return await ServiceCategoryServices.DeleteServiceCategory(req);
      } catch (error) {
        return createError(401, error);
      }
    },
  },
};

module.exports = {
  ServiceCategoryResolver: ServiceCategoryResolver,
};
