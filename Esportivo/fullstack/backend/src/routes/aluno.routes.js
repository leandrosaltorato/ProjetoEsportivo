const alunoControllers = require('../controllers/aluno.controller');

const express = require('express');


const alunoRoutes = express.Router();

alunoRoutes.post('/alu/create', alunoControllers.cadastrarAluno);
alunoRoutes.get('/alu/list', alunoControllers.listarAluno);
alunoRoutes.delete('/alu/delete/:id_aluno', alunoControllers.deletAluno);
alunoRoutes.put('/alu/edit/:id', alunoControllers.editAluno);

alunoRoutes.get('/alu/total', alunoControllers.totaldeloc);


module.exports = alunoRoutes;