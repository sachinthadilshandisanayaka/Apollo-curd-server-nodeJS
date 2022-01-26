import {gql} from "apollo-server-express";

export default gql`
    extend type Query {
        getAllContent: [Post!]!
        getContentByID(id: ID!): Post!
    },
    
    extend type Mutation {
        createContent(newContent: PostContent!): Post! @isAuth
        editContentByID(updatedContent: PostContent, id: ID!): Post! @isAuth
        deleteContentByID(id: ID!): PostNotification! @isAuth
    },
    input PostContent {
        title: String!
        description: String!
        image: String
    },
    type Post {
        id: ID!
        title: String!
        description: String!
        author: User!
        image: String
        createdAt: String
        updatedAt: String
    }
    type PostNotification {
        id: ID!
        message: String!
        success: Boolean!
    }
`;