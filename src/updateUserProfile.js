import sdk from 'node-appwrite';

export default async ({ req, res }) => {
  try {
    const { userId, username, avatarFileId } = req.body;
    if (!userId) return res.json({ error: 'userId is required' }, 400);

    const client = new sdk.Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const databases = new sdk.Databases(client);
    const databaseId = process.env.USER_PROFILE_DATABASE_ID;
    const collectionId = process.env.USER_PROFILE_COLLECTION_ID;

    // Find profile by userId
    const profiles = await databases.listDocuments(databaseId, collectionId, [
      sdk.Query.equal('userId', userId)
    ]);
    if (profiles.total === 0) {
      return res.json({ error: 'Profile not found' }, 404);
    }
    const profile = profiles.documents[0];

    // If username is being updated, check for uniqueness
    if (username && username !== profile.username) {
      const existing = await databases.listDocuments(databaseId, collectionId, [
        sdk.Query.equal('username', username)
      ]);
      if (existing.total > 0) {
        return res.json({ error: 'Username already taken' }, 409);
      }
    }

    // Update profile
    const updated = await databases.updateDocument(
      databaseId,
      collectionId,
      profile.$id,
      {
        ...(username && { username }),
        ...(avatarFileId && { avatarFileId })
      }
    );
    return res.json({ message: 'Profile updated', profile: updated }, 200);
  } catch (err) {
    return res.json({ error: err.message }, 500);
  }
};
