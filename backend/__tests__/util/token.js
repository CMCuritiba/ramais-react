import jwt from 'jsonwebtoken';

import authConfig from '../../src/config/auth';

const user = {
  userId: 1,
  userName: 'Zaca',
};

const token = jwt.sign(user, authConfig.secret, {
  expiresIn: authConfig.expiresIn,
});

export default token;
