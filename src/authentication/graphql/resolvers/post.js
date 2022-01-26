import {ApolloError} from "apollo-server-express";

export default {
    Query: {
        getAllContent: async (_, {}, {PostContent}) => {
            let result = await PostContent.findAll();
            return result;
        },

        getContentByID: async (_, {id}, {
            PostContent,
            user
        }) => {
            try {
                let result = await PostContent.findOne({where: {id: id}});
                if (!result) {
                    return new Error("Content can't found");
                }
                result.author = user;
                return result;
            } catch (e) {
                throw new ApolloError(e.message, 400);
            }
        }
    },
    Mutation: {

        createContent: async (_, {newContent}, {
            PostContent,
            user
        }) => {
            let result = await PostContent.create({
                title: newContent.title,
                description: newContent.description,
                image: newContent.image,
                author: user.id,
            });
            result.author = user;
            return result;
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
                    return new Error("Unable to edit content");
                }
                return PostContent.findByPk(id);
            } catch (e) {
                throw new ApolloError(e.message, 400);
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
                    return new Error("Unable to delete content");
                }
                return {
                    id: id,
                    success: true,
                    message: "Your Post is Deleted"
                }
            } catch (e) {
                throw new ApolloError(e.message, 400);
            }
        }
    }
}