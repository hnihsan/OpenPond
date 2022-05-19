import { NextApiResponse } from 'next';
import { withSession } from '@utils/session';

const handler = async (req: any, res: NextApiResponse) => {
  try {
    req.session.set('ACCOUNT', req.body);
    await req.session.save();
    res.json({ isLoggedIn: true });
  } catch (error) {
    console.log(error)
    res.status(error.status).json(error);
  }
};

export default withSession(handler);
