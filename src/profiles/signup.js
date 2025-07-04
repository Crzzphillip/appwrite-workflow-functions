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
    const databases = new sdk.Databases(client);
    const storage = new sdk.Storage(client);

    const databaseId = process.env.APPWRITE_DATABASE_ID; // e.g. 'spacevally'
    const profilesCollectionId = process.env.APPWRITE_PROFILES_COLLECTION_ID || 'profiles'; // e.g. 'profiles'
    const avatarBucketId = process.env.APPWRITE_BUCKET_ID; // e.g. 'avatars'

    // 1. Check if username exists
    const usernameQuery = [sdk.Query.equal('username', username)];
    const existingProfiles = await databases.listDocuments(databaseId, profilesCollectionId, usernameQuery);
    if (existingProfiles.total > 0) {
      return res.json({ error: 'Username already exists' }, 409);
    }

    // 2. Create user
    const user = await users.create(sdk.ID.unique(), email, password, name);

    // 3. Optionally upload avatar
    let avatarFileId = null;
    if (avatar) {
      const buffer = Buffer.from(avatar, 'base64');
      const file = await storage.createFile(
        avatarBucketId,
        sdk.ID.unique(),
        buffer,
        'image/png' // or detect type if needed
      );
      avatarFileId = file.$id;
    }

    // 4. Create user profile document
    await databases.createDocument(
      databaseId,
      profilesCollectionId,
      sdk.ID.unique(),
      {
        userId: user.$id,
        username,
        avatarFileId,
        name,
        email
      }
    );

    return res.json({ message: 'User created successfully', userId: user.$id }, 201);
  } catch (err) {
    return res.json({ error: err.message }, 500);
  }
};
