
const { createModule } = require('graphql-modules');
const { CustomResolver } = require('./custom.resolver');
const { Custom } = require('./custom.type');

const CustomModule = createModule({
  id: 'custom-module',
  dirname: __dirname,
  typeDefs: [Custom],
  resolvers: [CustomResolver]
});

module.exports = {
   CustomModule
}
