import sdk from 'node-appwrite';

export default async ({ req, res }) => {
  try {
    const { email, password, name, username, avatar } = req.body;
    if (!email || !password || !name || !username) {
      return res.json({ error: 'Email, password, name, and username are required' }, 400);
    }

    const client = new sdk.Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const users = new sdk.Users(client);
    // Check if username exists (assuming you have a user profile collection)
    // ... implement username uniqueness check if needed ...

    // Create user
    const user = await users.create(sdk.ID.unique(), email, password, name);

    // Optionally, store username and avatar in a user profile collection
    // ... implement profile creation if needed ...

    return res.json({ message: 'User created successfully', userId: user.$id }, 201);
  } catch (err) {
    return res.json({ error: err.message }, 500);
  }
};
