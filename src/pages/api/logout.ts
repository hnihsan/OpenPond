import { withSession } from '@utils/session';

export const handler = (req: any, res: any) => {
  req.session.destroy();

  res.json({ isLoggedIn: false });
};

export default withSession(handler);
