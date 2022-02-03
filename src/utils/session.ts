import { NextApiHandler } from 'next';
import { withIronSession } from 'next-iron-session';

export const withSession = (handler: NextApiHandler) => {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: 'open-pond',
    cookieOptions: {
      // the next line allows to use the session in non-https environments like
      // Next.js dev mode (http://localhost:3000)

      //   PRODUCTION => true will work on https protocol
      //   secure: process.env.NODE_ENV === 'production' ? true : false,

      secure: process.env.NODE_ENV === 'production' ? false : false,
    },
  });
};
