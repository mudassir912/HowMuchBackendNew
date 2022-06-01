const { gql } = require("graphql-modules");

const ServiceBid = gql`
  scalar Date

  type ServiceBid {
    id: Int
    serviceId:Int
    userId:Int
    amount: Float
    service: Service
    user: User
    status: ServiceBidStatus
  
  }
  
     enum ServiceBidStatus {
      Pending
      Accepted
      Rejected
  }
  
  type Service {
     bids: [ServiceBid]
     isBid: [ServiceBid]
  }
  
  type User {
     bidsService: [ServiceBid]
  }
   

  input ServiceBidInput {
     serviceId:Int
    userId:Int
    amount: Float
    status: ServiceBidStatus
  }

  input whereServiceBidInput {
   id :Int
   serviceId:Int
   userId:Int
   status: ServiceBidStatus
   }

  type ServiceBidResponse {
    status: Boolean
    message: String
    data: ServiceBid
    error: String
  }

  type ServiceBidArrayResponse {
    status: Boolean
    message: String
    data: [ServiceBid]
    pagination: PaginationResponse
    error: String
  }

  type ServiceBidAdminArrayResponse {
    status: Boolean
    message: String
    data: [ServiceBid]
    pagination: AdminPaginationResponse
    error: String
  }

  type Query {
    GetAllServiceBid(
      where: whereServiceBidInput
      pagination: PaginationInput
    ): ServiceBidArrayResponse

    GetAllAdminServiceBid(
      pagination: AdminPaginationInput
    ): ServiceBidAdminArrayResponse

  }

  type Mutation {
    CreateServiceBid(data: ServiceBidInput): ServiceBidResponse
    
    UpdateServiceBid(
      where: whereServiceBidInput
      data: ServiceBidInput
    ): ServiceBidResponse
    
    DeleteServiceBid(
      where: whereServiceBidInput
    ): ServiceBidResponse
    

  }
`;

module.exports = {
  ServiceBid,
};
