const { createModule } = require("graphql-modules");
const { ServiceBidResolver } = require("./serviceBid.resolver");
const { ServiceBid } = require("./serviceBid.type");

const ServiceBidModule = createModule({
  id: "service-bid-module",
  dirname: __dirname,
  typeDefs: [ServiceBid],
  resolvers: [ServiceBidResolver],
});

module.exports = {
  ServiceBidModule: ServiceBidModule,
};
