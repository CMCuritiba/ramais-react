import { Router } from 'express';

import RamalController from './app/controllers/RamalController';

const routes = new Router();

// Definição de rotas
routes.get('/', RamalController.index)

export default routes;
