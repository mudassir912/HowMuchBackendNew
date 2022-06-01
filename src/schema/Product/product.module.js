const { createModule } = require("graphql-modules");
const { ProductResolver } = require("./product.resolver");
const { Product } = require("./product.type");

const ProductModule = createModule({
  id: "product-module",
  dirname: __dirname,
  typeDefs: [Product],
  resolvers: [ProductResolver],
});

module.exports = {
  ProductModule,
};
