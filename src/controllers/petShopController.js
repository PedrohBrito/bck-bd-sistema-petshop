import * as petShopModel from './../models/petShopModel.js'

export const listarTodos = async (req, res) => {
    try {
        const pets = await petShopModel.findAll();


        if (!pets || pets.lenght === 0) {
            res.status(404).json({
                total: pets.lenght,
                mensagem: 'Não há pets na lista',
                pets
            })
        } 

        res.status(200).json({
            total: pets.lenght,
            mensagem: 'Listar pets',
            pets
            })
    } catch (error) {
        res.status(500).json({
            erro: 'Erro interno de servidor',
            detalhes: error.message,
            status: 500
        })
    }
}

export const listarUm = async (req, res) => {
    try {
        const id = req.params.id;
        const pet = await petShopModel.findById(id);

        if (!pet) {
           return res.status(404). json({
                erro: 'Pet não encontrado',
                mensagem: 'Verifique se o id do pet existe',
                id: id
            })
        }

    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao buscar pet por id',
            detalhes: error.message
        })
    }
}
