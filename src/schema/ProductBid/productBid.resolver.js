const { prisma } = require("../../database");
const {
  createResponse,
  createError,
  mergePaginationRecord,
} = require("../../utils/helperFunctions");
const ProductBidServices = require("../../services/ProductBidServices");

const ProductBidResolver = {
  Query: {

    GetAllProductBid: async (args, req) => {
      try {
        const response = await ProductBidServices.GetAllProductBids(
          req.pagination,
            req
        );

        return mergePaginationRecord(response);
      } catch (error) {
        return createError(401, error);
      }
    },

    GetAllAdminProductBid: async (args, req) => {
      try {
        const response =
          await ProductBidServices.GetAllAdminProductBids(
            req.pagination
          );

        return mergePaginationRecord(response);
      } catch (error) {
        return createError(401, error);
      }
    },
  },
  Mutation: {
    CreateProductBid: async (args, req) => {
      try {
        return await ProductBidServices.CreateProductBid(req);
      } catch (error) {
        return createError(401, error);
      }
    },

    UpdateProductBid: async (args, { data, where }) => {
      try {
        return await ProductBidServices.UpdateProductBid(data, where);
      } catch (error) {
        return createError(401, error);
      }
    },

    DeleteProductBid: async (args, req) => {
      try {
        return await ProductBidServices.DeleteProductBid(req);
      } catch (error) {
        return createError(401, error);
      }
    },
    
  },
};

module.exports = {
   ProductBidResolver,
};
