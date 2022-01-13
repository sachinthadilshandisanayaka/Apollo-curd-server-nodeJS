import {error, success} from 'consola';
import {ApolloServer, gql} from "apollo-server-express"
import express from 'express';
import {PORT} from "./config";

// Express Application
const app = express();

const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => 'Hello world',
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {}
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
startApp().then(r => {});