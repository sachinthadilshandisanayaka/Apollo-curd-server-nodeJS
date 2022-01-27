import {ApolloError} from "apollo-server-express";
import {LoginUser, PostContent} from "../../models";

export default {
    Query: {
        getAllContent: async (_, {}, {PostContent}) => {
            try {
                let result = await PostContent.findAll();
                if (!result) {
                    return new ApolloError("Contents can't found", 404);
                }
                return result;
            } catch (e) {
                throw new ApolloError(e.message, 403)
            }
        },

        getContentByID: async (_, {id}, {
            PostContent,
            user
        }) => {
            try {
                let result = await PostContent.findOne({where: {id: id}});
                if (!result) {
                    return new ApolloError("Content can't found", 404);
                }
                const authorId = result.author;
                result.author = await LoginUser.findOne({
                    where:
                        {
                            id: authorId
                        }
                });
                return result;
            } catch (e) {
                throw new ApolloError(e.message, 403);
            }
        },

        paginationContentList: async (_, {}, {PostContent}) => {
            let result = await PostContent.findAndCountAll({
                offset: 5
            });
            return [{
                count: result.count,
                body: result.rows
            }];
        },
    },
    Mutation: {

        createContent: async (_, {newContent}, {
            PostContent,
            user
        }) => {
            try {
                let result = await PostContent.create({
                    title: newContent.title,
                    description: newContent.description,
                    image: newContent.image,
                    author: user.id,
                });
                result.author = user;
                return result;
            } catch (e) {
                throw new ApolloError(e.message, 403);
            }
        },

        editContentByID: async (_, {updatedContent, id}, {
            PostContent,
            user
        }) => {
            try {
                let editedUser = await PostContent.update(
                    {
                        title: updatedContent.title,
                        description: updatedContent.description,
                        author: updatedContent.author,
                        image: updatedContent.image,
                    },
                    {
                        where: {
                            id: id,
                            author: user.id
                        },
                        returning: true,
                    });
                if (!editedUser) {
                    return new ApolloError("Unable to edit content", 500);
                }
                return PostContent.findByPk(id);
            } catch (e) {
                throw new ApolloError(e.message, 403);
            }
        },

        deleteContentByID: async (_, {id}, {
            PostContent,
            user
        }) => {
            try {
                let deletedContent = await PostContent.destroy(
                    {
                        where:
                            {
                                id: id,
                                author: user.id
                            }
                    });
                if (!deletedContent) {
                    return new ApolloError("Unable to delete content", 500);
                }
                return {
                    id: id,
                    success: true,
                    message: "Your Post is Deleted"
                }
            } catch (e) {
                throw new ApolloError(e.message, 403);
            }
        }
    }
}