const { createModule } = require("graphql-modules");
const { ProductBidResolver } = require("./productBid.resolver");
const { ProductBid } = require("./productBid.type");

const ProductBidModule = createModule({
  id: "product-bid-module",
  dirname: __dirname,
  typeDefs: [ProductBid],
  resolvers: [ProductBidResolver],
});

module.exports = {
  ProductBidModule,
};
