const { gql } = require("graphql-modules");

const Chat = gql`
  scalar JSON
  scalar JSONObject
  
  type ChatRoom {
  id : Int  
  title : String 
  roomMember : [RoomMember]  
  conversion : [Conversion]
  }
  
  type RoomMember{
  id : Int 
  roomId : Int 
  userId : Int
  chatRoom : ChatRoom
  user : User        
  }
  
  type Conversion{
    id : Int            
    roomId : Int  
    chatRoom : ChatRoom
    senderId : Int
    recieverId:  Int
    sender : User 
    reciever:   User
    message : String
    parent : Conversion
    replies : [Conversion]
    type : String
    createdAt: Date
    updatedAt: Date
  }
  
  
  input AddChatRoomInput{
    title : String
    members : [Int]
   }
  

  input MemberInput {
    userId: Int
  }
  
  type ChatRoomResponse{
    status: Boolean
    message: String
    data: ChatRoom
    error: String
  }  
  
  
  type ChatRoomArrayResponse {
    status: Boolean
    message: String
    data: [ChatRoom]
    error: String
  }
  
  type ChatRoomArrayResponse {
    status: Boolean
    message: String
    data: [ChatRoom]
    error: String
  } 
  
  
  type ConversionArrayResponse {
    status: Boolean
    message: String
    data: [Conversion]
    error: String
  }
  
  type ConversionResponse {
    status: Boolean
    message: String
    data: Conversion
    error: String
  }

  type ConversionArrayResponse {
    status: Boolean
    message: String
    data: [Conversion]
    error: String
  }
  
  
  input whereChatRoomInput{
    userId : Int
  }
  
  
  
  type Query {
    getChatRooms(where: whereChatRoomInput): ChatRoomArrayResponse
    getChatRoomMessages(roomId: Int): [Conversion]
    getSpecificRoomByUsers(members: [MemberInput]): ChatRoomResponse
  }
  
  
  type Mutation {
  addChatRoom(chatRoom : AddChatRoomInput): ChatRoomResponse
  addChatRoomMember(roomId : Int, members : [MemberInput]): ChatRoomResponse
  addMessage(roomId : Int, senderId : Int,message : String,  type : String, recieverId : Int): Conversion
  
  }
  
 
  type Subscription {
    messageAdded(roomId : Int): Conversion # ConversionResponse # senderId : Int,message : String,  type : String, recieverId : Int
}
  
`;

module.exports = {
  Chat,
};
