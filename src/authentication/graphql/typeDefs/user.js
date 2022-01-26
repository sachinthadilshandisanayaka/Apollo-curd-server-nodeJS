import {gql} from "apollo-server-express";

export default gql`
    extend type Query {
        authUser: User!,
        authenticateLoginUser(username: String!, password: String!): AuthResp!
    }
    extend type Mutation {
        registerLoginUser(newUser: UserInput!): AuthResp!
    }
    input UserInput {
        username: String!
        email: String!
        firstName: String!
        lastName: String!
        avatarImage: String
        password: String!
    }
    type User {
        id: ID!
        username: String!
        email: String!
        firstName: String!
        lastName: String!
        avatarImage: String
        createdAt: String
        updatedAt: String
    }
    type AuthResp {
        user: User!,
        token: String!
    }
`;