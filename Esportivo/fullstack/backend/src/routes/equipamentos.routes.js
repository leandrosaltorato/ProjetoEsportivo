const equipamentoController = require('../controllers/equipamento.controllers');

const express = require('express');


const equipRoutes = express.Router();


equipRoutes.post('/equip/register', equipamentoController.createEquip);
equipRoutes.get('/equip/list', equipamentoController.listEquip);
equipRoutes.put('/equip/update/:id_equipamento', equipamentoController.editEquip);
equipRoutes.delete('/equip/delet/:id_equipamento', equipamentoController.deleteEquip);

equipRoutes.get('/equip/total', equipamentoController.totalPorCategoria);

module.exports = equipRoutes;