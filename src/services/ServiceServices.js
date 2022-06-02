const { prisma } = require("../database.js");
const _ = require("lodash");
require("dotenv").config();
const {
  createError,
  createResponse,
  returnPagination,
  requestPagination,
} = require("../utils/helperFunctions.js");
const { relations } = require("../utils/relationsHelper.js");

const ServiceServices = {

  async CreateService(req) {

     media = req.data.media;
    delete  req.data.media;

    const service = await prisma.service.create(req);

    if (service.id) {
      await this.addServiceMedia(service.id, media);
    }
    return createResponse(service, true, "Service Created");
  },

  async UpdateService(data, where) {
    const isService = await prisma.service.findUnique({ where });

    if (!isService) return createError(400, "Service not found!");

    const service = await prisma.service.update({
      where,
      data,
    });

    return createResponse(service, true, "Service Updated");
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

      whereFilter = {};

      if(where.lat && where.lng){

          //distance in KM
        const Services = await prisma.$queryRaw`SELECT distance, id
                                                FROM (SELECT id, lat, lng,
       (ROUND(earth_distance(ll_to_earth(${where.lat}, ${where.lng}), ll_to_earth(lat, lng))::NUMERIC, 2))/1000 AS distance
        FROM "Service") as x
        where distance < 5 
        `;

        serviceIds = _.map(Services, 'id'); // → [1, 2]);

          whereFilter.id = { in: serviceIds };
      }

      if(where.id){

        whereFilter.id = where.id;
      }

      if(where.status){

        whereFilter.status = where.status;
      }

      if(where.title){

        whereFilter.title = {
            contains: where.title,

        };
      }

      if(where.description){

        whereFilter.description = {
            contains: where.description,

        };
      }

      if(where.locationTitle){

        whereFilter.locationTitle = {
            contains: where.locationTitle,

        };
      }

      if(where.serviceCategoryId){

        whereFilter.serviceCategoryId = where.serviceCategoryId;
      }

      if(where.serviceCategoryId){

        whereFilter.serviceCategoryId = where.serviceCategoryId;
      }




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
      where : whereFilter,
      include: relations.service(req),
    });

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
