const { gql } = require("graphql-modules");

const ProductBid = gql`
  scalar Date

  type ProductBid {
    id: Int
    productId:Int
    userId:Int
    amount: Float
    product: Product
    user: User
    status: ProductBidStatus
  
  }
  
     enum ProductBidStatus {
      Pending
      Accepted
      Rejected
  }
  
  type Product {
     bids: [ProductBid]
     isBid: [ProductBid]
  }
  
  type User {
     bids: [ProductBid]
  }
   

  input ProductBidInput {
     productId:Int
    userId:Int
    amount: Float
    status: ProductBidStatus
  }

  input whereProductBidInput {
   id :Int
   productId:Int
   userId:Int
   status: ProductBidStatus
   }

  type ProductBidResponse {
    status: Boolean
    message: String
    data: ProductBid
    error: String
  }

  type ProductBidArrayResponse {
    status: Boolean
    message: String
    data: [ProductBid]
    pagination: PaginationResponse
    error: String
  }

  type ProductBidAdminArrayResponse {
    status: Boolean
    message: String
    data: [ProductBid]
    pagination: AdminPaginationResponse
    error: String
  }

  type Query {
    GetAllProductBid(
      where: whereProductBidInput
      pagination: PaginationInput
    ): ProductBidArrayResponse

    GetAllAdminProductBid(
      pagination: AdminPaginationInput
    ): ProductBidAdminArrayResponse

  }

  type Mutation {
    CreateProductBid(data: ProductBidInput): ProductBidResponse
    
    UpdateProductBid(
      where: whereProductBidInput
      data: ProductBidInput
    ): ProductBidResponse
    
    DeleteProductBid(
      where: whereProductBidInput
    ): ProductBidResponse
    

  }
`;

module.exports = {
  ProductBid,
};
