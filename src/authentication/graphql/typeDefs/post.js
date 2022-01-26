import {gql} from "apollo-server-express";

export default gql`
    extend type Query {
        getAllUsers: [Post!]!
        getUserByID(id: ID!): Post!
    },
    
    extend type Mutation {
        createUser(newUser: PostUser!): Post! @isAuth
        editUserByID(updatedUser: PostUser, id: ID!): Post! @isAuth
        deleteUserByID(id: ID!): PostNotification! @isAuth
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