const { gql } = require("graphql-modules");

const User = gql`
  scalar Date

  type User {
    id: Int
    email: String
    firstName: String
    lastName: String
    userName: String
    avatar: String
    dob: Date
    phoneNumber: String
    country: String
    city: String
    password: String
    deviceId: String
    resetToken: String
    type: UserType
    status: Boolean
    stripeCustomerId: String
    isVerified: Boolean
    createdAt: Date
    updatedAt: Date
    fcmToken: String
    providerId: String
    registrationType: String
    settings: Settings
    social: Social
  }
     
     
    input SettingsInput {
      notifications : NotificationsInput
    }
   
   input NotificationsInput {
        like: Boolean
        comment: Boolean
        share: Boolean
        news: Boolean
        chat: Boolean
        story: Boolean
    }  
  
    
    type Settings {
      notifications : Notifications
    }
   
      type Notifications {
        like: Boolean
        comment: Boolean
        share: Boolean
        news: Boolean
        chat: Boolean
        story: Boolean
    }

   
      input ProfileSocialInput {
        facebook: String
        twitter: String
        pinterest: String
        linkedin: String
        instagram: String
    }  
    
      type Social{
        facebook: String
        twitter: String
        pinterest: String
        linkedin: String
        instagram: String
    } 
    

  type UserResponse {
    status: Boolean
    message: String
    data: User
    error: String
  }

  type UserArrayResponse {
    status: Boolean
    message: String
    data: [User]
  }

  type Query {
    getAllUsers: UserArrayResponse
    loginUser(email: String, password: String, fcmToken: String): UserResponse
    getUserById(id: Int): UserResponse
  }

  type Mutation {
    createUser(
      id: Int
      email: String
      firstName: String
      lastName: String
      userName: String
      avatar: String
      dob: Date
      phoneNumber: String
      country: String
      city: String
      password: String
      deviceId: String
      resetToken: String
      type: UserType
      status: Boolean
      stripeCustomerId: String
        fcmToken: String
      providerId: String
      registrationType: String
      fcmToken : String
    ): UserResponse

    socialMediaLogin(
      providerId: String!
      registrationType: String!
      name: String
      email: String
      fcmToken: String
      type: UserType
    ): UserResponse

    forgotPassword(email: String!, type: String!): UserResponse

    changePassword(
      id: Int!
      currentPassword: String!
      newPassword: String!
    ): UserResponse

    deleteUser(id: Int!): UserArrayResponse

    verifyOtp(token: String!, email: String!): UserResponse

    resendOtp(email: String!): UserResponse

    resetPassword(email: String!, newPassword: String!): UserResponse
    logout(id: Int!): UserResponse

    updateProfile(
      id: Int!
      type: UserType!
      firstName: String
      lastName: String
      avatar: String
      dob: Date
      phoneNumber: String
      country: String
      city: String
     ): UserResponse
    
    updateSettings(
      id: Int!
      settings : SettingsInput
    ): UserResponse
    
    updateSocial(
      id: Int!
      social : ProfileSocialInput
    ): UserResponse
  }

  enum UserType {
   User
  Seller
  Vendor
  }
`;

module.exports = {
  User,
};
