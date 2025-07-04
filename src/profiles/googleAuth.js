import sdk from 'node-appwrite';

export default async ({ req, res }) => {
  try {
    // The OAuth login flow is usually handled client-side with Appwrite SDK:
    // account.createOAuth2Session('google', successUrl, failureUrl)
    // This function can be used to fetch user details after login or to link avatar, etc.

    const client = new sdk.Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const account = new sdk.Account(client);
    // Get currently logged-in user info
    const user = await account.get();
    return res.json({ message: 'Google OAuth user fetched', user }, 200);
  } catch (err) {
    return res.json({ error: err.message }, 401);
  }
};
