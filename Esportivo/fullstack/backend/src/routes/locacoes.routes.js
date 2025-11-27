const locacaoControllers = require('../controllers/locacoes.controllers');

const express = require('express');


const locRoutes = express.Router();


locRoutes.post('/loc/register', locacaoControllers.createLocacao);
locRoutes.get('/loc/list', locacaoControllers.listarLocacao);
locRoutes.put('/loc/update/:id_locacao', locacaoControllers.editLocacao);
locRoutes.delete('/loc/delet/:id_locacao',  locacaoControllers.deleteLocacao);

locRoutes.get('/loc/total', locacaoControllers.totallocequip);

module.exports = locRoutes;