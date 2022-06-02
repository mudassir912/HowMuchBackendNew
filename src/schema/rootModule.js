const { createApplication } = require('graphql-modules');
const { UserModule } = require('./User/user.module')
const {CustomModule} = require("./Custom/custom.module");
const {ChatModule} = require("./Chat/chat.module");
const {ProductModule} = require("./Product/product.module");
const {ProductCategoryModule} = require("./ProductCategory/productCategory.module");
const {ProductBidModule} = require("./ProductBid/productBid.module");
const {ServiceModule} = require("./Service/service.module");
const {ServiceCategoryModule} = require("./ServiceCategory/serviceCategory.module");
const {ServiceBidModule} = require("./ServiceBid/serviceBid.module");
const {NotificationModule} = require("./Notification/notification.module");

const application = createApplication({
  modules: [
      UserModule,
      ProductCategoryModule,
      ProductModule,
      ProductBidModule,
      ServiceCategoryModule,
      ServiceModule,
      ServiceBidModule,
      ChatModule,
      NotificationModule,
      CustomModule,
  ],
});

module.exports = {
    application
}
