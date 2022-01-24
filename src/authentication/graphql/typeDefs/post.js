import {gql} from "apollo-server-express";

export default gql`
    extend type Query {
        getAllUsers: [Post!]!
        getUserByID(id: ID!): Post!
    },
    
    extend type Mutation {
        createUser(newUser: PostUser!): Post!
        editUserByID(updatedUser: PostUser, id: ID!): Post!
        deleteUserByID(id: ID!): PostNotification!
    },
    input PostUser {
        username: String!
        password: String!
    },
    type Post {
        id: ID!
        username: String!
        password: String!
        createdAt: String
        updatedAt: String
    }
    type PostNotification {
        id: ID!
        message: String!
        success: Boolean!
    }
`;