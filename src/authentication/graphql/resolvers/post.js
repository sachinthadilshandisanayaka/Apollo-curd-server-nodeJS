import {PostUser} from "../../models";

export default {
    Query: {
        getAllUsers: async (_, {}, {PostUser}) => {
            let users = await PostUser.findAll();
            return users;
        }
    },
    Mutation: {
        createUser: async (_, {newUser}, {PostUser}, info) => {
            let result = await PostUser.create(newUser);
            return result;
        },

        editUserByID: async (_, {updatedUser, id}, {PostUser}) => {
            let editedUser = await PostUser.update(
                {
                    username: updatedUser.username,
                    password: updatedUser.password
                },
                {
                    where: {id: id},
                    returning: true,
                });
            return PostUser.findByPk(id);
        },
        deleteUserByID: async (_, {id}, {PostUser}) => {
            let deletedUser = await PostUser.destroy({where: {id: id}});
            return {
                id: id,
                success: true,
                message: "Your Post is Deleted"
            }
        }
    }
}