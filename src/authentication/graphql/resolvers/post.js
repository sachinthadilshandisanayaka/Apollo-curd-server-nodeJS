import {ApolloError} from "apollo-server-express";
import {LoginUser} from "../../models";

export default {
    Query: {
        getAllContent: async (_, {}, {PostContent}) => {
            try {
                let result = await PostContent.findAll({
                    include: {
                        model: LoginUser,
                        as: 'authorData'
                    }
                });
                console.log(result);
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
                let result = await PostContent.findOne(
                    {
                        where:
                            {
                                id: id
                            },
                        include: [
                            {
                                model: LoginUser,
                                as: 'authorData'
                            }
                        ]
                    }
                );
                return result;
            } catch (e) {
                throw new ApolloError(e.message, 403);
            }
        },

        paginationContentList: async (_, {searchParams}, {PostContent}) => {
            try {
                let page = 0;
                let size = 0;
                const pageAsNumber = Number.parseInt(searchParams.page);
                const sizeAsNumber = Number.parseInt(searchParams.size);

                if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
                    page = pageAsNumber - 1;
                }

                if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0) {
                    size = sizeAsNumber;
                }

                let result = await PostContent.findAndCountAll({
                    limit: size,
                    offset: page * size
                });
                return [{
                    count: result.count,
                    totalPages: Math.ceil(result.count / size),
                    body: result.rows
                }];
            } catch (e) {
                throw new ApolloError(e.message, 403);
            }
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