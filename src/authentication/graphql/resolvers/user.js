import {ApolloError} from "apollo-server-express";
import {hash, compare} from 'bcryptjs';
import {issueToken, serializeUser} from '../../functions/index';

export default {
    Query: {
        authUserProfile: async (_, {}, {
            user
        }) => user,

        authenticateLoginUser: async (_,
                                      {
                                          username,
                                          password
                                      },
                                      {
                                          LoginUser
                                      }
        ) => {
            try {
                let user = await LoginUser.findOne({where: {username: username}});
                if (!user) {
                    return new ApolloError("User name not found", 400);
                }

                let isMatch = await compare(password, user.password);
                if (!isMatch) {
                    return new ApolloError("Invalid password", 400);
                }

                user = user.dataValues;
                user = serializeUser(user);
                let token = await issueToken(user);

                return {
                    token,
                    user: user
                }
            } catch (e) {
                throw new ApolloError(e.message, 403)
            }
        }
    },
    Mutation: {
        test: async (_, args, context, info) => {
            console.log("_", _);
            console.log("AGRS", args);
            console.log("CONTEXT", context);
            console.log("INFO", info);
            return "Test Mutation";
        },
        registerLoginUser: async (_,
                                  {
                                      newUser
                                  },
                                  {
                                      LoginUser
                                  }
        ) => {
            try {
                console.log(LoginUser);
                let {username, email} = newUser;
                let user;

                user = await LoginUser.findOne({where: {username: username}});
                if (user) {
                    return new ApolloError("User name is already taken", 400);
                }

                user = await LoginUser.findOne({where: {email: email}});
                if (user) {
                    return new ApolloError("Email is already taken", 400);
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
                throw new ApolloError(e.message, 403);
            }
        }
    }
}