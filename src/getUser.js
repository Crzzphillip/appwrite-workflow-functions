import sdk from 'node-appwrite';

export default async ({ req, res }) => {
  try {
    const client = new sdk.Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const account = new sdk.Account(client);
    const user = await account.get();
    return res.json({ data: user }, 200);
  } catch (err) {
    return res.json({ data: null, error: err.message }, 200);
  }
};
