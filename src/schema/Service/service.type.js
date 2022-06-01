const { gql } = require("graphql-modules");

const Service = gql`
  scalar Date

  type Service {
    id: Int
    title: String
    description: String
    lat: Float
    lng : Float
    locationTitle: String
    media: [ServiceMedia]
    videoEnable: Boolean
    price: Float
    serviceCategoryId: Int
    userId: Int
    status: ServiceStatus
    user: User
  }
   
   enum ServiceStatus {
    BidOpen
    BidClose
    Sold
  }
  
   type User {
      services: [Service]
  }
  
  type ServiceMedia {
    id : Int
    serviceId : Int
    service : Service
    asset : String
    type : String
    createdAt : Date
    updatedAt  : Date

}
 

  input ServiceInput {
    title: String
    description: String
     lat: Float
    lng : Float
    locationTitle: String
    media: [MediaInput]
    price: Float
    videoEnable: Boolean
    serviceCategoryId: Int
    userId: Int
    status : ServiceStatus
  }

  input whereServiceInput {
     id: Int
  }

  input whereServiceFiltersInput {
    id: Int
    serviceCategoryId: Int
    lat: Float
    lng : Float
    title: String
    locationTitle: String
    description: String
    userId: String
    status: ServiceStatus
  }
  type ServiceResponse {
    status: Boolean
    message: String
    data: Service
    error: String
  }

  type ServiceArrayResponse {
    status: Boolean
    message: String
    data: [Service]
    pagination: PaginationResponse
    error: String
  }

  type Query {
    GetAllServices(
      userId : Int
      pagination: PaginationInput
      where: whereServiceFiltersInput
    ): ServiceArrayResponse
    GetServiceById(where: whereServiceInput,  userId : Int): ServiceResponse
  }

  type Mutation {
    CreateService(data: ServiceInput): ServiceResponse
    UpdateService(where: whereServiceInput, data: ServiceInput): ServiceResponse
    DeleteService(where: whereServiceInput): ServiceResponse
  }


`;

module.exports = {
  Service,
};
