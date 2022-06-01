const { createModule } = require("graphql-modules");
const { ServiceCategoryResolver } = require("./serviceCategory.resolver");
const { ServiceCategory } = require("./serviceCategory.type");

const ServiceCategoryModule = createModule({
  id: "service-category-module",
  dirname: __dirname,
  typeDefs: [ServiceCategory],
  resolvers: [ServiceCategoryResolver],
});

module.exports = {
  ServiceCategoryModule: ServiceCategoryModule,
};
