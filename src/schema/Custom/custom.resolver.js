const CustomServices = require("../../services/CustomServices");
const {createError} = require("../../utils/helperFunctions");
const CustomResolver = {
    Query: {
        getCountries: async (args, req, context) => {

            try {

                const responseData = await CustomServices.getCountries(req);

                return responseData;
            } catch (error) {
                return createError(401, error);
            }

        },
        getCategories: async (args, req, context) => {

            try {

                const responseData = await CustomServices.getCategories(req);

                return responseData;
            } catch (error) {
                return createError(401, error);
            }

        }

    },
    Mutation: {

        addCountry: async (args, req, context) => {

            try {
                const responseData = await CustomServices.addCountry(req);

                return responseData;
            } catch (error) {
                return createError(401, error);
            }

        },
        updateCountry: async (args, req, context) => {

            try {
                const responseData = await CustomServices.updateCountry(req);

                return responseData;
            } catch (error) {
                return createError(401, error);
            }

        },
        deleteCountry: async (args, req, context) => {


            try {
                const responseData = await CustomServices.deleteCountry(req);

                return responseData;
            } catch (error) {
                return createError(401, error);
            }

        },

        addCity: async (args, req, context) => {

            try {
                const responseData = await CustomServices.addCity(req);

                return responseData;
            } catch (error) {
                return createError(401, error);
            }

        },
        updateCity: async (args, req, context) => {

            try {
                const responseData = await CustomServices.updateCity(req);

                return responseData;
            } catch (error) {
                return createError(401, error);
            }

        },
        deleteCity: async (args, req, context) => {


            try {
                const responseData = await CustomServices.deleteCity(req);

                return responseData;
            } catch (error) {
                return createError(401, error);
            }

        },


        addCategory: async (args, req, context) => {

            try {
                const responseData = await CustomServices.addCategory(req);

                return responseData;
            } catch (error) {
                return createError(401, error);
            }

        },
        updateCategory: async (args, req, context) => {

            try {
                const responseData = await CustomServices.updateCategory(req);

                return responseData;
            } catch (error) {
                return createError(401, error);
            }

        },
        deleteCategory: async (args, req, context) => {


            try {
                const responseData = await CustomServices.deleteCategory(req);

                return responseData;
            } catch (error) {
                return createError(401, error);
            }

        },


    }
  }

  module.exports = {
      CustomResolver
  }

