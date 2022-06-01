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

const ServiceCategoryServices = {
  async CreateServiceCategory(data) {
    const serviceCategory = await prisma.serviceCategory.create(data);

    return createResponse(serviceCategory, true, "Service Category Created");
  },

  async UpdateServiceCategory(data, where) {
    const isServiceCategory = await prisma.serviceCategory.findUnique({
      where,
    });

    if (!isServiceCategory)
      return createError(400, "Service Category not found!");

    const service = await prisma.serviceCategory.update({
      where,
      data,
    });

    return createResponse(service, true, "Service Category Updated");
  },
  async DeleteServiceCategory(where) {
    const isServiceCategory = await prisma.serviceCategory.findUnique(where);
    if (!isServiceCategory)
      return createError(400, "Service Category not found!");

    const service = await prisma.serviceCategory.delete(where);

    return createResponse(service, true, "Service Category Deleted");
  },

  async GetServiceCategoryById({ where }) {
    const serviceCategory = await prisma.serviceCategory.findUnique({
      where,
      include: relations.serviceCategory(),
    });

    return createResponse(serviceCategory, true, "Service Category");
  },

  async GetAllServiceCategories({ limit, cursor }, req) {
    const pagination = requestPagination(cursor);
    const serviceCategory = await prisma.serviceCategory.findMany({
      where : req.where,
      take: limit || 10,
      ...pagination,
      include: relations.serviceCategory(req),
      orderBy: { id: "asc" },
    });

    if (!serviceCategory || !serviceCategory.length)
      return createError(400, "No Service Category not found!");

    return createResponse(
      serviceCategory,
      true,
      "Service Category",
      200,
      returnPagination(serviceCategory, limit)
    );
  },
  async GetAllAdminServiceCategories({ skip, page }) {
    const request = requestAdminPagination(page, skip);
    const count = await prisma.serviceCategory.count();
    const serviceCategory = await prisma.serviceCategory.findMany({
      ...request,
      include: relations.serviceCategory(),
      orderBy: { id: "asc" },
    });

    if (!serviceCategory || !serviceCategory.length)
      return createError(400, "No Service Category not found!");

    return createResponse(
      serviceCategory,
      true,
      "Service Category",
      200,
      returnAdminPagination(page, count, skip * page)
    );
  },
};

module.exports = ServiceCategoryServices;
