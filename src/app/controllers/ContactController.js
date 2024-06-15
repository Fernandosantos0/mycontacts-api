import contactRepository from '../repositories/contactRepository.js';
import validator from 'validator';

class ContactController {
    async index(req, res) {
        try {
            const contacts = await contactRepository.findAll();

            return res.status(200).json(contacts);
        } catch(e) {
            console.error(e);
            return res.status(400).json({
                error: e
            })
        }
    }

    async getContact(req, res) {
        try {
            const { id } = req.params;
            const contact = await contactRepository.findOne(id);

            return res.status(200).json(contact);
        } catch(e) {
            console.error(e);
            return res.status(400).json({
                error: e
            })
        }
    }

    async store(req, res) {
        try {
            if(!req.body.nome) {
                return res.status(400).json({
                    msg: 'O campo nome é obrigatório'
                });
            }

            if(!req.body.email) {
                return res.status(400).json({
                    msg: 'O campo email é obrigatório'
                });
            }

            if(!validator.isEmail(req.body.email)) {
                return res.status(400).json({
                    msg: 'E-mail inválido'
                });
            }

            if(await contactRepository.findByEmail(req.body.email)) {
                return res.status(400).json({
                    msg: 'Esse email já foi cadastrado'
                });
            }

            const row = await contactRepository.create(req.body);
            return res.status(201).json(row);
        } catch(e) {
            console.error(e);
            return res.status(400).json({
                error: e
            })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const contact = await contactRepository.delete(id);

            return res.status(200).json(contact);
        } catch(e) {
            console.error(e);
            return res.status(400).json({
                error: e
            })
        }
    }

    async edit(req, res) {
        try {
            if(req.body.email && !validator.isEmail(req.body.email)) {
                return res.status(400).json({
                    msg: 'E-mail inválido'
                });
            }

            if(req.body.email && await contactRepository.findByEmail(req.body.email)) {
                return res.status(400).json({
                    msg: 'Esse email já foi cadastrado'
                });
            }

            const { id } = req.params;
            const contact = await contactRepository.update(id, req.body);

            return res.status(200).json(contact);
        } catch(e) {
            console.error(e);
            return res.status(400).json({
                error: e
            })
        }
    }
}

export default new ContactController();
