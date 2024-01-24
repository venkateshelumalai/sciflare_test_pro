// migrations/createUser.js
const mongoose = require('mongoose');
const User = require('../models/user');
const Organization = require('./models/organization');

const createUser = async () => {
  try {
    const defaultOrganization = await Organization.findOne({ name: 'Default Organization' });

    if (defaultOrganization) {
      await User.create({
        username: 'admin',
        password: 'adminpassword',
        organization: defaultOrganization._id,
        roles: ['admin'],
        privileges: ['read', 'write'],
      });
      console.log('User migration successful');
    } else {
      console.error('Default organization not found');
    }
  } catch (error) {
    console.error('Error creating user:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

createUser();
