import { Router } from 'express';

import RamalController from './app/controllers/RamalController';
import RamalEspecialController from './app/controllers/RamalEspecialController';
import TipoRamalController from './app/controllers/TipoRamalController';
import LocalizacaoController from './app/controllers/LocalizacaoController';
import VSetorController from './app/controllers/VSetorController';
import SetorController from './app/controllers/SetorController';
import PavimentoController from './app/controllers/PavimentoController';
import SessionController from './app/controllers/SessionController';
import UsuarioConctroller from './app/controllers/UsuarioController';

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
routes.post('/sessions/', SessionController.store);
routes.post('/usuarios/', UsuarioConctroller.store);
routes.delete('/usuarios/', UsuarioConctroller.delete);

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

routes.post('/ramais-especiais', RamalEspecialController.store);
routes.put('/ramais-especiais/:id', RamalEspecialController.update);
routes.delete('/ramais-especiais/:id', RamalEspecialController.delete);

routes.post('/setores', SetorController.store);
routes.put('/setores/:id', SetorController.update);
routes.delete('/setores/:id', SetorController.delete);

routes.post('/ramais', RamalController.store);
routes.put('/ramais/:id', RamalController.update);
routes.delete('/ramais/:id', RamalController.delete);

export default routes;
