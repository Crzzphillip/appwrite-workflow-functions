import sdk from 'node-appwrite';

export default async ({ req, res }) => {
  try {
    const { sessionId } = req.body;
    if (!sessionId) return res.json({ error: 'sessionId is required' }, 400);

    const client = new sdk.Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const account = new sdk.Account(client);
    await account.deleteSession(sessionId);
    return res.json({ message: 'Logged out successfully' }, 200);
  } catch (err) {
    return res.json({ error: err.message }, 500);
  }
};
