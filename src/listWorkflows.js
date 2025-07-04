const { databases } = require('./utils');
const { DATABASE_ID, COLLECTION_ID } = require('./constants');

module.exports = async function (req, res) {
  
  try {
    const { filters = {}, limit = 25, offset = 0, orderField = 'title', orderType = 'ASC' } = req.body || {};
    // Build queries
    const queries = [];
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => queries.push(databases.sdk.Query.equal(key, v)));
      } else {
        queries.push(databases.sdk.Query.equal(key, value));
      }
    });
    queries.push(databases.sdk.Query.limit(limit));
    queries.push(databases.sdk.Query.offset(offset));
    queries.push(databases.sdk.Query.orderBy(orderField, orderType));
    const docs = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, queries);
   
if (res && typeof res.status === 'function') {
  return res.status(200).json(docs);
} else {
  // fallback or throw error
  throw new Error('Response object is missing or invalid');
}
  } catch (err) {
    
if (res && typeof res.status === 'function') {
  return res.status(500).json({ error: err.message });
} else {
  // fallback or throw error
  throw new Error('Response object is missing or invalid');
}
  }
};
