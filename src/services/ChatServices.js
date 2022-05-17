const { prisma } = require("../database.js");
require("dotenv").config();
const _ = require("lodash")
const { SendBookingCodeMail } = require("./emailServices.js");
const { createError, createResponse, requestPagination, returnPagination, customString } = require("../utils/helperFunctions.js");
const { relations } = require("../utils/relationsHelper.js");
const { userInfo } = require("../utils/userHelper");
const { PostHelper } = require("../utils/postHelper");

const N = require("./NotificationServices");

const Chat = {

  async getChatRooms(data) {
    try {
      whereRoomMember = {};
      whereId = {};
      roomMember = _.map(data.where.roomMember, 'userId');
      if (roomMember.length) {
        whereRoomMember = {
          roomMember: {
            some: {
              userId: { in: roomMember },
            },
          }
        }
      }
      if (data.where.id) {
        whereId = { id: data.where.id };
      }
      console.log("whereRoomMember", whereRoomMember, data.where.userId)
      chatRoom = await prisma.chatRoom.findMany({
        where: { 
          roomMember: {
            some: {
              userId: data.where.userId
            }
          },
          conversion: {
            some: {
              
            }
          }
         },
        include: relations.chatRoom(data)
      });
      return createResponse(chatRoom, true, "chatRooms");
    } catch (error) {
      return createError(401, error);
    }
  },

  async addChatRoom(data) {
    try {
       chatRoom = await prisma.chatRoom.create({
        data: {
          title: data.chatRoom.title
        },
      });
      if (chatRoom) {
        await this.addChatRoomMember(chatRoom.id, data.chatRoom.members)
      }
      chatRoom = await prisma.chatRoom.findUnique({
        where: {
          id: chatRoom.id
        },
        include: relations.chatRoom()
      });
      console.log(
        "Chat Room Added"
      )
      return createResponse(chatRoom, true, "Chat Room Added");
    } catch (error) {
      return createError(401, error);
    }
  },

  async addChatRoomMember(id, data) {
    for (const member of data) {
      const memberData = {
        roomId: id,
        userId: member,
      };
      ChatRoomMember = await prisma.roomMember.create({
        data: memberData,
      });
    }
    console.log(
      "Chat RoomMember Added"
    )
    return createResponse(ChatRoomMember, true, "Chat RoomMember Added");
  },

  async addMessage(data) {
    try {
      const roomExist = await prisma.chatRoom.findUnique({
        where: {
          id: data.roomId,
        },
      });
      var newChatRoom;
      if (!roomExist) {
         newChatRoom = await this.addChatRoom({
          chatRoom: {
            title: data.message,
            members: [data.senderId, data.recieverId]
          }
        })
      }
       message = await prisma.conversion.create({
        data: {
          parentId: data.parentId,
          roomId: roomExist ? data.roomId : newChatRoom?.data?.id,
          senderId: data.senderId,
          recieverId: data.recieverId,
          message: data.message,
          type: data.type,
        },
      });

      if (message) {
        message = await prisma.conversion.findUnique({
          where: {
            id: message.id,
          },
          include: relations.conversion(data)
        });
      }

      await N.add(data.senderId, data.recieverId, 'newMessage', 'MESSAGE', message.id);

      return message // createResponse(message, true, "New Message Added");
    } catch (error) {
      return createError(401, error);
    }


  },

  async getChatRoomMessages (data) {
    try {
      messages = await prisma.conversion.findMany({
        where: { 
          roomId: data?.roomId
         },
         include: {
           sender: true,
           reciever: true
         }
      });
      return messages //createResponse(messages, true, "messages");
    } catch (error) {
      
    }
  },

  async getSpecificRoomByUsers (data) {
    try {
        room = await prisma.chatRoom.findFirst({
          where: {
            roomMember: {
              every: {
                userId: {in: data?.members?.map(val => val?.userId)}
              }
            }
          },
          include: relations.chatRoom(data)
        })
        return createResponse(room, true, "chatRooms");
    } catch (error) {
        return createError(401, error);
    }
  } 

};

module.exports = Chat;
