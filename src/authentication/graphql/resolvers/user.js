import {LoginUser} from "../../models";
import {ApolloError} from "apollo-server-express";
import {hash} from 'bcryptjs';
import { issueToken, serializeUser } from '../../functions/index';

export default {
    Query: {
        infoUserResolvers: () => {
            return "hello from user!"
        }
    },
    Mutation: {
        registerLoginUser: async (_, {
            newUser
        }, {
                                      LoginUser
                                  }) => {
            try {
                let {username, email} = newUser;
                let user;

                user = await LoginUser.findOne({where: {username: username}});
                if (user) {
                    return new Error("User name is already taken");
                }

                user = await LoginUser.findOne({where: {email: email}});
                if (user) {
                    return new Error("Email is already taken");
                }

                user = new LoginUser(newUser);
                user.password = await hash(newUser.password, 10);
                let result = await user.save();
                result = result.dataValues;

                result = serializeUser(result);

                let token = await issueToken(result);

                return {
                    token,
                    user: result
                }
            } catch (e) {
                throw new ApolloError(e.message, 400);
            }
        }
    }
}