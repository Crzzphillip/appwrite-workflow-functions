import sdk from 'node-appwrite';

export default async ({ req, res }) => {
  try {
    const client = new sdk.Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const databases = new sdk.Databases(client);
    const databaseId = process.env.USER_PROFILE_DATABASE_ID;
    const collectionId = process.env.USER_PROFILE_COLLECTION_ID;

    // Optionally, add pagination or filtering here
    const profiles = await databases.listDocuments(databaseId, collectionId);
    return res.json({ profiles: profiles.documents }, 200);
  } catch (err) {
    return res.json({ error: err.message }, 500);
  }
};
