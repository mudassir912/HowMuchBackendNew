const { createModule } = require('graphql-modules');
const { ChatResolver } = require('./chat.resolver');
const { Chat } = require('./chat.type');

const ChatModule = createModule({
  id: 'chat-module',
  dirname: __dirname,
  typeDefs: [Chat],
  resolvers: [ChatResolver]
});

module.exports = {
   ChatModule
}
