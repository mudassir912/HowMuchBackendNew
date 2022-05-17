import { ApolloServer, PubSub } from "apollo-server-express";
import { schema } from "./schema";
import { context } from "./context";
// @ts-ignore
import express from "express";
// @ts-ignore
import session from "express-session";
import { APP_SECRET } from "../src/utils";
import * as http from 'http';
import { graphqlUploadExpress } from 'graphql-upload'
import { join } from "path"
// export const server = new ApolloServer({
//   schema,
//   context,
//   cors: true,
// });

export const pubsub = new PubSub();
export const app = express();
// console.log("join", join(__dirname, "../uploads"));

app.use("/", express.static(join(__dirname, "../uploads")))
app.use("/default", express.static(join(__dirname, "../defaultAssets")))

app.use(
  session({
    store: new (require("connect-pg-simple")(session))(),
    name: "qid",
    secret: APP_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    },
  })
);

// Create Apollo Server instance
app.use(graphqlUploadExpress())
const apolloServer = new ApolloServer({
  schema,
  context: ({ req, res }) => ({ req, res, ...context }),
  introspection: true,
  playground: true,
  tracing: true,
  uploads: false,
});


// // Apply server instance as middleware
apolloServer.applyMiddleware({ app, cors: true });

export const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);