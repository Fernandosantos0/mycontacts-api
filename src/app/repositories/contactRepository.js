import { ObjectId } from 'mongodb';
import client from '../db/conexao.js';

class contactRepository {
    async create(body) {
        const dados = {
            nome: body.nome.trim() || '',
            sobrenome: body.sobrenome.trim() || '',
            telefone: body.telefone.trim() || '',
            email: body.email.trim() || '',
            created_at: new Date(),
            updated_at: new Date(),
        }

        const row = await client.db().collection('contacts').insertOne(dados);
        return row;
    }

    async findAll() {
        const row = await client.db().collection('contacts').find().toArray();
        return row
    }

    async findOne(id) {
        const row = await client.db().collection('contacts').findOne({ _id: ObjectId.createFromHexString(id) });
        return row;
    }

    async delete(id) {
        const row = await client.db().collection('contacts').findOneAndDelete({ _id: ObjectId.createFromHexString(id) });
        return row;
    }

    async update(id, body) {
        body['updated_at'] = new Date();

        for(let key in body) {
            if(key === 'created_at' || key === 'updated_at') continue;
            body[key] = body[key].toString().trim();
        }

        const row = await client.db().collection('contacts').updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: body });

        return row;
    }

    async findByEmail(email) {
        const row = await client.db().collection('contacts').findOne({ email: email });
        return row;
    }
}

export default new contactRepository();
