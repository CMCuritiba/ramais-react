import jwt from 'jsonwebtoken';

import Usuario from '../../models/Usuario';
import authConfig from '../../../config/auth';

class Create {
  async run(err, user, info) {
    if (err) {
      throw new Error(err);
    }
    if (info) {
      throw new Error(info);
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
      return { usuario, token };
    }

    return { usuario };
  }
}

export default new Create();
