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

    const product = await prisma.product.create(req);

    if (product.id) {
      await this.addProductMedia(product.id, media);
    }
    return createResponse(product, true, "Product Created");
  },

  async UpdateProduct(data, where) {
    const isProduct = await prisma.product.findUnique({ where });

    if (!isProduct) return createError(400, "Product not found!");

    const product = await prisma.product.update({
      where,
      data,
    });

    return createResponse(product, true, "Product Updated");
  },
  async DeleteProduct(where) {
    const isProduct = await prisma.product.findUnique(where);
    if (!isProduct) return createError(400, "Product not found!");

    const product = await prisma.product.delete(where);

    return createResponse(product, true, "Product Deleted");
  },

  async GetProductById({ where }, req = {}) {
    const product = await prisma.product.findUnique({
      where,
      include: relations.product(req),
    });

    return createResponse(product, true, "Product");
  },

  async GetAllProducts({ cursor, limit }, where, req = {}) {



 /*  const Raw = await prisma.$queryRaw`SELECT * FROM "City"`;
   const Raws = await prisma.city.findMany({
     where : {
       id : 1
     }
   });*/


    const pagination = requestPagination(cursor);
    const product = await prisma.product.findMany({
      take: limit || 10,
      ...pagination,
      where,
      include: relations.product(req),
    });
    console.log(req);
    if (!product || !product.length)
      return createError(400, "No Product not found!");
    return createResponse(
      product,
      true,
      "Products",
      200,
      returnPagination(product, limit)
    );
  },


  async addProductMedia(id, data) {
    for (const media of data) {
      const productMediaData = {
        productId: id,
        asset: media.asset,
        type: media.type,
      };

      addMediaData = await prisma.productMedia.create({
        data: productMediaData,
      });
    }
  },

};

module.exports = ProductServices;
