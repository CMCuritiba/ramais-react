import jwt from 'jsonwebtoken';

import LdapStrategy from 'passport-ldapauth';

import authConfig from './auth';

require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

module.exports = function config(passport) {
  passport.use(
    'ldap',
    new LdapStrategy(
      {
        usernameField: 'username',
        server: {
          url: process.env.LDAP_SERVER,
          searchBase: process.env.LDAP_SEARCH_BASE,
          searchFilter: process.env.LDAP_SEARCH_FILTER,
        },
      },

      function process(profile, done) {
        if (profile) {
          return done(null, {
            uid: profile.uid,
            displayName: profile.displayName,
            sn: profile.sn,
            cn: profile.cn,
            givenName: profile.givenName,
            mail: profile.mail,
            employeeNumber: profile.employeeNumber,
            gidNumber: profile.gidNumber,
            token: jwt.sign(
              { employeeNumber: profile.employeeNumber },
              authConfig.secret,
              {
                expiresIn: authConfig.expiresIn,
              }
            ),
          });
        }
        return done(null, false);
      }
    )
  );

  passport.serializeUser(function serialize(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function deserialize(user, done) {
    done(null, user);
  });
};
