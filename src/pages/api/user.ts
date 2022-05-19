import type { NextApiResponse } from 'next';
import { withSession } from '@utils/session';

const handler = async (req: any, res: NextApiResponse) => {
  const currentAccount = req.session.get('ACCOUNT');
  if (currentAccount) {
    res.json({ data: { isLoggedIn: true, ...currentAccount } });
  } else {
    res.json({ data: { isLoggedIn: false } });
  }
};

export default withSession(handler);
