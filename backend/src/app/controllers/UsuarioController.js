import authConfig from '../../config/auth';

import Usuario from '../models/Usuario';

class UsuarioController {
  async store(req, res) {
    const { key, username } = req.body;

    if (key === authConfig.secret) {
      try {
        const usuarioAdmin = await Usuario.findOne({ username });
        usuarioAdmin.update({ is_admin: true });
        return res.json(usuarioAdmin);
      } catch (err) {
        return res.status(400).json({ err });
      }
    }
    return res.status(400).json({ error: 'Chave secreta inválida' });
  }

  async delete(req, res) {
    const { key, username } = req.body;

    if (key === authConfig.secret) {
      try {
        const usuarioAdmin = await Usuario.findOne({ username });
        usuarioAdmin.update({ is_admin: false });
        return res.json(usuarioAdmin);
      } catch (err) {
        return res.status(400).json({ err });
      }
    }
    return res.status(400).json({ error: 'Chave secreta inválida' });
  }
}

export default new UsuarioController();
