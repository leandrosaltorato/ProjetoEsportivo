const dataPosts = require("../data/connection");

const createEquip = async (req, res) => {
    try {
        const { nome, categoria, quantidade } = req.body;

        const resultado = await dataPosts.query(
            "INSERT INTO equipamentos VALUES (DEFAULT, ?, ?, ?)",
            [nome, categoria, quantidade]
        );

        const novoEquip = {
            id: resultado[0].insertId,
            nome: nome,
            categoria: categoria,
            quantidade: quantidade
        };

        res.status(201).json(novoEquip).end();

    } catch (error) {
        console.error("Erro ao cadastrar:", error);
        res.status(500).json({ error: "Erro interno no servidor" }).end();
    }
};


const editEquip = async (req, res) => {
    const { nome, categoria, quantidade } = req.body;
    const { id_equipamento } = req.params;

    try {
        const update = await dataPosts.query("UPDATE equipamentos SET nome = ?, categoria = ?, quantidade = ? WHERE id_equipamento = ?",
            [nome, categoria, quantidade, id_equipamento]);

        if (update[0].affectedRows === 1) {
            res.status(200).json({ msg: "Equipamento atualizado com sucesso." });
        } else {
            res.status(404).json({ msg: "Equipamento não encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Erro interno no servidor." });
    }
}

const listEquip = async (req, res) => {
    const lista = await dataPosts.query("SELECT * FROM equipamentos;");
    res.json(lista[0]).end();
}


const deleteEquip = async (req, res) => {
    const id = req.params.id_equipamento;

    try {
        const remove = await dataPosts.query("DELETE FROM equipamentos WHERE id_equipamento = ?", [id]);

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

const totalPorCategoria = async (req, res) => {
    try {
        const resultado = await dataPosts.query(
            `SELECT categoria, COUNT(*) AS total
            FROM equipamentos e
            JOIN locacoes l ON l.id_equipamento = e.id_equipamento
            GROUP BY categoria;`
        );

        res.status(200).json(resultado[0]);
    } catch (error) {
        console.error("Erro ao buscar categorias", error);
        res.status(500).json({ msg: "Erro interno no servidor." });
    }
};



module.exports = {
    createEquip,
    listEquip,
    deleteEquip,
    editEquip,
    totalPorCategoria
}