const { databases } = require('./utils');
const { DATABASE_ID, COLLECTION_ID } = require('./constants');

module.exports = async function (req, res) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'Missing workflow id.' });
    const doc = await databases.getDocument(DATABASE_ID, COLLECTION_ID, id);
    return res.status(200).json(doc);
  } catch (err) {
    if (err.code === 404) return res.status(404).json({ error: 'Workflow not found.' });
    return res.status(500).json({ error: err.message });
  }
};
