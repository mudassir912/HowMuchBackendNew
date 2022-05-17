const { gql } = require("graphql-modules");

const Custom = gql`
   scalar Date  
   



  type Token {
    id: Int
    userId : Int
    token: String
    createdAt: Date
  }

  type DeleteResponse {
  status: Boolean
  message: String
  error: String
  }

  
  input MediaInput {
  asset: String
  type: String
}


  input SocialInput {
  key: String
  value: String
  }
  
  input PaginationInput {
  page : Int
  perPage : Int
  }
  
  type PaginationResponse {
  total : Int
  currentPage : Int
  perPage : Int
  }
  
  
  type Country{
    id : Int
    name : String
    cities : [City]
}

  type CountryArrayResponse {
    status: Boolean
    message: String
    data: [Country]
    error: String
  }
  
  type CountryResponse {
    status: Boolean
    message: String
    data: Country
    error: String
  }

type City {
    id : Int
    countryId : Int
    country : Country
    name : String
}


  input whereCityInput {
    id : Int
    countryId : Int
    name : String
  }
  
 type CityArrayResponse {
    status: Boolean
    message: String
    data: [City]
    error: String
  }
 type CityResponse {
    status: Boolean
    message: String
    data: City
    error: String
  }
  
  
  type Category{
    id:Int 
    parentId:Int
    name : String
    child : [Category]
 }
 
 
 type CategoryArrayResponse {
    status: Boolean
    message: String
    data: [Category]
    error: String
  }
 type CategoryResponse {
    status: Boolean
    message: String
    data: Category
    error: String
  }
  
input whereCategoryInput {
    id : Int
    parentId : Int
    name : String
  }
  
    type Query {
      getCountries(id: Int): CountryArrayResponse
      getCities(where: whereCityInput): CountryArrayResponse
      getCategories(where: whereCategoryInput): CategoryArrayResponse
    }
    
    type Mutation {
    addCountry(name : String): CountryResponse
    updateCountry(id : Int, name:String): CountryResponse
    deleteCountry(id : Int): CountryResponse
    addCity(name : String, countryId : Int): CityResponse
    updateCity(id : Int, name:String): CityResponse
    deleteCity(id : Int): CityResponse
    addCategory(name : String, parentId : Int): CategoryResponse
    updateCategory(id : Int, name:String): CategoryResponse
    deleteCategory(id : Int): CategoryResponse
  }
  
`;

module.exports = {
  Custom,
};
