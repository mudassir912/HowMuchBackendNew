const { createModule } = require("graphql-modules");
const { ProductCategoryResolver } = require("./productCategory.resolver");
const { ProductCategory } = require("./productCategory.type");

const ProductCategoryModule = createModule({
  id: "product-category-module",
  dirname: __dirname,
  typeDefs: [ProductCategory],
  resolvers: [ProductCategoryResolver],
});

module.exports = {
  ProductCategoryModule,
};
