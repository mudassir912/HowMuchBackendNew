const { prisma } = require("../../database");
const {
  createResponse,
  createError,
  mergePaginationRecord,
} = require("../../utils/helperFunctions");
const ProductServices = require("../../services/ProductServices");

const ProductResolver = {
  Query: {
    GetProductById: async (args, req) => {
      try {
        return await ProductServices.GetProductById(req);
      } catch (error) {
        return createError(401, error);
      }
    },
    GetAllProducts: async (args, req) => {
      try {

        const response = await ProductServices.GetAllProducts(
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
    CreateProduct: async (args, req) => {
      try {
        return await ProductServices.CreateProduct(req);
      } catch (error) {
        return createError(401, error);
      }
    },
    UpdateProduct: async (args, { data, where }) => {
      try {
        return await ProductServices.UpdateProduct(data, where);
      } catch (error) {
        return createError(401, error);
      }
    },
    DeleteProduct: async (args, req) => {
      try {
        return await ProductServices.DeleteProduct(req);
      } catch (error) {
        return createError(401, error);
      }
    },
  },
};

module.exports = {
  ProductResolver,
};
