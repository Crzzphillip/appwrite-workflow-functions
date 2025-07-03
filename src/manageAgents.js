const { databases } = require('./utils');
const { DATABASE_ID, COLLECTION_ID } = require('./constants');

// Add or remove agents from a workflow
module.exports = async function (req, res) {
  try {
    const { id } = req.params;
    const { agents } = req.body;
    if (!id || !Array.isArray(agents)) {
      return res.status(400).json({ error: 'Missing id or agents (array).' });
    }
    const doc = await databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, { agents });
    return res.status(200).json(doc);
  } catch (err) {
    if (err.code === 404) return res.status(404).json({ error: 'Workflow not found.' });
    return res.status(500).json({ error: err.message });
  }
};
