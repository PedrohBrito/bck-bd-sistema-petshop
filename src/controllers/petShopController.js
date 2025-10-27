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

export const criar = async (req, res) => {
    try {
        // De onde vem os dados para cá? Para eu usar para criar
        const { nome, especie, idade, dono } = req.body

        const dado = req.body

        const camposObrigatorios = ['nome', 'especie']

        const faltando = camposObrigatorios.filter(campo => !dado[campo]);

        if (faltando.length > 0) {
            return res.status(400).json({
                erro: `Os seguintes campos são obrigatórios: ${faltando.join(', ')}.`
            });
        }

        const novoPet = await petShopModel.create(dado);

        res.status(201).json({
            mensagem: 'Pet criado com sucesso!',
            pet: novoPet
        })


    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao criar pet',
            detalhes: error.message
        })
    }
}

export const apagar = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const petExiste = await petShopModel.findById(id);

        if (!petExiste) {
            return res.status(404).json({
                erro: 'Pet não encontrado com esse id',
                id: id
            })
        }

        await petShopModel.deletePet(id)

        res.status(200).json({
            mensagem: 'Pet removido com sucesso',
            PetRemovido: petExiste
        })

    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao apagar pet!',
            detalhes: error.message
        })
    }
}

export const atualizar = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const dados = req.body;

        const petExiste = await petShopModel.findById(id);

        if (!petExiste) {
            return res.status(404).json({
                erro: 'Pet não encontrado com esse id',
                id: id
            })
        }

        const petAtualizado = await petShopModel.update(id, dados);

        res.status(200).json({
            mensagem: 'Pet atualizado com sucesso',
            pet: petAtualizado
        })

    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao atualizar bruxos',
            detalhes: error.message
        })
    }
}