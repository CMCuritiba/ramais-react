import passport from 'passport';

import CreateSessionService from '../services/CreateSessionService';

class SessionController {
  async store(req, res, next) {
    const handler = await passport.authenticate('ldap', async function process(
      err,
      user,
      info
    ) {
      const authUser = await CreateSessionService.run(err, user, info);

      return res.json(authUser);
    });

    return handler(req, res, next);
  }
}

export default new SessionController();
