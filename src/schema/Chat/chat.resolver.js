const { prisma } = require("../../database");
const AuthServices = require("../../services/authServices");
const { createResponse, createError } = require("../../utils/helperFunctions");
const ChatServices = require("../../services/ChatServices");
const { PubSub } = require("apollo-server-express");

const pubsub = new PubSub()


const ChatResolver = {
    Query: {
        getChatRooms: async (args, req, context) => {
            try {
                const responseData = await ChatServices.getChatRooms(req);
                return responseData;
            } catch (error) {
                return createError(401, error);
            }

        },
        getChatRoomMessages: async (args, req, context) => {
            try {
                const responseData = await ChatServices.getChatRoomMessages(req);
                return responseData;
            } catch (error) {
                return createError(401, error);
            }

        },
        getSpecificRoomByUsers: async (args, req, context) => {
            try {
                const responseData = await ChatServices.getSpecificRoomByUsers(req);
                return responseData;
            } catch (error) {
                return createError(401, error);
            }

         }
        },
    Mutation: {
        addChatRoom: async (args, req, context) => {
            try {
                const responseData = await ChatServices.addChatRoom(req);
                return responseData;
            } catch (error) {
                return createError(401, error);
            }
        },
        addChatRoomMember: async (args, req, context) => {
            try {
                const responseData = await ChatServices.addChatRoomMember(req);
                return responseData;
            } catch (error) {
                return createError(401, error);
            }
        },
        addMessage: async (args, req, context) => {
            try {
                const responseData = await ChatServices.addMessage(req);
                pubsub.publish(`room${req.roomId}`, responseData);
                return responseData;
            } catch (error) {
                return createError(401, error);
            }
        },
    },
    Subscription: {
        messageAdded: {
            subscribe(_root, args, _context) {
                return pubsub.asyncIterator([`room${args.roomId}`])
              },
            async resolve(eventPromise) {
                const event = await eventPromise
                return event
            }
        },
    },

}

module.exports = {
    ChatResolver
}

