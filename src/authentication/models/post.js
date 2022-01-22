import sequelize from 'sequelize';
import db from '../../config/database';

const PostUser = db.define('user_ymz', {
    username: {
        type: sequelize.STRING,
    },
    password: {
        type: sequelize.STRING,
    }
}, {
    freezeTableName: true,
});
export default PostUser;