const express = require('express');
const { getUsers, getUserById, updateUser, deleteUser } = require('../controller/userController');
const { authmiddleware } = require('../middleware/authMiddleware');
const router = express.Router();
router.get('/user',authmiddleware, getUserById);
router.put('/update/:id',authmiddleware, updateUser);
router.delete('/delete/:id',authmiddleware, deleteUser);

module.exports = router;
