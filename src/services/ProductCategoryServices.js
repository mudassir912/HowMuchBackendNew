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

const ProductCategoryServices = {
  async CreateProductCategory(data) {
    const productCategory = await prisma.productCategory.create(data);

    return createResponse(productCategory, true, "Product Category Created");
  },

  async UpdateProductCategory(data, where) {
    const isProductCategory = await prisma.productCategory.findUnique({
      where,
    });

    if (!isProductCategory)
      return createError(400, "Product Category not found!");

    const product = await prisma.productCategory.update({
      where,
      data,
    });

    return createResponse(product, true, "Product Category Updated");
  },
  async DeleteProductCategory(where) {
    const isProductCategory = await prisma.productCategory.findUnique(where);
    if (!isProductCategory)
      return createError(400, "Product Category not found!");

    const product = await prisma.productCategory.delete(where);

    return createResponse(product, true, "Product Category Deleted");
  },

  async GetProductCategoryById({ where }) {
    const productCategory = await prisma.productCategory.findUnique({
      where,
      include: relations.productCategory(),
    });

    return createResponse(productCategory, true, "Product Category");
  },

  async GetAllProductCategories({ limit, cursor }, req) {
    const pagination = requestPagination(cursor);
    const productCategory = await prisma.productCategory.findMany({
      where : req.where,
      take: limit || 10,
      ...pagination,
      include: relations.productCategory(req),
      orderBy: { id: "asc" },
    });

    if (!productCategory || !productCategory.length)
      return createError(400, "No Product Category not found!");

    return createResponse(
      productCategory,
      true,
      "Product Category",
      200,
      returnPagination(productCategory, limit)
    );
  },
  async GetAllAdminProductCategories({ skip, page }) {
    const request = requestAdminPagination(page, skip);
    const count = await prisma.productCategory.count();
    const productCategory = await prisma.productCategory.findMany({
      ...request,
      include: relations.productCategory(),
      orderBy: { id: "asc" },
    });

    if (!productCategory || !productCategory.length)
      return createError(400, "No Product Category not found!");

    return createResponse(
      productCategory,
      true,
      "Product Category",
      200,
      returnAdminPagination(page, count, skip * page)
    );
  },
};

module.exports = ProductCategoryServices;
