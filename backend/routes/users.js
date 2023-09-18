const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Get the details of the currently logged-in user (requires authentication)
router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Get a list of users (requires authentication and specific roles)
router.get('/users', auth, roles('Super Admin', 'Admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    console.log(users);

    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Create a new user (requires authentication and specific roles)
router.post('/users', auth, roles('Super Admin'), async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    } 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role, 
    });

    await newUser.save();

    res.json(newUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.put('/users/:id', auth, roles(['Super Admin', 'Customer']), async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.name = name;
    user.email = email;
    user.role = role; 

    
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});


// Delete a user (requires authentication and specific roles)
router.delete('/users/:id', auth, roles('Super Admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.deleteOne({ _id: req.params.id }); 
    res.json({ message: 'User deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;
