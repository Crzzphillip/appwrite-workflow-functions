import sdk from 'node-appwrite';

export default async ({ req, res }) => {
  try {
    const { userId, email } = req.body;
    if (!userId || !email) return res.json({ error: 'userId and email are required' }, 400);

    const client = new sdk.Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const users = new sdk.Users(client);
    await users.createVerification(userId, email, 'https://your-frontend-url/verify');
    return res.json({ message: 'Verification email sent' }, 200);
  } catch (err) {
    return res.json({ error: err.message }, 500);
  }
};
