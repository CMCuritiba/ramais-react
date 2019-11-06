import passport from 'passport';

import services from '../services/session';

class SessionController {
  async store(req, res, next) {
    const handler = await passport.authenticate('ldap', async function process(
      err,
      user,
      info
    ) {
      try {
        const authUser = await services.Create.run(err, user, info);
        return res.json(authUser);
      } catch (err) {
        if (err.message === 'Not authorized') {
          return res.status(401).json({ error: err.message });
        } else {
          return res.status(500).json({ error: err.message });
        }
      }
    });

    return handler(req, res, next);
  }
}

export default new SessionController();
