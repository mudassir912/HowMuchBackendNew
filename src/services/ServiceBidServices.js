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

const ServiceBidServices = {
  async CreateServiceBid(data) {
    const serviceBid = await prisma.serviceBid.create(data);

    return createResponse(serviceBid, true, "Service Bid Created");
  },

  async UpdateServiceBid(data, where) {
    const isServiceBid = await prisma.serviceBid.findUnique({
      where,
    });

    if (!isServiceBid)
      return createError(400, "Service Bid not found!");

    const service = await prisma.serviceBid.update({
      where,
      data,
    });

    return createResponse(service, true, "Service Bid Updated");
  },
  async DeleteServiceBid(where) {
    const isServiceBid = await prisma.serviceBid.findUnique(where);
    if (!isServiceBid)
      return createError(400, "Service Bid not found!");

    const service = await prisma.serviceBid.delete(where);

    return createResponse(service, true, "Service Bid Deleted");
  },
  
  async GetAllServiceBids({ limit, cursor }, req) {
    const pagination = requestPagination(cursor);
    const serviceBid = await prisma.serviceBid.findMany({
      where : req.where,
      take: limit || 10,
      ...pagination,
      include: relations.serviceBid(req),
      orderBy: { id: "asc" },
    });

    if (!serviceBid || !serviceBid.length)
      return createError(400, "No Service Bid not found!");

    return createResponse(
      serviceBid,
      true,
      "Service Bid",
      200,
      returnPagination(serviceBid, limit)
    );
  },
  async GetAllAdminServiceBids({ skip, page }) {
    const request = requestAdminPagination(page, skip);
    const count = await prisma.serviceBid.count();
    const serviceBid = await prisma.serviceBid.findMany({
      ...request,
      include: relations.serviceBid(),
      orderBy: { id: "asc" },
    });

    if (!serviceBid || !serviceBid.length)
      return createError(400, "No Service Bid not found!");

    return createResponse(
      serviceBid,
      true,
      "Service Bid",
      200,
      returnAdminPagination(page, count, skip * page)
    );
  },
};

module.exports = ServiceBidServices;
