import {gql} from "apollo-server-express";

export default gql`
    extend type Query {
        getAllContent: [ContentBody!]!
        getContentByID(id: ID!): ContentBody!
        paginationContentList(searchParams: SearchParams!): [PaginatedPostList!]! @isAuth
    },
    
    extend type Mutation {
        createContent(newContent: PostContent!): Post! @isAuth
        editContentByID(updatedContent: PostContent, id: ID!): Post! @isAuth
        deleteContentByID(id: ID!): PostNotification! @isAuth
    },
    input SearchParams {
        page: Int!
        size: Int!
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
    },
    type ContentBody {
        id: ID!
        title: String!
        description: String!
        author: Int!
        image: String
        createdAt: String
        updatedAt: String
        authorData: User!
    },
    type PostNotification {
        id: ID!
        message: String!
        success: Boolean!
    },
    type PaginatedPostList {
        count: Int!
        totalPages: Int!
        body: [Post!]!
    },
`;