import sdk from 'node-appwrite';

export default async ({ req, res }) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ error: 'Email and password are required' }, 400);
    }

    const client = new sdk.Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const account = new sdk.Account(client);
    // Create session (login)
    const session = await account.createEmailSession(email, password);
    return res.json({ message: 'User logged in successfully', sessionId: session.$id }, 200);
  } catch (err) {
    return res.json({ error: err.message }, 401);
  }
};
