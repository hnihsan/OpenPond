import type { NextApiResponse } from 'next';
import { withSession } from '@utils/session';

const handler = async (req: any, res: NextApiResponse) => {
  const address = req.session.get('ADDRESS');
  if (address) {
    res.json({ data: { isLoggedIn: true, address } });
  } else {
    res.json({ data: { isLoggedIn: false } });
  }
};

export default withSession(handler);
