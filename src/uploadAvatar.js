import sdk from 'node-appwrite';

export default async ({ req, res }) => {
  try {
    const { userId, avatarBase64, avatarFilename } = req.body;
    if (!userId || !avatarBase64 || !avatarFilename) {
      return res.json({ error: 'userId, avatarBase64, and avatarFilename are required' }, 400);
    }

    const client = new sdk.Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const storage = new sdk.Storage(client);
    // Convert base64 to Buffer
    const base64Data = avatarBase64.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    // Create a readable stream from buffer (Node.js 18+)
    const { Readable } = await import('stream');
    const stream = Readable.from(buffer);
    // Upload file to bucket (replace 'avatars' with your bucket ID)
    const file = await storage.createFile(
      'avatars',
      'unique()',
      stream,
      avatarFilename,
      'image/png'
    );
    // Optionally update user profile collection with avatar file ID
    return res.json({
      message: 'Avatar uploaded successfully',
      userId,
      fileId: file.$id,
      fileUrl: file.$read
    }, 201);
  } catch (err) {
    return res.json({ error: err.message }, 500);
  }
};
