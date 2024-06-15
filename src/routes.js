import { Router } from 'express';

const routes = new Router();

/* Importando o controller */
import contactController from './app/controllers/ContactController.js';

/* Routes */
routes.get('/', contactController.index);
routes.get('/:id', contactController.getContact);
routes.post('/', contactController.store);
routes.delete('/:id', contactController.delete);
routes.patch('/:id', contactController.edit);

export default routes;
