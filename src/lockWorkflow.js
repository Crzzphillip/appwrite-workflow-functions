const { databases } = require('./utils');
const { DATABASE_ID, COLLECTION_ID } = require('./constants');

// Lock or unlock a workflow by ID
module.exports = async function (req, res) {
  try {
    const { id } = req.params;
    const { locked } = req.body;
    if (!id || typeof locked !== 'boolean') {
      return res.status(400).json({ error: 'Missing id or locked (boolean).' });
    }
    const doc = await databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, { locked });
    return res.status(200).json(doc);
  } catch (err) {
    if (err.code === 404) return res.status(404).json({ error: 'Workflow not found.' });
    return res.status(500).json({ error: err.message });
  }
};
