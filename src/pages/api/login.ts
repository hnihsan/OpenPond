import { NextApiResponse } from 'next';
import { withSession } from '@utils/session';

const handler = async (req: any, res: NextApiResponse) => {
  try {
    const { address } = req.body;
    req.session.set('ADDRESS', address);
    await req.session.save();
    res.json({ isLoggedIn: true });
  } catch (error) {
    res.status(error.status).json(error);
  }
};

export default withSession(handler);
