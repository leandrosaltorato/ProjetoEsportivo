const db = require("../data/connection");


const cadastrarAluno = async (req, res) => {
    const { nome, turma } = req.body;

    try {

        const resultado = await db.query("INSERT INTO alunos VALUES (DEFAULT, ?, ?)", [nome, turma]);

        const novoAluno = {
            id: resultado[0].insertId,
            nome: nome,
            turma: turma
        };

        res.status(201).json(novoAluno).end();
    } catch (error) {
        res.status(500).json(error).end();
    }
};

const listarAluno = async (req, res) => {
    const lista = await db.query("SELECT * FROM alunos;");
    res.json(lista[0]).end();
}

const editAluno = async (req, res) => {
    const { nome, turma } = req.body;
    const { id } = req.params;

    try {
        const [result] = await db.query(
            "UPDATE alunos SET nome = ?, turma = ? WHERE id_aluno = ?",
            [nome, turma, id]
        );

        if (result.affectedRows === 1 && result.changedRows === 1) {
            res.status(200).json({ msg: "Aluno atualizado com sucesso." });
        } else if (result.affectedRows === 1 && result.changedRows === 0) {
            res.status(200).json({ msg: "Nenhuma alteração realizada." });
        } else {
            res.status(404).json({ msg: "Aluno não encontrado." });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Erro interno no servidor." });
    }
};
const deletAluno = async (req, res) => {
    const id = req.params.id_aluno;

    try {
        const remove = await db.query("DELETE FROM alunos WHERE id_aluno = ?", [id]);

        console.log(remove);

        res.status(200).end();
    } catch (error) {
        console.log(error);
        const err = { msg: "" };

        if (error.errno === 1451) {
            err.msg = "erro";
        }

        res.status(500).json(err).end();
    }
};

const totaldeloc = async (req, res) => {
    const { nome } = req.query;

    try {
        const hist = await db.query(
            `SELECT nome, COUNT(*) AS total
            FROM alunos a
            JOIN locacoes l ON l.id_aluno = a.id_aluno
            GROUP BY nome;`,
        );

        res.status(200).json(hist[0]);
    } catch (error) {
        console.error("Erro ao buscar", error);
        res.status(500).json({ msg: "Erro interno no servidor." });
    }
};






module.exports = {
    cadastrarAluno,
    listarAluno,
    editAluno,
    deletAluno,
    totaldeloc
}