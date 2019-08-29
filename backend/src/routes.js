import { Router } from 'express';

import RamalController from './app/controllers/RamalController';
import TipoRamalController from './app/controllers/TipoRamalController';
import LocalizacaoController from './app/controllers/LocalizacaoController';
import VSetorController from './app/controllers/VSetorController';
import SetorController from './app/controllers/SetorController';

const routes = new Router();

/**
 * Rotas sem autenticação
 */
routes.get('/', RamalController.index);
routes.get('/tipos-ramal', TipoRamalController.index);
routes.get('/localizacoes', LocalizacaoController.index);
routes.get('/vsetores', VSetorController.index);
routes.get('/setores', SetorController.index);
routes.get('/ramais', RamalController.index);

/**
 * Rotas com autenticação
 */

export default routes;
