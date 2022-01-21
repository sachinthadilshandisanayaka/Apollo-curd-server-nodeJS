import sequelize from 'sequelize';
import db from '../../config/database';

const gig = db.define('user', {
    username: {
        type: sequelize.STRING,
    },
    password: {
        type: sequelize.STRING,
    }
});
export default gig;