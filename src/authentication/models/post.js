import sequelize from 'sequelize';
import db from '../../config/database';
import LoginUser from "./user";

const PostContent = db.define('post_yumzy', {
        id: {
            type: sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: sequelize.STRING,
        },
        description: {
            type: sequelize.STRING,
        },
        image: {
            type: sequelize.STRING,
            allowNull: true,
        },
        author: {
            type: sequelize.INTEGER,
            references: {
                model: LoginUser,
                key: 'id',
                deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
        },
    },
    {
        freezeTableName: true,
    },
    {
        getterMethods: {
            authorData: function (id) {
                return LoginUser.findOne({where: {id: id}});
            }
        }
    },
);
PostContent.belongsTo(LoginUser, { foreignKey: 'author', targetKey: 'id', as: 'authorData'});
LoginUser.hasMany(PostContent, {foreignKey: 'id'});
export default PostContent;