const express = require('express');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');
const { createDish, getDishes, updateDish, deleteDish } = require('../controllers/dishController');
const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['admin']), createDish);
router.get('/', getDishes);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), updateDish);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteDish);

module.exports = router;
