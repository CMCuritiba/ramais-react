import { Router } from 'express';

import RamalController from './app/controllers/RamalController';
import RamalEspecialController from './app/controllers/RamalEspecialController';
import TipoRamalController from './app/controllers/TipoRamalController';
import LocalizacaoController from './app/controllers/LocalizacaoController';
import VSetorController from './app/controllers/VSetorController';
import SetorController from './app/controllers/SetorController';
import PavimentoController from './app/controllers/PavimentoController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

/**
 * Rotas sem autenticação
 */
routes.get('/', RamalController.index);
routes.get('/tipos-ramal', TipoRamalController.index);
routes.get('/localizacoes', LocalizacaoController.index);
routes.get('/pavimentos', PavimentoController.index);
routes.get('/vsetores', VSetorController.index);
routes.get('/setores', SetorController.index);
routes.get('/ramais', RamalController.index);
routes.get('/ramais-especiais', RamalEspecialController.index);

/**
 * Rotas com autenticação
 */
routes.use(authMiddleware);

routes.post('/localizacoes', LocalizacaoController.store);
routes.put('/localizacoes/:id', LocalizacaoController.update);
routes.delete('/localizacoes/:id', LocalizacaoController.delete);

routes.post('/pavimentos', PavimentoController.store);
routes.put('/pavimentos/:id', PavimentoController.update);
routes.delete('/pavimentos/:id', PavimentoController.delete);

export default routes;
