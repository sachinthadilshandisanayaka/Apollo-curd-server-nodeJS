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
import {join} from 'path';
import {graphqlUploadExpress} from 'graphql-upload';

// Database
import db from './config/database';
import AuthMiddleware from "./middlewares/auth";
import {schemaDirectives} from './authentication/graphql/directives';

// Express Application
const app = express();
app.use(AuthMiddleware);
app.use(express.static(join(__dirname, './uploads')));
app.use(graphqlUploadExpress({maxFileSize: 1000000000, maxFiles: 10}));
const httpServer = http.createServer(app);

// const connect = 'postgresql://postgresql:password@localhost/postgres';

const server = new ApolloServer({
    uploads: false,
    typeDefs,
    resolvers,
    schemaDirectives,
    plugins: [IN_PROD ? ApolloServerPluginLandingPageGraphQLPlayground() : ApolloServerPluginLandingPageDisabled(),
        ApolloServerPluginDrainHttpServer({httpServer})],
    context: ({req}) => {
        let {isAuth, user} = req;

        return {
            req,
            isAuth,
            user,
            ...AppModels
        }
    }
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
startApp().then();