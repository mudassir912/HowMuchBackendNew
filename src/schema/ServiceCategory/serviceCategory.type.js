const { gql } = require("graphql-modules");

const ServiceCategory = gql`
  scalar Date

  type ServiceCategory {
    id: Int
    parentId:Int
    title: String
    child : [ServiceCategory]
    Service: [Service]
    
  }
  
    type Service {
     serviceCategory: ServiceCategory
  }
   

  input ServiceCategoryInput {
    title: String
  parentId:Int
  }

  input whereServiceCategoryInput {
    id: Int
   parentId:Int
  }

  type ServiceCategoryResponse {
    status: Boolean
    message: String
    data: ServiceCategory
    error: String
  }

  type ServiceCategoryArrayResponse {
    status: Boolean
    message: String
    data: [ServiceCategory]
    pagination: PaginationResponse
    error: String
  }

  type ServiceCategoryAdminArrayResponse {
    status: Boolean
    message: String
    data: [ServiceCategory]
    pagination: AdminPaginationResponse
    error: String
  }

  type Query {
    GetAllServiceCategories(
      where: whereServiceCategoryInput
      pagination: PaginationInput
    ): ServiceCategoryArrayResponse

    GetAllAdminServiceCategories(
      pagination: AdminPaginationInput
    ): ServiceCategoryAdminArrayResponse

    GetServiceCategoryById(
      where: whereServiceCategoryInput
    ): ServiceCategoryResponse
  }

  type Mutation {
    CreateServiceCategory(data: ServiceCategoryInput): ServiceCategoryResponse
    UpdateServiceCategory(
      where: whereServiceCategoryInput
      data: ServiceCategoryInput
    ): ServiceCategoryResponse
    DeleteServiceCategory(
      where: whereServiceCategoryInput
    ): ServiceCategoryResponse
  }
`;

module.exports = {
  ServiceCategory,
};
