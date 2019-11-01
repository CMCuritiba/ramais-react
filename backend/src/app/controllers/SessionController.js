import passport from 'passport';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

import Usuario from '../models/Usuario';

class SessionController {
  async store(req, res, next) {
    const handler = await passport.authenticate('ldap', async function process(
      err,
      user,
      info
    ) {
      if (err) {
        return res.status(500).json(err);
      }
      if (info) {
        return res.status(401).json(info);
      }

      const usuarioObj = {
        username: user.uid,
        nome: user.cn,
        elotech_id: user.employeeNumber,
        email: user.mail,
      };

      const usuarioExiste = await Usuario.findOne({
        where: { username: user.uid },
      });

      let usuario = null;

      if (!usuarioExiste) {
        usuario = await Usuario.create(usuarioObj);
      } else {
        usuario = await usuarioExiste.update(usuarioObj);
      }

      if (usuario.is_admin) {
        const token = jwt.sign(
          {
            userId: usuario.id,
            userName: usuario.username,
          },
          authConfig.secret,
          {
            expiresIn: authConfig.expiresIn,
          }
        );
        return res.json({ usuario, token });
      }

      return res.status(200).json({ usuario });
    });

    return handler(req, res, next);
  }
}

export default new SessionController();
