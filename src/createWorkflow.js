const { databases } = require('./utils');
const { DATABASE_ID, COLLECTION_ID } = require('./constants');

module.exports = async function (req, res) {
  try {
    const {
      id, title, description, credits, locked, image, agents = [], author_id, usageStats = '', tags = [], creator_id = null, n8n_json = ''
    } = req.body;
    // Validate required fields
    if (!id || !title || !description || !credits || typeof locked !== 'boolean' || !image || !author_id) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }
    // Prepare document data
    const data = {
      id, title, description, credits, locked, image, agents, author_id, usageStats, tags, creator_id, n8n_json
    };
    // Remove null/undefined fields
    Object.keys(data).forEach(key => (data[key] === null || data[key] === undefined) && delete data[key]);
    // Create document
    const doc = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      id,
      data
    );
    return res.status(201).json(doc);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
