const express = require('express');
const userRouter = express.Router();
const User = require('../models/user');
const Organization = require('../models/organization');

// Create a new user created by venkat on 23 Jan 2024
userRouter.post('/', async (req, res) => {
    try {
        const { username, password, userEmail, organizationId, roles, privileges } = req.body;
        const organization = await Organization.findById(organizationId);
        if (!organization) {
            return res.status(404).json({ message: 'Organization not found' });
        }
        const user = new User({ username, password, userEmail, organization, roles, privileges });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all users created by venkat on 23 Jan 2024
userRouter.get('/', async (req, res) => {
    try {
        const users = await User.find().populate('organization', 'name');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific user by ID created by venkat on 23 Jan 2024
userRouter.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('organization', 'name');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a user by ID created by venkat on 23 Jan 2024
userRouter.put('/:id', async (req, res) => {
    try {
        const { username, password, userEmail, organizationId, roles, privileges } = req.body;
        const organization = await Organization.findById(organizationId);
        if (!organization) {
            return res.status(404).json({ message: 'Organization not found' });
        }
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { username, password, userEmail, organization, roles, privileges },
            { new: true }
        ).populate('organization', 'name');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a user by ID created by venkat on 23 Jan 2024
userRouter.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = userRouter;
