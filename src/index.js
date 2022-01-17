import {error, success} from 'consola';
import {ApolloServer} from "apollo-server-express";
import {
    ApolloServerPluginLandingPageGraphQLPlayground,
    ApolloServerPluginLandingPageDisabled,
    ApolloServerPluginDrainHttpServer
} from "apollo-server-core";

import express from 'express';
import {PORT, IN_PROD} from "./config";
import http from 'http';
import {typeDefs, resolvers} from './authentication/graphql';

// Express Application
const app = express();
const httpServer = http.createServer(app);
const connect = 'postgresql://postgresql:password@localhost/postgres';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [IN_PROD ? ApolloServerPluginLandingPageGraphQLPlayground() : ApolloServerPluginLandingPageDisabled(),
        ApolloServerPluginDrainHttpServer({httpServer})],
    context: {},
});

const startApp = async () => {
    await server.start();
    // Inject Apollo server middleware on Express server
    server.applyMiddleware({app});
    app.listen(PORT, () => success({
        badge: true,
        message: `SERVER RUNNING ON PORT ${PORT}`,
    }));
}
startApp().then(r => {
});