import sequelize from 'sequelize';
import db from '../../config/database';

const post_user = db.define('user_ymz', {
    username: {
        type: sequelize.STRING,
    },
    password: {
        type: sequelize.STRING,
    }
}, {
    freezeTableName: true,
});
export default post_user;