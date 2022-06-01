const { createModule } = require("graphql-modules");
const { ServiceResolver } = require("./service.resolver");
const { Service } = require("./service.type");

const ServiceModule = createModule({
  id: "service-module",
  dirname: __dirname,
  typeDefs: [Service],
  resolvers: [ServiceResolver],
});

module.exports = {
  ServiceModule: ServiceModule,
};
