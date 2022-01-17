'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'user',
            [
                {
                    id: 1,
                    name: 'Doe',
                    email: 'example@gmail.com',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 2,
                    name: 'Dilshan',
                    email: 'sachintha@example.com',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 3,
                    name: 'Ma',
                    email: 'Jack@ji.com',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
        await queryInterface.bulkInsert(
            'channel',
            [
                {
                    id: 1,
                    name: 'channel1',
                    user_id: 1,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    id: 2,
                    name: 'channel2',
                    user_id: 2,
                    created_at: new Date(),
                    updated_at: new Date()
                },
            ],
            {}
        );
        await queryInterface.bulkInsert(
            'video',
            [
                {
                    id: 1,
                    title: 'video1',
                    channel_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 2,
                    title: 'video2',
                    channel_id: 2,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
