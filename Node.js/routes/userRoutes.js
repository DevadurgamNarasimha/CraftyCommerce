const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const User = require('../models/userModel');
const userCheck = require('../middleware/userCheck');

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/');
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, '${req.body.username}${ext}');
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only JPG and PNG images are allowed'), false);
    }
  }
});
router.post('/register', upload.single('profileImage'), async (req, res) => {
  try {
    const { userId, username, email } = req.body;
    const profileImage = req.file ? req.file.path : null;

    const newUser = new User({ userId, username, email, profileImage });
    await newUser.save();
    
    res.status(201).json({ message: 'User registered successfully', newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/members', async (req, res) => {
  try {
    const users = await User.find().select('-__v');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/update', userCheck, upload.single('profileImage'), async (req, res) => {
  try {
    const { username, email } = req.body;
    let profileImage = req.user.profileImage;
    if (req.file) {
      if (profileImage) fs.unlinkSync(profileImage); 
      profileImage = req.file.path;
    }

    req.user.username = username || req.user.username;
    req.user.email = email || req.user.email;
    req.user.profileImage = profileImage;

    await req.user.save();
    res.json({ message: 'Profile updated successfully', user: req.user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.delete('/delete', userCheck, async (req, res) => {
  try {
    if (req.user.profileImage) fs.unlinkSync(req.user.profileImage); 
    await req.user.deleteOne();

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;