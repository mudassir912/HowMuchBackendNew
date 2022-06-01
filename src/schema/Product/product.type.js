const { gql } = require("graphql-modules");

const Product = gql`
  scalar Date

  type Product {
    id: Int
    title: String
    description: String
    lat: Float
    lng : Float
    locationTitle: String
    media: [ProductMedia]
    videoEnable: Boolean
    price: Float
    productCategoryId: Int
    userId: Int
    status: ProductStatus
    user: User
  }
   
   enum ProductStatus {
    BidOpen
    BidClose
    Sold
  }
  
   type User {
      products: [Product]
  }
  
  type ProductMedia {
    id : Int
    productId : Int
    product : Product
    asset : String
    type : String
    createdAt : Date
    updatedAt  : Date

}
 

  input ProductInput {
    title: String
    description: String
     lat: Float
    lng : Float
    locationTitle: String
    media: [MediaInput]
    price: Float
    videoEnable: Boolean
    productCategoryId: Int
    userId: Int
    status : ProductStatus
  }

  input whereProductInput {
     id: Int
  }

  input whereProductFiltersInput {
    id: Int
    productCategoryId: Int
    lat: Float
    lng : Float
    title: String
    locationTitle: String
    description: String
    userId: String
    status: ProductStatus
  }
  type ProductResponse {
    status: Boolean
    message: String
    data: Product
    error: String
  }

  type ProductArrayResponse {
    status: Boolean
    message: String
    data: [Product]
    pagination: PaginationResponse
    error: String
  }

  type Query {
    GetAllProducts(
      userId : Int
      pagination: PaginationInput
      where: whereProductFiltersInput
    ): ProductArrayResponse
    GetProductById(where: whereProductInput,  userId : Int): ProductResponse
  }

  type Mutation {
    CreateProduct(data: ProductInput): ProductResponse
    UpdateProduct(where: whereProductInput, data: ProductInput): ProductResponse
    DeleteProduct(where: whereProductInput): ProductResponse
  }


`;

module.exports = {
  Product,
};
