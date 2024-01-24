// seeds/users.js
const mongoose = require('mongoose');
const User = require('../models/user');
const Organization = require('../models/organization');

const seedUsers = async () => {
    try {
        const organization1 = await Organization.findOne({ name: 'Organization 1' });

        if (organization1) {
            await User.create([
                {
                    username: 'user1',
                    password: 'user1password',
                    organization: organization1._id,
                    roles: ['user'],
                    privileges: ['read'],
                },
            ]);
            console.log('User seed successful');
        } else {
            console.error('Organization not found for seeding users');
        }
    } catch (error) {
        console.error('Error seeding users:', error.message);
    } finally {
        mongoose.connection.close();
    }
};

seedUsers();
