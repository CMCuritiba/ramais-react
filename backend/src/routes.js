import { Router } from 'express';

import RamalController from './app/controllers/RamalController';
import TipoRamalController from './app/controllers/TipoRamalController';
import LocalizacaoController from './app/controllers/LocalizacaoController';

const routes = new Router();

/**
 * Rotas sem autenticação
 */
routes.get('/', RamalController.index);
routes.get('/tipos-ramal', TipoRamalController.index);
routes.get('/localizacoes', LocalizacaoController.index);

/**
 * Rotas com autenticação
 */

export default routes;
