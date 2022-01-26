import sequelize from 'sequelize';
import db from '../../config/database';

const LoginUser = db.define('login_yumzy', {
    username: {
        type: sequelize.STRING,
    },
    email: {
        type: sequelize.STRING,
    },
    firstName: {
        type: sequelize.STRING,
    },
    lastName: {
        type: sequelize.STRING,
    },
    avatarImage: {
        type: sequelize.STRING,
        default: '../../../resources/images/avatar-default-icon.png'
    },
    password: {
        type: sequelize.STRING,
    }
}, {
    freezeTableName: true,
});
export default LoginUser;