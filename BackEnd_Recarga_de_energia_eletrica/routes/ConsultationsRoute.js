const express = require('express');
const router = express.Router();
const consultationsController = require('../controllers/ConsultationsController');
const authMiddleware = require('../middleware/auth');

router.get('/consultations', consultationsController.getAllConsultations);
router.post('/consultations', authMiddleware, consultationsController.createConsultation);
router.put('/consultations/:id', authMiddleware, consultationsController.updateConsultation);
router.delete('/consultations/:id', authMiddleware, consultationsController.deleteConsultation);
router.get('/user-role', consultationsController.getUserRole);

// Backend - Exemplo de rota de atualização
app.put("/consultations/:id", async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
  
    try {
      const updated = await ConsultationModel.update(updatedData, { where: { id } });
      if (updated) {
        res.status(200).json({ message: "Consulta atualizada com sucesso!" });
      } else {
        res.status(404).json({ message: "Consulta não encontrada!" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar consulta", error });
    }
  });

module.exports = router;