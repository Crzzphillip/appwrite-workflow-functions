import sdk from 'node-appwrite';

export default async ({ req, res }) => {
  try {
    const { userId, username, avatarFileId } = req.body;
    if (!userId || !username) {
      return res.json({ error: 'userId and username are required' }, 400);
    }

    const client = new sdk.Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const databases = new sdk.Databases(client);
    // Replace with your actual database and collection IDs
    const databaseId = process.env.USER_PROFILE_DATABASE_ID;
    const collectionId = process.env.USER_PROFILE_COLLECTION_ID;

    // Check for unique username
    const existing = await databases.listDocuments(databaseId, collectionId, [
      sdk.Query.equal('username', username)
    ]);
    if (existing.total > 0) {
      return res.json({ error: 'Username already taken' }, 409);
    }

    // Create user profile document
    const doc = await databases.createDocument(
      databaseId,
      collectionId,
      sdk.ID.unique(),
      {
        userId,
        username,
        avatarFileId: avatarFileId || null
      }
    );
    return res.json({ message: 'User profile created', profile: doc }, 201);
  } catch (err) {
    return res.json({ error: err.message }, 500);
  }
};
