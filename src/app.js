import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes.js';

/* Importando a conexão co o banco de dados */
import './app/db/conexao.js';

/* Função construtora para invocar o express */
function App() {
    this.app = express();
    this.middlewares();
    this.routes();
}

App.prototype.middlewares = function() {
    this.app.use(bodyParser.urlencoded({
        extended: true
    }));
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.use(helmet());
};

App.prototype.routes = function() {
    this.app.use('/api', routes);
};

export default new App().app;
