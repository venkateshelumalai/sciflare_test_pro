// migrations/createOrganization.js
const mongoose = require('mongoose');
const Organization = require('./models/organization');

const createOrganization = async () => {
  try {
    await Organization.create({
      name: 'Default Organization',
    });
    console.log('Organization migration successful');
  } catch (error) {
    console.error('Error creating organization:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

createOrganization();
