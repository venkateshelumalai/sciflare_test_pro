const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: String,
});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;
