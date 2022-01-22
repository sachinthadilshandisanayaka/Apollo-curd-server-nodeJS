import PostUser from "../../models/post";

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
        }
    }
}