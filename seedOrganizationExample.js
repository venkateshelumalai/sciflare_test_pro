// seeds/organizations.js
const mongoose = require('mongoose');
const Organization = require('./models/organization');

const seedOrganizations = async () => {
  try {
    await Organization.create([
      { name: 'Organization 1' },
      { name: 'Organization 2' }
    ]);
    console.log('Organization seed successful');
  } catch (error) {
    console.error('Error seeding organizations:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

seedOrganizations();
