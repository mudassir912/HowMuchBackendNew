const { prisma } = require("../../database");
const {
  createResponse,
  createError,
  mergePaginationRecord,
} = require("../../utils/helperFunctions");
const ProductCategoryServices = require("../../services/ProductCategoryServices");

const ProductCategoryResolver = {
  Query: {
    GetProductCategoryById: async (args, req) => {
      try {
        return await ProductCategoryServices.GetProductCategoryById(req);
      } catch (error) {
        return createError(401, error);
      }
    },
    GetAllProductCategories: async (args, req) => {
      try {
        const response = await ProductCategoryServices.GetAllProductCategories(
          req.pagination,
            req
        );

        return mergePaginationRecord(response);
      } catch (error) {
        return createError(401, error);
      }
    },

    GetAllAdminProductCategories: async (args, req) => {
      try {
        const response =
          await ProductCategoryServices.GetAllAdminProductCategories(
            req.pagination
          );

        return mergePaginationRecord(response);
      } catch (error) {
        return createError(401, error);
      }
    },
  },
  Mutation: {
    CreateProductCategory: async (args, req) => {
      try {
        return await ProductCategoryServices.CreateProductCategory(req);
      } catch (error) {
        return createError(401, error);
      }
    },

    UpdateProductCategory: async (args, { data, where }) => {
      try {
        return await ProductCategoryServices.UpdateProductCategory(data, where);
      } catch (error) {
        return createError(401, error);
      }
    },
    DeleteProductCategory: async (args, req) => {
      try {
        return await ProductCategoryServices.DeleteProductCategory(req);
      } catch (error) {
        return createError(401, error);
      }
    },
  },
};

module.exports = {
  ProductCategoryResolver,
};
