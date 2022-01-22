import {gql} from "apollo-server-express";

export default gql`
    extend type Query {
        getAllUsers: [Post!]!
    },
    
    extend type Mutation {
        createUser(newUser:newUser): Post!
    },
    input newUser {
        username: String!
        password: String!
    },
    type Post {
        username: String!
        password: String!
        createdAt: String
        updatedAt: String
    }
`;