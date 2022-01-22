import {gql} from "apollo-server-express";

export default gql`
    extend type Query {
        getAllUsers: [Post!]!
    },
    type Post {
        username: String!
        password: String!
        createdAt: String
        updatedAt: String
    }
`;