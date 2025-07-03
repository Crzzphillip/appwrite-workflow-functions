const { databases, sdk } = require('./utils');
const { DATABASE_ID, COLLECTION_ID } = require('./constants');

// Search workflows by title, tags, or description
module.exports = async function (req, res) {
  try {
    const { query = '', limit = 25, offset = 0 } = req.body || {};
    if (!query) return res.status(400).json({ error: 'Missing search query.' });
    const queries = [
      sdk.Query.or([
        sdk.Query.search('title', query),
        sdk.Query.search('description', query),
        sdk.Query.search('tags', query)
      ]),
      sdk.Query.limit(limit),
      sdk.Query.offset(offset)
    ];
    const docs = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, queries);
    return res.status(200).json(docs);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
