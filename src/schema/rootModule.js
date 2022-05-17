const { createApplication } = require('graphql-modules');
const { UserModule } = require('./User/user.module')
const {CustomModule} = require("./Custom/custom.module");
const {ChatModule} = require("./Chat/chat.module");
const {NotificationModule} = require("./Notification/notification.module");


const application = createApplication({
  modules: [
      UserModule,
      ChatModule,
      NotificationModule,
      CustomModule,
  ],
});


module.exports = {
    application
}
