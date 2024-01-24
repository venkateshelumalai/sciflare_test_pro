const express = require('express');
const orgRouter = express.Router();
const Organization = require('../models/organization');

// Create a new organization created by venkat on 22 Jan 2024
orgRouter.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        const organization = new Organization({ name });
        await organization.save();
        res.status(201).json(organization);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all organizations created by venkat on 22 Jan 2024
orgRouter.get('/', async (req, res) => {
    try {
        const organizations = await Organization.find();
        res.json(organizations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific organization by ID created by venkat on 22 Jan 2024
orgRouter.get('/:id', async (req, res) => {
    try {
        const organization = await Organization.findById(req.params.id);
        if (!organization) {
            return res.status(404).json({ message: 'Organization not found' });
        }
        res.json(organization);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an organization by ID created by venkat on 22 Jan 2024
orgRouter.put('/:id', async (req, res) => {
    try {
        const { name } = req.body;
        const organization = await Organization.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true }
        );
        if (!organization) {
            return res.status(404).json({ message: 'Organization not found' });
        }
        res.json(organization);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete an organization by ID created by venkat on 22 Jan 2024
orgRouter.delete('/:id', async (req, res) => {
    try {
        const organization = await Organization.findByIdAndRemove(req.params.id);
        if (!organization) {
            return res.status(404).json({ message: 'Organization not found' });
        }
        res.json({ message: 'Organization deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = orgRouter;