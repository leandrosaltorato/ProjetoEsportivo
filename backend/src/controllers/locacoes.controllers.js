const dataPosts = require("../data/connection");

const createLocacao = async (req, res) => {
    try {
        const { id_aluno, id_equipamento,data_locacao, data_devolucao } = req.body;

        const resultado = await dataPosts.query(
            "INSERT INTO locacoes VALUES (DEFAULT, ?, ?, ?, ?)",
            [id_aluno, id_equipamento, data_locacao, data_devolucao]
        );

        const novaLocacao = {
            id: resultado[0].insertId,
            id_aluno: id_aluno,
            id_equipamento: id_equipamento,
            data_locacao: data_locacao,
            data_devolucao: data_devolucao
        };

        res.status(201).json(novaLocacao);
    } catch (error) {
        console.error("Erro ao criar locacao:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
};


const editLocacao = async (req, res) => {
    const { id_aluno, id_equipamento, data_locacao, data_devolucao } = req.body;
    const { id_locacao } = req.params;

    try {
        const update = await dataPosts.query(
            "UPDATE locacoes SET id_aluno = ?, id_equipamento = ?, data_locacao = ?, data_devolucao = ? WHERE id_loc = ?",
            [id_aluno, id_equipamento, data_locacao, data_devolucao, id_locacao]
        );

        if (update[0].affectedRows === 1) {
            res.status(200).json({ msg: "Locacao atualizada com sucesso." });
        } else {
            res.status(404).json({ msg: "Locacao não encontrada." });
        }
    } catch (error) {
        console.error("Erro ao atualizar locacao", error);
        res.status(500).json({ msg: "Erro interno no servidor." });
    }
};

const listarLocacao = async (req, res) => {
    try {
        const lista = await dataPosts.query("SELECT * FROM locacoes;");
        res.status(200).json(lista[0]);
    } catch (error) {
        console.error("Erro ao listar locações", error);
        res.status(500).json({ msg: "Erro interno no servidor" });
    }
};


const deleteLocacao = async (req, res) => {
    const { id_locacao } = req.params;

    try {
        const remove = await dataPosts.query("DELETE FROM locacoes WHERE id_loc = ?", [id_locacao]);

        if (remove[0].affectedRows === 1) {
            res.status(200).json({ msg: "Locacao removida com sucesso." });
        } else {
            res.status(404).json({ msg: "Locacao não encontrada." });
        }
    } catch (error) {
        console.error("Erro ao remover locacao", error);
        const err = { msg: "" };
        if (error.errno === 1451) {
            err.msg = "Não é possível excluir esta locacao, pois está vinculada a outros dados.";
        } else {
            err.msg = "Erro interno no servidor.";
        }

        res.status(500).json(err);
    }
};

const totallocequip = async (req, res) => {
    try {
        const total = await dataPosts.query(
            `SELECT nome, COUNT(*) AS total
            FROM equipamentos e
            JOIN locacoes l ON l.id_equipamento = e.id_equipamento
            GROUP BY nome;`
        );

        res.status(200).json(total[0]);
    } catch (error) {
        console.error("Erro ao buscar total de locacoes", error);
        res.status(500).json({ msg: "Erro interno no servidor" });
    }
};




module.exports = {
    createLocacao,
    listarLocacao,
    deleteLocacao,
    editLocacao,
    totallocequip
}