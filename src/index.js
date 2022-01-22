import {error, success} from 'consola';
import {ApolloServer} from "apollo-server-express";
import {
    ApolloServerPluginLandingPageGraphQLPlayground,
    ApolloServerPluginLandingPageDisabled,
    ApolloServerPluginDrainHttpServer
} from "apollo-server-core";

import * as AppModels from './authentication/models';
import express from 'express';
import {PORT, IN_PROD} from "./config";
import http from 'http';
import {typeDefs, resolvers} from './authentication/graphql';

// Database
import db from './config/database';
import post_user from "./authentication/models/post";

// Express Application
const app = express();
const httpServer = http.createServer(app);

// const connect = 'postgresql://postgresql:password@localhost/postgres';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [IN_PROD ? ApolloServerPluginLandingPageGraphQLPlayground() : ApolloServerPluginLandingPageDisabled(),
        ApolloServerPluginDrainHttpServer({httpServer})],
    context: {
        ...AppModels
    },
});

const startApp = async () => {
    try {
        await db.authenticate()
            .then(() => success({
                badge: true,
                message: `DATABASE CONNECTION SUCCESSFULLY`,
            }))
            .catch(err => {
                error({
                    badge: true,
                    message: `ERROR :${err}`
                });
            });
        await server.start();
        // Inject Apollo server middleware on Express server
        server.applyMiddleware({app});
        app.listen(PORT, () => success({
            badge: true,
            message: `SERVER RUNNING ON PORT ${PORT}`,
        }));
    } catch (e) {
        error({
            badge: true,
            message: e.message
        });
    }
}
startApp().then(result => {
    // const data = {
    //     username: 'Sanju 5',
    //     password: 'Admin@123444'
    // }
    // let { username, password } = data;
    // post_user.create({
    //     username: username,
    //     password: password
    // })
    //     .then(result => {console.log(result)})
    //     .catch(err => console.log(err));
});