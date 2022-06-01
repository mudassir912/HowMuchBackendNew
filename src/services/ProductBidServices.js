const { prisma } = require("../database.js");
require("dotenv").config();
const {
  createError,
  createResponse,
  requestPagination,
  returnPagination,
  returnAdminPagination,
  requestAdminPagination,
} = require("../utils/helperFunctions.js");
const { relations } = require("../utils/relationsHelper.js");

const ProductBidServices = {
  async CreateProductBid(data) {
    const productBid = await prisma.productBid.create(data);

    return createResponse(productBid, true, "Product Bid Created");
  },

  async UpdateProductBid(data, where) {
    const isProductBid = await prisma.productBid.findUnique({
      where,
    });

    if (!isProductBid)
      return createError(400, "Product Bid not found!");

    const product = await prisma.productBid.update({
      where,
      data,
    });

    return createResponse(product, true, "Product Bid Updated");
  },
  async DeleteProductBid(where) {
    const isProductBid = await prisma.productBid.findUnique(where);
    if (!isProductBid)
      return createError(400, "Product Bid not found!");

    const product = await prisma.productBid.delete(where);

    return createResponse(product, true, "Product Bid Deleted");
  },
  
  async GetAllProductBids({ limit, cursor }, req) {
    const pagination = requestPagination(cursor);
    const productBid = await prisma.productBid.findMany({
      where : req.where,
      take: limit || 10,
      ...pagination,
      include: relations.productBid(req),
      orderBy: { id: "asc" },
    });

    if (!productBid || !productBid.length)
      return createError(400, "No Product Bid not found!");

    return createResponse(
      productBid,
      true,
      "Product Bid",
      200,
      returnPagination(productBid, limit)
    );
  },
  async GetAllAdminProductBids({ skip, page }) {
    const request = requestAdminPagination(page, skip);
    const count = await prisma.productBid.count();
    const productBid = await prisma.productBid.findMany({
      ...request,
      include: relations.productBid(),
      orderBy: { id: "asc" },
    });

    if (!productBid || !productBid.length)
      return createError(400, "No Product Bid not found!");

    return createResponse(
      productBid,
      true,
      "Product Bid",
      200,
      returnAdminPagination(page, count, skip * page)
    );
  },
};

module.exports = ProductBidServices;
