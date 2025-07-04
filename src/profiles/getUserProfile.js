import sdk from 'node-appwrite';

export default async ({ req, res }) => {
  try {
    const { userId } = req.body;
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
    return res.json({ profile: profiles.documents[0] }, 200);
  } catch (err) {
    return res.json({ error: err.message }, 500);
  }
};
