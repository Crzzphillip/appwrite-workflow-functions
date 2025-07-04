// Utility for Appwrite client setup
const sdk = require('appwrite');

const client = new sdk.Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT) // e.g., 'https://cloud.appwrite.io/v1'
  .setProject(process.env.APPWRITE_PROJECT_ID); // e.g., 'your-project-id'

// If you need to set the API key, check SDK docs for the correct method or pass it in requests

const databases = new sdk.Databases(client);

module.exports = { client, databases, sdk };
