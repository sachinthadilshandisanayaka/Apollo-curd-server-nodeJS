import {sign} from 'jsonwebtoken';
import { SECRET } from '../../config/index';
import { pick } from "lodash";

export const issueToken = async (loginUser) => {
    let token = await sign(loginUser, SECRET, {
        expiresIn: 60 * 60 * 24
    });
    return `Bearer ${token}`;
}
export const serializeUser = (loginUser) => {
    return pick(loginUser, ['id', 'username', 'email', 'firstName', 'lastName', 'avatarImage', 'createdAt', 'updatedAt']);
}