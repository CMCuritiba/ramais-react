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

import tipoRamalValidator from './app/validators/TipoRamalValidator';
import localizacaoValidator from './app/validators/LocalizacaoValidator';
import sessionStoreValidator from './app/validators/SessionStore';
import setorValidator from './app/validators/SetorValidator';
import ramalEspecialValidator from './app/validators/RamalEspecialValidator';

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
routes.post('/sessions/', sessionStoreValidator, SessionController.store);
routes.post('/usuarios/', UsuarioConctroller.store);
routes.delete('/usuarios/', UsuarioConctroller.delete);

/**
 * Rotas com autenticação
 */
routes.use(authMiddleware);

routes.post('/tipos-ramal', tipoRamalValidator, TipoRamalController.store);
routes.put('/tipos-ramal/:id', tipoRamalValidator, TipoRamalController.update);
routes.delete('/tipos-ramal/:id', TipoRamalController.delete);

routes.post('/localizacoes', localizacaoValidator, LocalizacaoController.store);
routes.put(
  '/localizacoes/:id',
  localizacaoValidator,
  LocalizacaoController.update
);
routes.delete('/localizacoes/:id', LocalizacaoController.delete);

routes.post('/pavimentos', PavimentoController.store);
routes.put('/pavimentos/:id', PavimentoController.update);
routes.delete('/pavimentos/:id', PavimentoController.delete);

routes.post(
  '/ramais-especiais',
  ramalEspecialValidator,
  RamalEspecialController.store
);
routes.put(
  '/ramais-especiais/:id',
  ramalEspecialValidator,
  RamalEspecialController.update
);
routes.delete('/ramais-especiais/:id', RamalEspecialController.delete);

routes.post('/setores', setorValidator, SetorController.store);
routes.put('/setores/:id', setorValidator, SetorController.update);
routes.delete('/setores/:id', SetorController.delete);

routes.post('/ramais', RamalController.store);
routes.put('/ramais/:id', RamalController.update);
routes.delete('/ramais/:id', RamalController.delete);

export default routes;
