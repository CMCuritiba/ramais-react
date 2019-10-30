import jwt from 'jsonwebtoken';

import LdapStrategy from 'passport-ldapauth';

import authConfig from './auth';

module.exports = function config(passport) {
  passport.use(
    'ldap',
    new LdapStrategy(
      {
        usernameField: 'username',
        server: {
          url: 'ldap://ldap',
          searchBase: 'ou=Usuarios,dc=pr,dc=gov,dc=br',
          searchFilter: '(uid={{username}})',
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
