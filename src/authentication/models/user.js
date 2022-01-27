import sequelize from 'sequelize';
import db from '../../config/database';

const LoginUser = db.define('login_yumzy', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: sequelize.STRING,
    },
    email: {
        type: sequelize.STRING,
        validate: {
            isEmail: {
                args: true,
                msg: 'Must be enter a Valid Email Address'
            },
        }
    },
    firstName: {
        type: sequelize.STRING,
        validate: {
            isAlpha: {
                args: true,
                msg: 'Must be enter only letters for first name'
            },
        }
    },
    lastName: {
        type: sequelize.STRING,
        validate: {
            isAlpha: {
                args: true,
                msg: 'Must be enter only letters for last name'
            },
        }
    },
    avatarImage: {
        type: sequelize.STRING,
        defaultValue: '../../../resources/images/avatar-default-icon.png'
    },
    password: {
        type: sequelize.STRING,
        validate: {
            min:{
                args: 5,
                msg: 'Password must have at least 5 characters'
            },
        }
    }
}, {
    freezeTableName: true,
});
export default LoginUser;