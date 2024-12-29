const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.post('/', itemController.create);
router.get('/item', itemController.getAll);
router.get('/item/:id', itemController.getById);
router.put('/items/:id', itemController.update);
router.delete('/items/delete/:id', itemController.delete);

module.exports = router;
