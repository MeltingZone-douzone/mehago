const express = require('express');
const controller = require('../controllers/message');

const router = express.Router();
// router.route('/:startNo((\\d+)?)').get(controller.read);
// router.route('/:no').delete(controller.delete);
router.route('/addMessage').post(controller.addMessage);
router.route('/updateRead').post(controller.updateRead);
router.route('/joinParticipant').post(controller.joinParticipant);

module.exports = router;