import express from 'express';
import User from '../models/user.models.js';

const userRoutes = express.Router();

// (GET)

// Obtain all users (base path /api/users)
userRoutes.get('/', async (req, res) => {
	try {
		
		const users = await User.findAll();

		if (users.length === 0) {
			return res.status(404).json({ message: 'Users not found' });
		}

		res.status(200).json(users);
	} catch (error) {
		res.status(400).json({ message: 'Error retrieving all users', data: {} });
	}
});

// Obtain a user by its ID (base path /api/users/:userID)
userRoutes.get('/:userID', async (req, res) => {
	try {
		const user = await User.findByPk(req.params.userID);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.status(200).json(user);
	} catch (error) {
		res.status(400).json({ message: 'Error retrieving user by id', data: {} });
	}
});

// Obtain a user by its username (base path /api/users/username/:username)
userRoutes.get('/username/:username', async (req, res) => {
	try {
		const user = await User.findOne({
			where: {
				username: req.params.username,
			},
		});
		res.status(200).json(user);
	} catch (error) {
		res.status(400).json({ message: 'Error retrieving user by username', data: {} });
	}
});

// (POST)

// Create a new user (base path /api/users)
userRoutes.post('/', async (req, res) => {
	try {
		const user = await User.create(req.body);
		res.status(201).json({
			message: 'User created successfully',
			data: user,
		});
	} catch (error) {
		res.status(400).json({ message: 'Error creating user', error });
	}
});

// (PUT)

// Update a user by its ID (base path /api/users/:userID)
userRoutes.put('/:userID', async (req, res) => {
	try {
		const user = await User.update(req.body, {
			where: {
				userID: req.params.userID,
			},
		});
		res.status(200).json({
			message: 'User updated successfully',
			data: user,
		});
	} catch (error) {
		res.status(400).json({ message: 'Error updating user', data: {} });
	}
});

// (DELETE)

// Delete a user by its ID (base path /api/users/:userID)
userRoutes.delete('/:userID', async (req, res) => {
	try {
		const user = await User.destroy({
			where: {
				userID: req.params.userID,
			},
		});
		res.status(200).json({
			message: 'User deleted successfully',
			data: user,
		});
	} catch (error) {
		res.status(400).json({ message: 'Error deleting user', data: {} });
	}
});

export default userRoutes;
