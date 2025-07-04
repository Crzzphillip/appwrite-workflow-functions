import sdk from 'node-appwrite';

export default async ({ req, res }) => {
  try {
    const { userId, secret } = req.body;
    if (!userId || !secret) return res.json({ error: 'userId and secret are required' }, 400);

    const client = new sdk.Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const users = new sdk.Users(client);
    await users.updateVerification(userId, secret);
    return res.json({ message: 'Email verified' }, 200);
  } catch (err) {
    return res.json({ error: err.message }, 500);
  }
};
