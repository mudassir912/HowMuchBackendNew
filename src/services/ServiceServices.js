const { prisma } = require("../database.js");
require("dotenv").config();
const {
  createError,
  createResponse,
  returnPagination,
  requestPagination,
} = require("../utils/helperFunctions.js");
const { relations } = require("../utils/relationsHelper.js");

const ProductServices = {
  async CreateProduct(req) {

     media = req.data.media;
    delete  req.data.media;

    const service = await prisma.service.create(req);

    if (service.id) {
      await this.addProductMedia(service.id, media);
    }
    return createResponse(service, true, "Product Created");
  },

  async UpdateProduct(data, where) {
    const isProduct = await prisma.service.findUnique({ where });

    if (!isProduct) return createError(400, "Product not found!");

    const service = await prisma.service.update({
      where,
      data,
    });

    return createResponse(service, true, "Product Updated");
  },
  async DeleteService(where) {
    const isService = await prisma.service.findUnique(where);
    if (!isService) return createError(400, "Service not found!");

    const service = await prisma.service.delete(where);

    return createResponse(service, true, "Service Deleted");
  },

  async GetServiceById({ where }, req = {}) {
    const service = await prisma.service.findUnique({
      where,
      include: relations.service(req),
    });

    return createResponse(service, true, "Service");
  },

  async GetAllServices({ cursor, limit }, where, req = {}) {



 /*  const Raw = await prisma.$queryRaw`SELECT * FROM "City"`;
   const Raws = await prisma.city.findMany({
     where : {
       id : 1
     }
   });*/


    const pagination = requestPagination(cursor);
    const service = await prisma.service.findMany({
      take: limit || 10,
      ...pagination,
      where,
      include: relations.service(req),
    });
    console.log(req);
    if (!service || !service.length)
      return createError(400, "No Service not found!");
    return createResponse(
      service,
      true,
      "Services",
      200,
      returnPagination(service, limit)
    );
  },


  async addServiceMedia(id, data) {
    for (const media of data) {
      const serviceMediaData = {
        serviceId: id,
        asset: media.asset,
        type: media.type,
      };

      addMediaData = await prisma.serviceMedia.create({
        data: serviceMediaData,
      });
    }
  },

};

module.exports = ServiceServices;
