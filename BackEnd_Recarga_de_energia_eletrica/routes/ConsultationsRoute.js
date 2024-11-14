const express = require('express');
const router = express.Router();
const consultationsController = require('../controllers/ConsultationsController');
const authMiddleware = require('../middleware/auth');

router.get('/consultations', consultationsController.getAllConsultations);
router.post('/consultations', authMiddleware, consultationsController.createConsultation);
router.put('/consultations/:id', authMiddleware, consultationsController.updateConsultation);
router.get('/user-role', consultationsController.getUserRole);

module.exports = router;