const { gql } = require("graphql-modules");

const ProductCategory = gql`
  scalar Date

  type ProductCategory {
    id: Int
    parentId:Int
    title: String
    child : [ProductCategory]
    Product: [Product]
    
  }
  
    type Product {
     productCategory: ProductCategory
  }
   

  input ProductCategoryInput {
    title: String
  parentId:Int
  }

  input whereProductCategoryInput {
    id: Int
   parentId:Int
  }

  type ProductCategoryResponse {
    status: Boolean
    message: String
    data: ProductCategory
    error: String
  }

  type ProductCategoryArrayResponse {
    status: Boolean
    message: String
    data: [ProductCategory]
    pagination: PaginationResponse
    error: String
  }

  type ProductCategoryAdminArrayResponse {
    status: Boolean
    message: String
    data: [ProductCategory]
    pagination: AdminPaginationResponse
    error: String
  }

  type Query {
    GetAllProductCategories(
      where: whereProductCategoryInput
      pagination: PaginationInput
    ): ProductCategoryArrayResponse

    GetAllAdminProductCategories(
      pagination: AdminPaginationInput
    ): ProductCategoryAdminArrayResponse

    GetProductCategoryById(
      where: whereProductCategoryInput
    ): ProductCategoryResponse
  }

  type Mutation {
    CreateProductCategory(data: ProductCategoryInput): ProductCategoryResponse
    UpdateProductCategory(
      where: whereProductCategoryInput
      data: ProductCategoryInput
    ): ProductCategoryResponse
    DeleteProductCategory(
      where: whereProductCategoryInput
    ): ProductCategoryResponse
  }
`;

module.exports = {
  ProductCategory,
};
