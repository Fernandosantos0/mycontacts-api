import { MongoClient } from 'mongodb';
import colors from 'colors';

const client = new MongoClient('mongodb://localhost:27017/mycontacts');

async function conexao() {
    try {
        await client.connect();
        console.log('Conexão com o banco de dados realizado com sucesso'.blue.bold);
    } catch(e) {
        console.log('Não foi possível realizar a conexão com o banco de dados'.red.bold);
        console.error(e);
    }
}

conexao();

export default client;
