const { databases } = require('./utils');
const { DATABASE_ID, COLLECTION_ID } = require('./constants');

export default async ({ req, res }) => {
  
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
   
  return res.json(docs,200);
  } catch (err) {
  return res.json({ error: err.message },500);
  }
};
