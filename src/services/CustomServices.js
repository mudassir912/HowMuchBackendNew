const { prisma } = require("../database.js");
require("dotenv").config();
const { createError, createResponse} = require("../utils/helperFunctions.js");

const Custom = {


  async getCountries(data) {

    try {

      if(data.id){

        country = await prisma.country.findMany({
          where: {
            id: data.id
          },
          include : {
              cities : true
          }
        });
      }
      else
      {
        country = await prisma.country.findMany({
          include : {
            cities : true
          }
        });
      }

      return createResponse(country, true, "Countries");
    } catch (error) {
      return createError(401, error);
    }
  },

  async addCountry(data) {

    try {

      country = await prisma.country.create({
        data: data,
      });

      return createResponse(country, true, "Country Added");

    } catch (error) {
      return createError(401, error);
    }
  },

  async updateCountry(data) {

    let country = await prisma.country.findFirst({
      where: {
        id: data.id
      }
    });

    if (country) {

      country = await prisma.country.update({
        where: {
          id: data.id
        },
        data: {
          name: data.name
        }
      });

      return createResponse(country, true, "Country Update");

    }

    return createResponse([], false, "Invalid Country");

  },

  async deleteCountry(data) {

    try {
      const deleteCountry = await prisma.country.deleteMany({
        where: { id: data.id },
      });

      return createResponse(deleteCountry, true, "Country Deleted");
    } catch (error) {
      return createError(401, error);
    }

  },

  async getCities(data) {

    try {

      if(data.id){

        country = await prisma.city.findMany({
          where: data.where,
        });
      }
      else
      {
        country = await prisma.country.findMany();
      }




      return createResponse(country, true, "Countriesw");
    } catch (error) {
      return createError(401, error);
    }
  },

  async addCity(data) {

    try {

      city = await prisma.city.create({
        data: data,
      });

      return createResponse(city, true, "City Added");

    } catch (error) {
      return createError(401, error);
    }
  },

  async updateCity(data) {

    let city = await prisma.city.findFirst({
      where: {
        id: data.id
      }
    });

    if (city) {

      city = await prisma.city.update({
        where: {
          id: data.id
        },
        data: {
          name: data.name
        }
      });

      return createResponse(city, true, "City Update");

    }

    return createResponse([], false, "Invalid Country");

  },

  async deleteCity(data) {

    try {
      const deleteCity = await prisma.city.deleteMany({
        where: { id: data.id },
      });

      return createResponse(deleteCity, true, "City Deleted");
    } catch (error) {
      return createError(401, error);
    }

  },

  async getCategories(data) {

    try {

        category = await prisma.category.findMany({
          where: data.where,
          include : {
            child : true
          }
        });


      return createResponse(category, true, "Categories");
    } catch (error) {
      return createError(401, error);
    }
  },

  async addCategory(data) {

    try {

      category = await prisma.category.create({
        data: data,
      });

      return createResponse(category, true, "Category Added");

    } catch (error) {
      return createError(401, error);
    }
  },

  async updateCategory(data) {

    let category = await prisma.category.findFirst({
      where: {
        id: data.id
      }
    });

    if (category) {

      category = await prisma.category.update({
        where: {
          id: data.id
        },
        data: {
          name: data.name
        }
      });

      return createResponse(category, true, "Category Update");

    }

    return createResponse([], false, "Invalid Category");

  },

  async deleteCategory(data) {

    try {
      const deleteCategory = await prisma.category.deleteMany({
        where: { id: data.id },
      });

      return createResponse(deleteCategory, true, "Category Deleted");
    } catch (error) {
      return createError(401, error);
    }

  },

};

module.exports = Custom;
